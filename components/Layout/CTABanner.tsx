"use client";

import { ArrowRight, X } from "lucide-react";
import { Button } from "../ui/button";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";

interface CTAProps {
    text: string;
    cta: string;
    href: string;
    boldPhrase?: string;
    identifier: string;
    openTimeout: number;
}

export default function CTABanner({
    text,
    cta,
    href,
    boldPhrase,
    identifier,
    openTimeout,
}: CTAProps) {
    const [open, setOpen] = useState(false);

    useEffect(() => {
        const localState = localStorage.getItem(identifier);
        if (localState === "false") {
            setOpen(false);
        }
        if (localState === null || localState === "true") {
            console.log(
                `UseEffect triggered // Localstate: ${localState} => type: ${typeof localState}`
            );
            // Only set it to "true" if it doesn't exist or is "true"
            setTimeout(() => {
                localStorage.setItem(identifier, "true");
                setOpen(true);
            }, openTimeout);
        }
    }, [setOpen, identifier, openTimeout]);

    useEffect(() => {
        console.log("openstate => ", open);
    }, [open]);

    function closeCTA() {
        localStorage.setItem(identifier, "false");
        setOpen(false);
        return;
    }

    return (
        <div
            id='wrapper'
            className={cn(
                open ? "translate-y-0" : "translate-y-36",
                "w-full fixed z-[60] bottom-0 h-auto p-3 transition-all pointer-events-auto"
            )}
        >
            <div
                id='banner'
                className='w-full max-w-7xl mx-auto rounded-lg z-50 isolate flex items-center gap-x-6 overflow-hidden bg-gradient-to-br from-g_purple to-g_darkpurple px-6 py-2.5 sm:px-3.5 sm:before:flex-1'
            >
                <div className='flex flex-wrap items-center gap-x-4 gap-y-2 text-white'>
                    <p className='text-sm leading-6 '>
                        {boldPhrase && (
                            <>
                                <strong className='font-semibold'>{boldPhrase}</strong>
                                <svg
                                    viewBox='0 0 2 2'
                                    className='mx-2 inline h-0.5 w-0.5 fill-current'
                                    aria-hidden='true'
                                >
                                    <circle cx='1' cy='1' r='1' />
                                </svg>
                            </>
                        )}
                        {text}
                    </p>
                    {open}
                    <Link href={href} onClick={() => closeCTA()}>
                        <Button className='px-3.5 py-1 h-auto rounded-full' variant={"secondary"}>
                            {cta}
                            <ArrowRight className='scale-75 ml-1' />
                        </Button>
                    </Link>
                </div>
                <div className='flex flex-1 justify-end'>
                    <Button
                        size={"icon"}
                        variant={"ghost"}
                        className='hover:bg-transparent p-0 w-auto h-auto'
                        onClick={() => closeCTA()}
                    >
                        <X className='scale-75 text-white' />
                    </Button>
                </div>
            </div>
        </div>
    );
}
