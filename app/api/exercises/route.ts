import { NextResponse } from "next/server";
import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const queryParams = searchParams.keys();
    const supabase = createRouteHandlerClient({ cookies });

    try {
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
            .eq("created_by", "da89627e-3917-4e7c-a583-dab21d5ef726"); //admin id

        //para cada chave dos queryparams
        for (const key of queryParams) {
            if (key === "muscle" || key === "equipment" || key === "level") {
                //filtra
                const value = searchParams.get(key); //pega a chave, se nao for nula e nem vazia
                if (value !== null && value !== "") {
                    query = query.filter(key, "cs", `{${value}}`); //filtre
                }
            }
        }

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
