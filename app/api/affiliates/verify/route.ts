import { cookies, headers } from "next/headers";
import { NextResponse } from "next/server";
import { z } from "zod";
import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import axios from "axios";
import { access } from "fs";
import { useSession } from "@/lib/supabase/useSession";

const verifyInviteSchema = z.object({
    username: z
        .string()
        .min(3, { message: "O nome de usuário não pode ser tão curto" })
        .max(30, { message: "O nome de usuário não pode ser tão longo" })
        .refine((x) => /^[a-zA-Z0-9]*$/.test(x), {
            message: "O nome de usuário não pode conter caracteres especiais.",
        }),
    password: z
        .string()
        .min(6, { message: "A senha deve ter no mínimo 6 caracteres" })
        .max(40, { message: "A senha deve ser menor." })
        .refine((x) => /^(?=.*[a-z])/.test(x) || "A senha deve conter uma letra minúscula.")
        .refine((x) => /^(?=.*[A-Z])/.test(x) || "A senha deve conter uma letra maiúscula.")
        .refine((x) => /^(?=.*[0-9])/.test(x) || "A senha deve conter um número."),
    access_token: z.string().min(1),
    email: z.string().email(),
});

export async function POST(req: Request) {
    const cookieStore = cookies();
    const supabase = createRouteHandlerClient({ cookies: () => cookieStore });

    const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

    try {
        const { username, password, access_token, email } = verifyInviteSchema.parse(
            await req.json()
        );

        const putPassword = await axios.put(
            `${url}/auth/v1/user`,
            {
                password: password,
                user_metadata: {
                    username: username,
                },
            },
            {
                headers: {
                    Authorization: `Bearer ${access_token}`,
                    apikey: key,
                },
            }
        );

        if (putPassword.status !== 200) {
            return NextResponse.json({ success: false, error: putPassword.data }, { status: 400 });
        }

        const signup = await supabase.auth.signInWithPassword({
            email: email,
            password: password,
        });

        if (signup.error) {
            return NextResponse.json(
                { success: false, error: signup.error, code: 1 },
                { status: 400 }
            );
        }

        const session = await supabase.auth.getUser();

        const user = await supabase.auth.updateUser({
            data: { username: username },
        });
        const { data, error } = await supabase
            .from("users")
            .update({ username: username })
            .eq("id", session.data.user?.id);

        if (error || user.error) {
            return NextResponse.json(
                { success: false, error: user.error, code: 2 },
                { status: 400 }
            );
        }

        return NextResponse.json({ success: true, data });
    } catch (error) {
        return NextResponse.json({ success: false, error: error, code: 3 }, { status: 400 });
    }
}
