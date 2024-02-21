import { useState, useEffect } from "react";
import { Session, createClientComponentClient } from "@supabase/auth-helpers-nextjs";

export function useSession() {
    const [session, setSession] = useState<Session | null>(null);
    const supabase = createClientComponentClient();

    useEffect(() => {
        (async () => {
            const {
                data: { session },
                error,
            } = await supabase.auth.getSession();
            setSession(session);
        })();
    }, [supabase]);
    //bro this empty dependency array was crashing the app and it took 3 days to figure out why

    return session;
}
