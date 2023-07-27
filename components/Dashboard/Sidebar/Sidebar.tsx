"use client";

import { ModeToggle } from "@/components/ModeToggle";
import { Button } from "@/components/ui/button";
import { Menu, Home, Loader2 } from "lucide-react";
import { useEffect, useState } from "react";

export default function Sidebar() {
    const [isClient, setIsClient] = useState(false);
    const [screenWidth, setScreenWidth] = useState<number>(0); // Inicializa com 0

    function getCurrentDimension() {
        return window.innerWidth;
    }

    useEffect(() => {
        setIsClient(true);
        setScreenWidth(getCurrentDimension()); // Define a largura inicial quando o componente é montado

        // Adiciona o event listener apenas no lado do cliente
        const updateDimension = () => {
            setScreenWidth(getCurrentDimension());
        };
        window.addEventListener("resize", updateDimension);

        return () => {
            window.removeEventListener("resize", updateDimension); // Remove o event listener ao desmontar o componente
        };
    }, []);

    const [sidebarOpen, setSidebarOpen] = useState<boolean>(false);

    if (!isClient) {
        return null;
    }

    return (
        <>
            <div
                id='sidebar'
                className={`fixed w-80 h-screen bg-background transition-all duration-300 border-border border-r-[1px] z-[2]
flex justify-between flex-col ${screenWidth >= 1024 ? "" : sidebarOpen ? "" : "-translate-x-80"}`}
            >
                <div id='topsection' className='w-full h-16 bg-red-600'></div>

                <div
                    id='bottomsection'
                    className='w-full h-20 border-t-[1px] border-border flex items-center justify-between px-5'
                >
                    <div className='flex flex-row items-center gap-4'>
                        <div className='w-12 h-12 bg-card rounded-md'></div>
                        <div>
                            <h3 className='text-sm'>Nome de Usuário</h3>
                            <h3 className='text-sm text-muted-foreground'>email@abc.com</h3>
                        </div>
                    </div>
                    <ModeToggle />
                </div>
            </div>
            {screenWidth < 1024 ? (
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
                        className={`fixed w-80 h-screen bg-background transition-all duration-300 border-border border-r-[1px] z-[2]
                        flex justify-between flex-col ${sidebarOpen ? "" : "-translate-x-80"}`}
                    >
                        <div id='topsection' className='w-full h-16 bg-red-600'></div>

                        <div
                            id='bottomsection'
                            className='w-full h-20 border-t-[1px] border-border flex items-center justify-between px-5'
                        >
                            <div className='flex flex-row items-center gap-4'>
                                <div className='w-12 h-12 bg-card rounded-md'></div>
                                <div>
                                    <h3 className='text-sm'>Nome de Usuário</h3>
                                    <h3 className='text-sm text-muted-foreground'>email@abc.com</h3>
                                </div>
                            </div>
                            <ModeToggle />
                        </div>
                    </div>

                    <div
                        id='bottomnav'
                        className='w-full h-20 fixed z-[1] top-full -translate-y-20 bg-card rounded-t-3xl flex items-center justify-around'
                    >
                        <Home />
                        <Home />
                        <Home />
                        <Home />
                    </div>
                </>
            ) : (
                <></>
            )}
        </>
    );
}
