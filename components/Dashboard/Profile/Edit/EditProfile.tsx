import { Button } from "@/components/ui/button";
import {
    Sheet,
    SheetHeader,
    SheetDescription,
    SheetTitle,
    SheetTrigger,
    SheetContent,
    SheetClose,
} from "@/components/ui/sheet";
import { UserProfile } from "@/types/UserProfile";
import { useState } from "react";
import { useGetScreenWidth } from "@/lib/hooks/useGetScreenWidth";
import { EditProfileForm } from "./EditForm";
import { cn } from "@/lib/utils";

type EditProfileProps = {
    user: UserProfile | null;
    refetchUser: () => void;
    className?: string;
    width?: "full" | "auto";
};

export default function EditProfile({ user, refetchUser, className, width }: EditProfileProps) {
    const [drawerOpen, setDrawerOpen] = useState(false);

    return (
        <>
            <Sheet open={drawerOpen} onOpenChange={setDrawerOpen}>
                <SheetTrigger className={cn("w-auto", `${width && `w-${width}`}`)}>
                    <Button variant={"outline"} className={cn(className)}>
                        Editar perfil
                    </Button>
                </SheetTrigger>
                <SheetContent className='w-[calc(100%-4rem)] pt-4' closeButtonVisible={false}>
                    <div className='h-full overflow-scroll scrollbar scrollbar-w-[4px] scrollbar-thumb-gray-300/30 scrollbar-track-transparent '>
                        <EditProfileForm
                            user={user}
                            setDrawerOpen={setDrawerOpen}
                            refetchUser={refetchUser}
                        />
                    </div>
                </SheetContent>
            </Sheet>
        </>
    );
}
