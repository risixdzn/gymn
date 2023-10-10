"use client";

import { useContext } from "react";
import { SidebarData } from "../Sidebar/SidebarContext";
import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";
import Header from "./Header";
import BottomNav from "./BottomNav";

export default function MobileLayout() {
    const { screenWidth, setSidebarOpen, sidebarOpen, pathname } = useContext(SidebarData);

    return (
        <>
            {/* Mobile layout (displays a route header, a hamburger button and the bottomnav) */}
            {screenWidth < 1024 && (
                <>
                    {/* Route header */}
                    <Header pathname={pathname} />
                    {/* Hamburger */}
                    <Button
                        className={`z-[40] fixed right-0 mx-3 mt-3 transition-all duration-300 `}
                        size={"icon"}
                        variant={"ghost"}
                        onClick={() => setSidebarOpen(!sidebarOpen)}
                    >
                        <Menu className='absolute z-50' />
                    </Button>

                    <div
                        id='blurry-bg'
                        className={`fixed w-full h-full bg-black z-[29] backdrop-blur-lg     transition-all ${
                            sidebarOpen
                                ? "opacity-20 dark:opacity-50 pointer-events-auto"
                                : "pointer-events-none opacity-0"
                        }`}
                        onClick={() => setSidebarOpen(!sidebarOpen)}
                    ></div>
                    {/* Bottom navigation */}
                    <BottomNav pathname={pathname} />
                </>
            )}
        </>
    );
}
