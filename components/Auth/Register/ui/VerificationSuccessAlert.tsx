"use client";

import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import Check from "./Check";
import GymnLogo from "@/components/ui/Icons/GymnLogo";
import Link from "next/link";
import { useState, useEffect } from "react";

export default function VerficationSuccessAlert() {
    // This terrible hack is needed to prevent hydration errors.
    // The Radix Dialog is not rendered correctly server side, so we need to prevent it from rendering until the client side hydration is complete (and `useEffect` is run).
    // The issue is reported here: https://github.com/radix-ui/primitives/issues/1386

    const [open, setOpen] = useState<boolean>(false); //this needs to be false, so the component is not rendered on the server

    useEffect(() => {
        //extrai os cookies, separando-os
        const cookies = document.cookie.split("; ");
        const verificationSuccessAlertOpenCookie = cookies.find(
            (cookie) => cookie.startsWith("VerificationSuccessAlertOpen=") // acha o cookie de alerta de verificação
        );
        //seta o estado open como o estado do cookie
        const verificationSuccessAlertOpen = verificationSuccessAlertOpenCookie
            ? verificationSuccessAlertOpenCookie.split("=")[1] === "true"
            : false;
        setOpen(verificationSuccessAlertOpen); //then its set to whatever on the component mount

        //deleta o cookie nao usado
        document.cookie = "VerificationSuccessAlertOpen=false; Max-Age=0";
    }, [setOpen]);

    return (
        <>
            <AlertDialog open={open}>
                <AlertDialogContent className='py-10 px-6 lg:py-10 lg:px-10 justify-center flex-col'>
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
                                🎉 Parabéns! Sua conta foi verificada com sucesso! 🎉
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
                        <Link
                            href='/dashboard/profile'
                            className='w-full'
                            onClick={() => setOpen(false)}
                        >
                            <AlertDialogAction className='w-full mt-3 bg-purple-600 hover:bg-purple-600/70 text-white'>
                                Começar
                            </AlertDialogAction>
                        </Link>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </>
    );
}
