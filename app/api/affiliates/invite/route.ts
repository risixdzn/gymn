import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { supabase } from "./supabase";
import { z } from "zod";
import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";

const inviteAffiliateSchema = z.object({
    gym_id: z
        .string()
        .refine((x) =>
            /^[0-9a-fA-F]{8}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{12}$/.test(
                x
            )
        ),
    gym_name: z.string(),
    inviter: z
        .string()
        .min(3)
        .max(30)
        .refine((x) => /^[a-zA-Z0-9]*$/.test(x)),
    display_name: z
        .string()
        .min(2)
        .max(25)
        .refine((x) => /^[a-zA-Z0-9_ äëiöüÄËÏÖÜáéíóúÁÉÍÓÚãõñÃÕÑâêîôûÂÊÎÔÛ]*$/.test(x)),
    email: z.string().email(),
    profile: z.literal("Member"),
});

export async function POST(req: Request) {
    const cookieStore = cookies();
    const supaSession = createRouteHandlerClient({ cookies: () => cookieStore });

    const {
        data: { session },
        error,
    } = await supaSession.auth.getSession();

    if (!session) {
        return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
    }

    try {
        const { gym_id, gym_name, inviter, display_name, email, profile } =
            inviteAffiliateSchema.parse(await req.json());

        const user = await supabase.from("users").select("profile").eq("id", session.user.id);

        if (user.data![0].profile !== "GymOwner") {
            return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
        }

        const metadata = {
            gym_id,
            gym_name,
            inviter,
            display_name,
            profile,
        };

        const invite = await supabase.auth.admin.inviteUserByEmail(email, {
            data: metadata,
        });

        if (invite.error) {
            return NextResponse.json({ success: false, error: invite.error }, { status: 400 });
        }

        return NextResponse.json({ success: true, invite });
    } catch (error) {
        return NextResponse.json({ success: false, error: error }, { status: 400 });
    }
}
