import { cookies } from "next/headers";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import Navbar from "./Navbar";
import CTABanner from "../Layout/CTABanner";

export default async function Header() {
    const supabase = createServerComponentClient({ cookies });

    const {
        data: { session },
        error,
    } = await supabase.auth.getSession();

    return (
        <div className='fixed z-50 w-full h-full'>
            <Navbar session={session} />
            <CTABanner
                text={"Alcançe o seu melhor desempenho com Gymn"}
                cta={"Começar"}
                href={"/auth"}
                openTimeout={5000}
                identifier='joinuscta'
            />
        </div>
    );
}
