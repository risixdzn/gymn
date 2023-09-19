import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";

export async function SignOut({ router }: { router: AppRouterInstance }) {
    const supabase = createClientComponentClient();

    const { error } = await supabase.auth.signOut();

    if (!error) {
        console.log("User logged out");
        router.push("/");
    } else {
        console.log(error);
    }
}
