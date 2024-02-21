import { NextResponse } from "next/server";
import * as z from "zod";
import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

const paramsParser = z.object({
    slug: z
        .string()
        .min(2)
        .max(36)
        .refine((x) => /^[a-zA-Z0-9-]*$/.test(x)),
});

export async function GET(req: Request, { params }: { params: { slug: string } }) {
    const slug = params.slug;
    const cookieStore = cookies();
    const supabase = createRouteHandlerClient({ cookies: () => cookieStore });

    if (slug === null) return new NextResponse("Missing username/uuid parameter.", { status: 400 });

    try {
        paramsParser.parse({ slug });
        const uuidRegex =
            /^[0-9a-fA-F]{8}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{12}$/;

        const isUuid = uuidRegex.test(slug);

        let where = isUuid ? "id" : "username";

        const { data, error } = await supabase
            .from("users")
            .select(
                `id,
                created_at,
                username,
                profile,
                display_name,
                avatar_id,
                banner_id,
                bio,
                location`
            )
            .eq(where, slug)
            .single();
        if (error) {
            return NextResponse.json("Unexistent user", { status: 404 });
        }

        return NextResponse.json(data);
    } catch (error) {
        // Handle validation error
        return NextResponse.json("Invalid username parameter.", { status: 400 });
    }
}
