"use client";
//This component shows an alert at any page when a certain cookie is true.
//Then the passed cookie is deleted.

import { AlertDialog, AlertDialogContent } from "@/components/ui/alert-dialog";
import { useState, useEffect, ReactNode, Dispatch, SetStateAction } from "react";

export default function CookieBasedAlert({
    cookieName,
    children,
    open,
    onOpenChange,
}: {
    cookieName: string;
    children?: ReactNode;
    open: boolean;
    onOpenChange: Dispatch<SetStateAction<boolean>>;
}) {
    // This terrible hack is needed to prevent hydration errors.
    // The Radix Dialog is not rendered correctly server side, so we need to prevent it from rendering until the client side hydration is complete (and `useEffect` is run).
    // The issue is reported here: https://github.com/radix-ui/primitives/issues/1386
    useEffect(() => {
        //extract cookies and split them
        const cookies = document.cookie.split("; ");
        const alertOpenCookie = cookies.find(
            (cookie) => cookie.startsWith(`${cookieName}=`) // find the specified cookie
        );
        //sets the open state as the cookie state
        const alertOpen = alertOpenCookie ? alertOpenCookie.split("=")[1] === "true" : false;
        onOpenChange(alertOpen); //then its set to whatever on the component mount

        //Delays the deletion to the next tick to ensure the dialog state changed
        setTimeout(() => {
            document.cookie = `${cookieName}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/`;
        }, 0);
    }, [onOpenChange, cookieName]);

    return (
        <>
            <AlertDialog open={open} onOpenChange={onOpenChange}>
                <AlertDialogContent className='py-10 px-6 lg:py-10 lg:px-10 justify-center flex-col'>
                    {children}
                </AlertDialogContent>
            </AlertDialog>
        </>
    );
}
