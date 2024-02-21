import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import Profile from "@/components/Dashboard/Profile/Profile";
import { redirect } from "next/navigation";

//TODO: redirect user to /{username} page when they enter this page

export default async function ProfilePage() {
    const cookieStore = cookies();
    const supabase = createServerComponentClient({ cookies: () => cookieStore });

    const {
        data: { session },
        error,
    } = await supabase.auth.getSession();

    return redirect(`/dashboard/profile/${session?.user.id}`);
}
