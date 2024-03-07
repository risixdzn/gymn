import { NextResponse } from "next/server";
import * as z from "zod";
import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { UserProfile } from "@/types/UserProfile";

export type Root = Affiliate[];

export interface Affiliate {
    id: string;
    user_id: string;
    belongs_to: string;
    verified: boolean;
    affiliate_info: UserProfile;
}

export async function GET(req: Request) {
    const cookieStore = cookies();
    const supabase = createRouteHandlerClient({ cookies: () => cookieStore });
    const {
        data: { session },
        error,
    } = await supabase.auth.getSession();

    if (!session) {
        return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
    }

    /* To ensure that only the gym owner can see all the gym affiliates:
    1. Select the user profile (verify its a owner)
    2. Select the user gym (verify it can only see its own gym data)
    3. Then select its affiliates */
    const userProfile = await supabase.from("users").select("profile").eq("id", session?.user?.id);
    if (userProfile.data![0].profile !== "GymOwner") {
        return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
    }

    try {
        const gymInfo = await supabase.from("gym").select(`id`).eq("owner", session?.user?.id);
        const { data, error } = await supabase
            .from("affiliates")
            .select(`*, users(*)`)
            .eq("belongs_to", gymInfo.data![0].id);

        if (error || gymInfo.error) {
            return NextResponse.json({ success: false, error });
        }

        const formattedRes = data.map((aff) => {
            return {
                id: aff.id,
                user_id: aff.user_id,
                belongs_to: aff.belongs_to,
                verified: aff.verified,
                affiliate_info: aff.users,
            };
        });

        return NextResponse.json({ success: true, data: formattedRes });
    } catch (error) {
        // Handle validation error
        return NextResponse.json(
            "Invalid gym. You should pass a valid uuid to get the gym affiliates.",
            { status: 400 }
        );
    }
}
