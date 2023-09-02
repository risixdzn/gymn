import { NextResponse } from "next/server";
import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

export async function GET() {
    const supabase = createRouteHandlerClient({ cookies });

    try {
        let { data, error } = await supabase
            .from("exercises")
            .select(
                `muscle,
                name,
                equipment,
                level,
                description`
            )
            .eq("visibility", "public")
            .eq("created_by", "da89627e-3917-4e7c-a583-dab21d5ef726"); //admin id
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