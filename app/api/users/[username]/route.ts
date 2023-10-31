import { NextResponse } from "next/server";
import * as z from "zod";
import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

const uuidParser = z.object({
    username: z
        .string()
        .min(2)
        .max(30)
        .refine((x) => /^[a-zA-Z0-9]*$/.test(x)),
});

export async function GET(req: Request, { params }: { params: { username: string } }) {
    const username = params.username;
    const cookieStore = cookies();
    const supabase = createRouteHandlerClient({ cookies: () => cookieStore });

    if (username === null) return new NextResponse("Missing username parameter.", { status: 400 });

    try {
        uuidParser.parse({ username });
        const { data, error } = await supabase
            .from("users")
            .select(
                `id,
                created_at,
                username,
                profile,
                display_name,
                avatars!users_avatar_id_fkey(avatar_url),
                banners!users_banner_id_fkey(banner_url),
                bio,
                location`
            )
            .eq("username", username)
            .single();
        if (error) {
            return NextResponse.json(error, { status: 406 });
        }
        return NextResponse.json(data);
    } catch (error) {
        // Handle validation error
        return NextResponse.json("Invalid username parameter.", { status: 400 });
    }
}
