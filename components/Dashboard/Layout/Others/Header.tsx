import { useGetRouteName } from "@/lib/hooks/useGetRouteName";
import { useTranslateAppRoutes } from "@/lib/hooks/useTranslateAppRoutes";

export default function Header({ pathname }: { pathname: string }) {
    const currentRoute = useGetRouteName(pathname);
    const translatedCurrentRoute = useTranslateAppRoutes(currentRoute);
    return (
        <div id={"header"} className='w-full h-16 fixed flex items-center px-3 z-[20] bg-card'>
            <div className='w-full h-full flex items-center justify-center text-sm'>
                <h4>{translatedCurrentRoute}</h4>
            </div>
        </div>
    );
}
