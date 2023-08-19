import { Button } from "@/components/ui/button";
import { SheetHeader, SheetDescription, SheetTitle, SheetFooter } from "@/components/ui/sheet";
import { UserProfile } from "@/types/UserProfile";
import {
    Drawer,
    DrawerContent,
    DrawerTrigger,
    DrawerTitle,
    DrawerDescription,
} from "@/components/ui/DrawerOrVaul";
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
            <Drawer screenWidth={screenWidth} open={drawerOpen} onOpenChange={setDrawerOpen}>
                <DrawerTrigger screenWidth={screenWidth}>
                    <Button variant={"outline"}>Editar perfil</Button>
                </DrawerTrigger>
                <DrawerContent screenWidth={screenWidth}>
                    <DrawerTitle screenWidth={screenWidth}>Editar perfil</DrawerTitle>
                    <DrawerDescription screenWidth={screenWidth}>
                        Você está editando seu perfil. Clique em salvar quando estiver pronto(a).
                    </DrawerDescription>
                    <div className='mt-4'>
                        <EditProfileForm
                            displayUser={displayUser}
                            setDrawerOpen={setDrawerOpen}
                            refetchUser={refetchUser}
                        />
                    </div>
                </DrawerContent>
            </Drawer>
        </>
    );
}
