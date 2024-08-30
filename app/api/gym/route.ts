import { Affiliate } from "./../affiliates/route";
import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { Database } from "@/types/supabase";
import { APISuccess } from "@/types/api";
import { UserProfile } from "@/types/UserProfile";

export interface Root {
    success: boolean;
    data?: Data;
    error?: string;
}

export interface Data {
    id: string;
    created_at: string;
    name: string;
    address: string;
    owner: Owner;
    referral_code: string;
}

export interface Owner {
    id: string;
    created_at: string;
    username: string;
    display_name: string;
    profile: string;
    email: string;
    avatar_id: any;
    banner_id: any;
    bio: string;
    location: string;
    gym_id: any;
}

export async function GET(request: Request) {
    const cookieStore = cookies();
    const supabase = createRouteHandlerClient<Database>({ cookies: () => cookieStore });

    const {
        data: { session },
        error,
    } = await supabase.auth.getSession();

    if (!session) {
        return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
    }

    const { data } = await supabase.from("users").select("profile").eq("id", session?.user?.id);

    //if the member is a gym owner, select his gym
    if (data![0].profile === "GymOwner") {
        try {
            const { data, error } = await supabase
                .from("gym")
                .select(
                    `
                    *,
                    users!gym_owner_fkey(
                        id,
                        created_at,
                        username,
                        profile,
                        display_name,
                        avatar_id,
                        banner_id,
                        bio,
                        location)
                    `
                )
                .eq("owner", session?.user?.id);
            if (error) {
                return NextResponse.json({ success: false, error });
            }
            const gymData = data.map((gym) => {
                return {
                    id: gym.id,
                    created_at: gym.created_at,
                    name: gym.name,
                    address: gym.address,
                    owner: gym.users,
                    referral_code: gym.referral_code,
                };
            });

            return NextResponse.json({ success: true, data: gymData[0] });
        } catch (error) {
            return NextResponse.json(
                {
                    success: false,
                    error: "unknown",
                },
                { status: 500 }
            );
        }
    }
    //else, select the affiliate data
    const affiliate = await supabase
        .from("affiliates")
        .select("*")
        .eq("user_id", session?.user?.id);

    if (affiliate.data?.length == 0) {
        return NextResponse.json({ success: false, error: "no_gym" }, { status: 404 });
    }

    if (affiliate.data![0].verified) {
        const gym = await supabase
            .from("gym")
            .select(
                `
                    id,
                    created_at,
                    name,
                    address,
                    owner,
                    users!gym_owner_fkey(
                        id,
                        created_at,
                        username,
                        profile,
                        display_name,
                        avatar_id,
                        banner_id,
                        bio,
                        location)
                    `
            )
            .eq("id", affiliate.data![0].belongs_to);

        const gymData = gym.data!.map((gym) => {
            return {
                id: gym.id,
                created_at: gym.created_at,
                name: gym.name,
                address: gym.address,
                owner: gym.users,
            };
        });

        return NextResponse.json({ success: true, data: gymData[0] });
    }
    return NextResponse.json({ success: false, error: "no_gym" }, { status: 404 });
}
