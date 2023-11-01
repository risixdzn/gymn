"use client";

import { ReactNode, useEffect, useState } from "react";
import GymnIcon from "../ui/Icons/GymnIcon";

export default function Preloader({ children }: { children: ReactNode }) {
    //This preloader was made to avoid layout shifts on the dashboard loading.
    //Since the dash layout uses window width to determine classes, it can only run on client
    //So we need to wait until the components render on client to display correct layout.
    //This causes layout shifts that are hard to fix, so we avoid it by displaying a preloader.

    const [showLoader, setShowLoader] = useState(true);

    //this preloader visibility is set to false when the client components render.
    useEffect(() => {
        setShowLoader(false);
    }, []);

    return (
        <>
            {showLoader && (
                <div className='fixed w-full h-full bg-background z-[9999] overflow-hidden flex items-center justify-center'>
                    <GymnIcon className='w-8 fill-slate-950 dark:fill-white animate-pulse' />
                </div>
            )}
            {children}
        </>
    );
}
