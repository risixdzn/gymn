import { NextResponse } from "next/server";
import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

interface UserData {
    id: string;
    created_at: string;
    username: string;
    display_name: string;
    profile: string;
    bio: string;
    location: string;
}

interface GymData {
    id: string;
    created_at: string;
    name: string;
    address: string;
    owner: string;
    referral_code: string;
    ownerData: UserData; // Renamed property
}

export interface NotificationData {
    id: string;
    time: string;
    notified_user_id: string;
    source_user_id: string | null;
    event: string;
    read: boolean;
    action: string | null;
    source_gym_id: string;
    gym?: GymData;
    user?: UserData;
}

export async function GET(request: Request) {
    const cookieStore = cookies();
    const supabase = createRouteHandlerClient({ cookies: () => cookieStore });

    const {
        data: { session },
    } = await supabase.auth.getSession();

    if (!session) {
        return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
    }

    try {
        const { data, error } = await supabase
            .from("notifications")
            .select(
                `*,
                    gym(*,users(id,created_at,username,display_name,profile,bio,location))
                    users(id,created_at,username,display_name,profile,bio,location)`
            )
            .eq("notified_user_id", session.user.id);

        if (!error) {
            function renameUsersToOwner(data: any[]): NotificationData[] {
                return data.map((event) => {
                    if (event && event.gym && event.gym.users) {
                        event.gym.owner = event.gym.users;
                        delete event.gym.users;
                    }
                    return event;
                });
            }

            const modifiedData = renameUsersToOwner(data);

            return NextResponse.json(
                { success: "true", data: modifiedData },
                {
                    status: 200,
                }
            );
        } else {
            return NextResponse.json(
                { success: "false", error },
                {
                    status: 403,
                }
            );
        }
    } catch (error) {
        return NextResponse.json(
            { success: "false", error },
            {
                status: 403,
            }
        );
    }
}
