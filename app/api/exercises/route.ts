import { NextResponse } from "next/server";
import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const queryParams = searchParams.keys();

    const cookieStore = cookies();
    const supabase = createRouteHandlerClient({ cookies: () => cookieStore });

    const {
        data: { session },
    } = await supabase.auth.getSession();

    if (!session) {
        return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
    }

    const admin_uuid = "da89627e-3917-4e7c-a583-dab21d5ef726";

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
                description,
                created_by,
                created_at`
            )
            .eq("visibility", "public")
            .or(`created_by.eq.${admin_uuid},created_by.eq.${session.user.id}`);

        //para cada chave dos queryparams
        for (const key of queryParams) {
            if (key === "muscles" || key === "equipment" || key === "level") {
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

import { z } from "zod";

const CreatingExercise = z.object({
    name: z.string(),
    muscles: z.array(z.string()),
    equipment: z.array(z.string()),
    level: z.array(z.string()),
    description: z.string(),
});

const bodyParser = CreatingExercise;

export async function POST(request: Request) {
    const cookieStore = cookies();
    const supabase = createRouteHandlerClient({ cookies: () => cookieStore });
    const {
        data: { session },
    } = await supabase.auth.getSession();

    if (!session) {
        return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
    }

    try {
        const exercise: z.infer<typeof CreatingExercise> = bodyParser.parse(await request.json());
        const { error } = await supabase.from("exercises").insert({
            name: exercise.name,
            muscles: exercise.muscles,
            equipment: exercise.equipment,
            level: exercise.level,
            description: exercise.description,
            created_by: session.user.id,
            visibility: "public",
        });
        if (error) {
            return NextResponse.json({ success: false, error });
        }
        return NextResponse.json({ success: true, exercise });
    } catch (error) {
        if (error instanceof z.ZodError) {
            return NextResponse.json(
                {
                    success: false,
                    error: "Invalid body",
                    message: error,
                },
                { status: 400 }
            );
        } else {
            return NextResponse.json(
                {
                    success: false,
                    error: "unknown",
                },
                { status: 500 }
            );
        }
    }
}
