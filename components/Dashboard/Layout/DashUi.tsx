import {
    createClientComponentClient,
    createServerComponentClient,
} from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import Sidebar from "./Sidebar/Sidebar";
import SidebarContext from "./Sidebar/SidebarContext";
import { usePathname } from "next/navigation";
import Breadcrumbs from "./Others/Breadcrumbs";
import MobileLayout from "./Others/MobileLayout";

export default async function DashUi() {
    const supabase = createClientComponentClient();
    const {
        data: { session },
        error,
    } = await supabase.auth.getSession();

    const pathname = usePathname();

    return (
        <>
            <SidebarContext>
                <Sidebar session={session} pathname={pathname} />
                <MobileLayout pathname={pathname} />
            </SidebarContext>
            <div
                id='breadcrumbs'
                style={{ zIndex: 30 }}
                className='lg:flex fixed bg-card bg- items-center pl-6 hidden lg:w-[calc(100%-20rem)] lg:ml-[20rem] h-14 border-b-[1px] border-border'
            >
                <Breadcrumbs pathname={pathname} />
            </div>
        </>
    );
}
