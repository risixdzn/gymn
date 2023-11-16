import { HomeIcon } from "@/components/ui/Icons/Home/Home";
import { SolidHomeIcon } from "@/components/ui/Icons/Home/SolidHome";
import { SolidUserIcon } from "@/components/ui/Icons/User/SolidUser";
import { UserIcon } from "@/components/ui/Icons/User/User";
import { useGetRouteName } from "@/lib/hooks/useGetRouteName";
import { Home, Search, Dumbbell, User, HeartPulse, Warehouse } from "lucide-react";
import Link from "next/link";
import { ReactElement, ReactNode, cloneElement } from "react";

const NavLink = ({
    pathname,
    href,
    icon,
    text,
}: {
    pathname: string;
    href: string;
    icon: ReactElement;
    text: string;
}) => {
    const currentRoute = useGetRouteName(pathname);
    const CustomIcon = ({ icon }: { icon: ReactElement }) => {
        return cloneElement(icon, {
            strokeWidth: currentRoute == href ? 2.5 : 2,
            className: "transition-all",
        });
    };

    return (
        <Link
            href={`/dashboard/${href}`}
            className={`transition-all flex flex-col items-center gap-1 ${
                currentRoute == href ? "text-g_purple" : "text-muted-foreground"
            }`}
        >
            <CustomIcon icon={icon} />
            <p className='text-xs'>{text}</p>
        </Link>
    );
};

export default function BottomNav({ pathname }: { pathname: string }) {
    return (
        <div
            id='bottomnav'
            className='w-full h-20 fixed z-[20] bottom-0 bg-card rounded-t-3xl flex items-center justify-around px-5'
        >
            <NavLink pathname={pathname} href={"home"} text={"Home"} icon={<Home />} />
            <NavLink pathname={pathname} href={"explore"} text={"Explorar"} icon={<Search />} />
            <NavLink pathname={pathname} href={"workouts"} text={"Treinos"} icon={<Dumbbell />} />
            <NavLink pathname={pathname} href={"gym"} text={"Academia"} icon={<Warehouse />} />
            <NavLink pathname={pathname} href={"profile"} text={"Perfil"} icon={<User />} />
        </div>
    );
}
