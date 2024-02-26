import { NextResponse } from "next/server";
import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const exerciseId = searchParams.get("id");

    const cookieStore = cookies();
    const supabase = createRouteHandlerClient({ cookies: () => cookieStore });
    const {
        data: { session },
    } = await supabase.auth.getSession();

    if (!session) {
        return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
    }

    try {
        if (exerciseId == null || exerciseId == "") {
            return NextResponse.json(
                {
                    success: "false",
                    error: "Getting info about a specific exercise needs an exercise id",
                },
                {
                    status: 403,
                }
            );
        }

        const admin_uuid = "da89627e-3917-4e7c-a583-dab21d5ef726";

        let query = supabase
            .from("exercises")
            .select(
                `
                id,
                muscles,
                name,
                equipment,
                level,
                description`
            )
            .eq("visibility", "public")
            .or(`created_by.eq.${admin_uuid},created_by.eq.${session.user.id}`)
            .eq("id", exerciseId);

        let { data, error } = await query; //query stuff here

        if (!error) {
            return NextResponse.json(
                { success: "true", data },
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
