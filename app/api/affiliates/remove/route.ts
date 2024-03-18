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

const deleteAffiliateSchema = z.object({
    id: z
        .string()
        .refine((x) =>
            /^[0-9a-fA-F]{8}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{12}$/.test(
                x
            )
        ),
});

export async function POST(req: Request) {
    const cookieStore = cookies();
    const supabase = createRouteHandlerClient({ cookies: () => cookieStore });
    const {
        data: { session },
        error,
    } = await supabase.auth.getSession();

    if (!session) {
        return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
    }

    /* To ensure that only the gym owner can delete the gym affiliates:
    1. Select the user profile (verify its a owner)
    2. Select the user gym (verify it can only see its own gym data)
    3. Then select its affiliates */
    const userProfile = await supabase.from("users").select("profile").eq("id", session?.user?.id);
    if (userProfile.data![0].profile !== "GymOwner") {
        return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
    }

    try {
        const { id } = deleteAffiliateSchema.parse(await req.json());

        const gymInfo = await supabase.from("gym").select(`id`).eq("owner", session?.user?.id);
        const { error } = await supabase
            .from("affiliates")
            .delete()
            .eq("belongs_to", gymInfo.data![0].id)
            .eq("user_id", id);

        if (error || gymInfo.error) {
            return NextResponse.json({ success: false, error });
        }

        return NextResponse.json({ success: true, data: [] });
    } catch (error) {
        // Handle validation error
        return NextResponse.json("Invalid uuid.", { status: 400 });
    }
}
