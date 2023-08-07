import { useGetRouteName } from "@/lib/hooks/useGetRouteName";
import { Home, Search, Dumbbell, User } from "lucide-react";
import Link from "next/link";

export default function BottomNav({ pathname }: { pathname: string }) {
    const currentRoute = useGetRouteName(pathname);

    return (
        <div
            id='bottomnav'
            className='w-full h-20 fixed z-[2] top-full -translate-y-20 bg-card rounded-t-3xl flex items-center justify-around px-5'
        >
            <Link
                href='/dashboard/home'
                className={`transition-all flex flex-col items-center gap-1 ${
                    currentRoute == "home" ? "text-g_purple" : "text-muted-foreground"
                }`}
            >
                <Home />
                <p className='text-xs'>Home</p>
            </Link>
            <Link
                href='/dashboard/explore'
                className={`transition-all flex flex-col items-center gap-1 ${
                    currentRoute == "explore" ? "text-g_purple" : "text-muted-foreground"
                }`}
            >
                <Search />
                <p className='text-xs'>Explorar</p>
            </Link>
            <Link
                href='/dashboard/explore'
                className={`transition-all flex flex-col items-center gap-1 ${
                    currentRoute == "workouts" ? "text-g_purple" : "text-muted-foreground"
                }`}
            >
                <Dumbbell />
                <p className='text-xs'>Treinos</p>
            </Link>
            <Link
                href='/dashboard/profile'
                className={`transition-all flex flex-col items-center gap-1 ${
                    currentRoute == "profile"
                        ? "text-g_purple font-semibold"
                        : "text-muted-foreground"
                }`}
            >
                <User />
                <p className='text-xs'>Perfil</p>
            </Link>
        </div>
    );
}
