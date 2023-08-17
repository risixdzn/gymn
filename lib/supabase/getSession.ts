import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

export async function getSession() {
    const supabase = createServerComponentClient({ cookies });

    const {
        data: { session },
        error,
    } = await supabase.auth.getSession();

    return { session, error };
}
