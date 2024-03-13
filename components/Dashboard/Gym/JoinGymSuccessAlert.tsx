"use client";

import {
    AlertDialogAction,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import Check from "@/components/Auth/Register/ui/Check";
import GymnLogo from "@/components/ui/Icons/GymnLogo";
import { useState } from "react";
import CookieBasedAlert from "@/components/CookieBasedAlert";

export default function JoinGymSuccessAlert() {
    const [open, setOpen] = useState<boolean>(false);

    return (
        <CookieBasedAlert cookieName={"JoinGymSuccess"} open={open} onOpenChange={setOpen}>
            <div className='w-full h-28 rounded-lg bg-purple-600/20 mx-auto flex items-center justify-center'>
                <Check className='w-20 h-20' />
            </div>
            <AlertDialogHeader className='mt-2'>
                <AlertDialogTitle>
                    <h1 className='text-2xl lg:text-3xl text-center tracking-tighter'>
                        Boas vindas ao{" "}
                        <GymnLogo className='w-16 lg:w-24 mx-1 mt-1 lg:mt-2 inline-block fill-card-foreground' />
                        !
                    </h1>
                </AlertDialogTitle>
                <AlertDialogDescription>
                    <h3 className='text-center text-card-foreground/80'>
                        🎉 Parabéns! Você foi afiliado a uma academia! 🎉
                    </h3>
                    <span className='flex items-center justify-center flex-col'>
                        {" "}
                        Agora você pode aproveitar todas as funcionalidades do Gymn.
                        <br></br>
                        <span className='text-center mx-auto font-semibold text-card-foreground mt-2'>
                            Aproveite a experiência! 🚀
                        </span>
                    </span>
                </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
                <AlertDialogAction
                    onClick={() => setOpen(false)}
                    className='w-full mt-3 bg-purple-600 hover:bg-purple-600/70 text-white'
                >
                    Começar
                </AlertDialogAction>
            </AlertDialogFooter>
        </CookieBasedAlert>
    );
}
