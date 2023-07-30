import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import Sidebar from "./Sidebar/Sidebar";

export default async function DashUi() {
    const supabase = createServerComponentClient({ cookies });
    const {
        data: { session },
        error,
    } = await supabase.auth.getSession();

    return <Sidebar session={session} />;
}
