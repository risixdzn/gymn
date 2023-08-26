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

type EditProfileProps = {
    displayUser: UserProfile | null;
    refetchUser: () => void;
};

export default function EditProfile({ displayUser, refetchUser }: EditProfileProps) {
    const [drawerOpen, setDrawerOpen] = useState(false);
    const { screenWidth } = useGetScreenWidth();

    return (
        <>
            <Sheet open={drawerOpen} onOpenChange={setDrawerOpen}>
                <SheetTrigger>
                    <Button variant={"outline"}>Editar perfil</Button>
                </SheetTrigger>
                <SheetContent className='w-[calc(100%-4rem)] pt-4' closeButtonVisible={false}>
                    <div className='h-full overflow-scroll scrollbar scrollbar-w-[4px] scrollbar-thumb-gray-300/30 scrollbar-track-transparent '>
                        <EditProfileForm
                            displayUser={displayUser}
                            setDrawerOpen={setDrawerOpen}
                            refetchUser={refetchUser}
                        />
                    </div>
                </SheetContent>
            </Sheet>
        </>
    );
}
