import { Button } from "@/components/ui/button";
import { SheetHeader, SheetDescription, SheetTitle, SheetFooter } from "@/components/ui/sheet";
import { UserProfile } from "@/lib/supabase/getProfile";
import {
    Drawer,
    DrawerContent,
    DrawerTrigger,
    DrawerTitle,
    DrawerDescription,
} from "@/components/ui/DrawerOrVaul";
import { useState } from "react";
import { useGetScreenWidth } from "@/lib/hooks/useGetScreenWidth";

type EditProfileProps = {
    displayUser: UserProfile | null;
};

export default function EditProfile({ displayUser }: EditProfileProps) {
    const [drawerOpen, setDrawerOpen] = useState(false);
    const { screenWidth, isClient } = useGetScreenWidth();

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
                    <div className='mt-4'></div>
                </DrawerContent>
            </Drawer>
        </>
    );
}
