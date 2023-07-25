"use client";

import { Button } from "@/components/ui/button";
import { Menu, Home } from "lucide-react";
import { useRef, ReactNode, useEffect, useState } from "react";

export default function Sidebar({ children }: { children: ReactNode }) {
    const [screenWidth, setScreenWidth] = useState(getCurrentDimension());
    function getCurrentDimension() {
        return window.innerWidth;
    }

    useEffect(() => {
        const updateDimension = () => {
            setScreenWidth(getCurrentDimension());
        };
        window.addEventListener("resize", updateDimension);

        return () => {
            window.removeEventListener("resize", updateDimension);
        };
    }, [screenWidth]);

    const [sidebarOpen, setSidebarOpen] = useState<boolean>(true);

    return (
        <>
            {screenWidth >= 1080 ? (
                //desktop sidebar
                <>
                    <div className='fixed w-80 h-screen bg-background border-border border-r-[1px]'></div>
                    <div className='ml-80 px-10 py-7'>{children}</div>
                </>
            ) : (
                //mobile sidebar + navmenu on bottom
                <>
                    <Button
                        className={`z-[3] fixed mx-3 mt-3 transition-all duration-300 ${
                            sidebarOpen ? "translate-x-[calc(20rem-(100%+(0.75rem*2)))]" : ""
                        }`}
                        size={"icon"}
                        variant={"ghost"}
                    >
                        <Menu
                            className='absolute z-50'
                            onClick={() => setSidebarOpen(!sidebarOpen)}
                        />
                    </Button>
                    <div
                        id={"header"}
                        className='w-full h-16 bg-background fixed flex items-center px-3 z-[1]'
                    >
                        <div className='w-full h-full flex items-center justify-center text-sm'>
                            <h4>Profile</h4>
                        </div>
                    </div>

                    <div
                        id='sidebar'
                        className={`fixed w-80 h-screen bg-background transition-all duration-300 border-border border-r-[1px] z-[2] ${
                            sidebarOpen ? "" : "-translate-x-80"
                        }`}
                    ></div>

                    <div
                        id='bottomnav'
                        className='w-full h-20 fixed z-[1] top-full -translate-y-20 bg-card rounded-t-3xl flex items-center justify-around'
                    >
                        <Home />
                        <Home />
                        <Home />
                        <Home />
                    </div>

                    <div className='px-5 mt-16'>{children}</div>
                </>
            )}
        </>
    );
}
