import { NextResponse } from "next/server";
import * as z from "zod";
import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

const paramsParser = z.object({
    slug: z
        .string()
        .min(2)
        .max(36)
        .refine((x) => /^[a-zA-Z0-9]{7}$/.test(x)),
});

export async function GET(req: Request, { params }: { params: { slug: string } }) {
    const slug = params.slug;
    const cookieStore = cookies();
    const supabase = createRouteHandlerClient({ cookies: () => cookieStore });

    if (slug === null) return new NextResponse("Missing gym referral code.", { status: 400 });

    try {
        paramsParser.parse({ slug });

        const {
            data: { session },
            error,
        } = await supabase.auth.getSession();

        if (!session) {
            return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
        }
        const gym = await supabase
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
            .eq("referral_code", slug);

        const gymData = gym.data!.map((gym) => {
            return {
                id: gym.id,
                created_at: gym.created_at,
                name: gym.name,
                address: gym.address,
                owner: gym.users,
                referral_code: gym.referral_code,
            };
        });

        console.log(gymData);
        if (gymData.length === 0) {
            return NextResponse.json({ success: false, error: "Gym not found" }, { status: 404 });
        }
        return NextResponse.json({ success: true, data: gymData[0] }, { status: 200 });
    } catch (error) {
        // Handle validation error
        return NextResponse.json(
            { success: false, error: "Invalid referral code" },
            { status: 400 }
        );
    }
}
