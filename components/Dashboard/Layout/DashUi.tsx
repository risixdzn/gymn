import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import Sidebar from "./Sidebar/Sidebar";
import SidebarContext from "./Sidebar/SidebarContext";
import { usePathname } from "next/navigation";
import Breadcrumbs from "./Others/Breadcrumbs";
import MobileLayout from "./Others/MobileLayout";
import { cookies } from "next/headers";

export default async function DashUi() {
    const cookieStore = cookies();
    const supabase = createServerComponentClient({ cookies: () => cookieStore });
    const {
        data: { session },
        error,
    } = await supabase.auth.getSession();

    return (
        <>
            <SidebarContext>
                <Sidebar session={session} />
                <MobileLayout />
                <div
                    id='breadcrumbs'
                    style={{ zIndex: 30 }}
                    className='lg:flex fixed bg-card bg- items-center pl-6 hidden lg:w-[calc(100%-20rem)] lg:ml-[20rem] h-14 border-b-[1px] border-border'
                >
                    <Breadcrumbs />
                </div>
            </SidebarContext>
        </>
    );
}
