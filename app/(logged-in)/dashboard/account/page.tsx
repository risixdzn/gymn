import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import Profile from "@/components/Dashboard/Account/Profile";
import { redirect } from "next/navigation";

export default async function Account() {
    const supabase = createServerComponentClient({ cookies });

    const {
        data: { session },
        error,
    } = await supabase.auth.getSession();

    if (session) {
        console.log("User logged in:", session.user.user_metadata.username);
    } else {
        redirect("/auth");
    }

    return <Profile session={session} />;
}
