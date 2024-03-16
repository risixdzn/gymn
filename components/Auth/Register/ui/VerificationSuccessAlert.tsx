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
import CookieBasedAlert from "@/components/CookieBasedAlert";
import { getCookie } from "@/lib/cookies";

export default function VerficationSuccessAlert() {
    const [open, setOpen] = useState<boolean>(false);
    const [redirectUrl, setRedirectUrl] = useState<string | undefined>();

    useEffect(() => {
        async function fetchRedirectUrl() {
            const url = await getCookie("redirectUrl");
            setRedirectUrl(url?.value);
        }
        fetchRedirectUrl();
    }, []);

    return (
        <CookieBasedAlert
            cookieName={"VerificationSuccessAlertOpen"}
            open={open}
            onOpenChange={setOpen}
        >
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
                    href={redirectUrl ?? "/dashboard/profile"}
                    className='w-full'
                    onClick={() => setOpen(false)}
                >
                    <AlertDialogAction className='w-full mt-3 bg-purple-600 hover:bg-purple-600/70 text-white'>
                        Começar
                    </AlertDialogAction>
                </Link>
            </AlertDialogFooter>
        </CookieBasedAlert>
    );
}
