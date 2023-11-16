import { Workout } from "@/types/Workout";
import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { NextResponse } from "next/server";
import * as z from "zod";
import { cookies } from "next/headers";

const bodyParser = Workout;

export async function POST(request: Request) {
    const cookieStore = cookies();
    const supabase = createRouteHandlerClient({ cookies: () => cookieStore });
    const {
        data: { session },
        error,
    } = await supabase.auth.getSession();

    if (!session) {
        return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
    }

    try {
        const workout = bodyParser.parse(await request.json());
        const { error } = await supabase
            .from("workouts")
            .insert({ owner: session?.user.id, workout: workout });
        if (error) {
            return NextResponse.json({ success: false, error });
        }
        return NextResponse.json({ success: true, workout });
    } catch (error) {
        if (error instanceof z.ZodError) {
            return NextResponse.json(
                {
                    success: false,
                    error: "Invalid body",
                    message: error.issues.map((issue) => issue.message),
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
