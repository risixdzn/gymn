import { NextRequest, NextResponse } from "next/server";
import * as z from "zod";
import { cookies } from "next/headers";
import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";

const paramsParser = z.object({
    slug: z
        .string()
        .min(2)
        .max(36)
        .refine((x) => /^[a-zA-Z0-9-]*$/.test(x)),
});

export async function GET(req: NextRequest) {
    const slug = req.nextUrl.pathname.split("/")[3];

    try {
        paramsParser.parse({ slug });
        const uuidRegex =
            /^[0-9a-fA-F]{8}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{12}$/;

        const isUuid = uuidRegex.test(slug);

        if (isUuid) {
            //if it is an uuid, fetch the username and then get the pfp
            const cookieStore = cookies();
            const supabase = createRouteHandlerClient({ cookies: () => cookieStore });

            const { data, error } = await supabase
                .from("users")
                .select(`username,avatar_id`)
                .eq("id", slug)
                .single();
            if (error) {
                return NextResponse.json(
                    { success: false, error: "Unexistent user" },
                    { status: 404 }
                );
            }
            const imageResponse = await fetch(
                `https://bkeiikprhrwohskvmxkd.supabase.co/storage/v1/object/public/avatars/${
                    data.username
                }?timestamp=${Date.now()}`
            );
            // Check if the image was fetched successfully
            if (imageResponse.ok) {
                // Get the image buffer
                const imageBuffer = await imageResponse.arrayBuffer();

                const cache = req.nextUrl.searchParams.get("cache");

                // Return the image with appropriate headers
                return new NextResponse(Buffer.from(imageBuffer), {
                    headers: {
                        "Content-Type": "image/webp",
                        "Cache-Control": cache
                            ? "public, max-age=86400"
                            : "no-store, no-cache, must-revalidate, max-age=0",
                        Expires: "0",
                    },
                });
            }
            return NextResponse.json({ success: false, error: "No avatar found" }, { status: 404 });
        }

        const imageResponse = await fetch(
            `https://bkeiikprhrwohskvmxkd.supabase.co/storage/v1/object/public/avatars/${slug}?timestamp=${Date.now()}`
        );
        // Check if the image was fetched successfully
        if (imageResponse.ok) {
            // Get the image buffer
            const imageBuffer = await imageResponse.arrayBuffer();

            // Return the image with appropriate headers
            return new NextResponse(Buffer.from(imageBuffer), {
                headers: {
                    "Content-Type": "image/webp",
                    "Cache-Control": "no-store, no-cache, must-revalidate, max-age=0",
                    Expires: "0",
                },
            });
        }
        return NextResponse.json({ success: false, error: "No avatar found" }, { status: 404 });
    } catch (error) {
        // Handle validation error
        return NextResponse.json(
            { success: false, error: "Invalid username/uuid" },
            { status: 400 }
        );
    }
}
