import { cookies } from "next/headers";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import Navbar from "./Navbar";

export default async function Header() {
    const supabase = createServerComponentClient({ cookies });

    //TODO: Fazer o hook de fetch e refetch session.

    const {
        data: { session },
        error,
    } = await supabase.auth.getSession();

    return <Navbar session={session} />;
}
