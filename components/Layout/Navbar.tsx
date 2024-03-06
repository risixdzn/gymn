"use client";

import { ModeToggle } from "../ModeToggle";
import { Button } from "../ui/button";
import { Github, LogIn, User } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import GymnLogo from "../ui/Icons/GymnLogo";
import Link from "next/link";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import GymnIcon from "../ui/Icons/GymnIcon";
import { useSession } from "@/lib/supabase/useSession";

export default function Navbar() {
    const [navOpen, setNavOpen] = useState<boolean>(false);
    const pathname = usePathname();

    const session = useSession();

    useEffect(() => {
        setNavOpen(false);
    }, [pathname]);

    return (
        <header className='flex justify-center pointer-events-auto'>
            <div
                className={`fixed z-50 mt- bg-clip-padding backdrop-filter backdrop-blur-xl px-10 border-border/50 transition-all duration-300
                ${
                    navOpen
                        ? "w-[calc(100vw-2rem)] mt-[1rem] h-20 bg-background/80 flex rounded-t-lg items-center justify-center border-x-2 border-t-2 "
                        : "w-full h-20 flex items-center bg-background/40 justify-center border-b-2"
                }`}
            >
                <div className='w-[100%] max-w-7xl h-20 flex items-center justify-between'>
                    <Link href='/'>
                        <GymnLogo
                            width={90}
                            className='fill-slate-950 dark:fill-white lg:block hidden'
                        />
                        <GymnIcon
                            width={30}
                            height={30}
                            className='fill-slate-950 dark:fill-white lg:hidden block'
                        />
                    </Link>

                    <div className='flex items-center justify-center gap-2'>
                        {session ? (
                            <Link href='/dashboard/profile' className=''>
                                <Button variant={"outline"} className='relative'>
                                    {session.user.user_metadata.username}{" "}
                                    <User className='ml-1' width={20} />
                                    <div className='absolute top-0 left-[calc(100%-0.75rem)]'>
                                        <div className='absolute w-3 h-3 rounded-full bg-g_purple animate-ping'></div>
                                        <div className='absolute w-3 h-3 rounded-full bg-g_purple'></div>
                                    </div>
                                </Button>
                            </Link>
                        ) : (
                            <Link href='/auth' className=''>
                                <Button className='w-28' variant={"outline"}>
                                    Entrar <LogIn className='mx-1' width={20} />
                                </Button>
                            </Link>
                        )}

                        <TooltipProvider>
                            <Tooltip delayDuration={0}>
                                <TooltipTrigger asChild className='hidden lg:block'>
                                    <a href='https://github.com/risixdzn/gymn' target='_blank'>
                                        <Button variant={"outline"} size={"icon"}>
                                            <Github className='h-[1.2rem]' />
                                        </Button>
                                    </a>
                                </TooltipTrigger>
                                <TooltipContent>
                                    <p>Github repo!</p>
                                </TooltipContent>
                            </Tooltip>
                        </TooltipProvider>

                        <i className='hidden lg:block'>
                            <ModeToggle side='top' />
                        </i>

                        <Button
                            className='flex lg:hidden'
                            variant={"outline"}
                            size={"icon"}
                            onClick={() => setNavOpen(!navOpen)}
                        >
                            <div
                                className={`block w-5 absolute transform transition duration-500 ${
                                    navOpen ? "-translate-y-1.5" : ""
                                }`}
                            >
                                <span
                                    className={`block absolute h-0.5 w-5 bg-current transform transition -translate-y-1.5 duration-500 ease-in-out 
                                ${navOpen ? "rotate-45 translate-y-1.5" : ""}`}
                                ></span>
                                <span
                                    className={`block absolute h-0.5 w-5 bg-current transform transition duration-500 ease-in-out 
                                ${navOpen ? "opacity-0" : ""}`}
                                ></span>
                                <span
                                    className={`block absolute h-0.5 w-5 bg-current transform transition translate-y-1.5 duration-500 ease-in-out 
                                ${navOpen ? "-rotate-45 -translate-y-1.5" : ""}`}
                                ></span>
                            </div>
                        </Button>
                    </div>
                </div>
            </div>
            <div
                className={
                    navOpen
                        ? `absolute z-40 w-[calc(100vw-2rem)] mt-[6rem] h-[25rem] transition-all duration-300
                    border-x-2 border-b-2 rounded-x-lg rounded-b-lg
                    bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-20 px-5
                    bg-background/80 border-border/50`
                        : `absolute z-40 w-full h-20 transition-all duration-300
                    bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-20 px-5 
                    bg-background/0 border-border/50
                    `
                }
            >
                <div
                    id='mobileNavContent'
                    className={`w-full h-full items-center flex justify-center transition-all duration-300 ${
                        navOpen
                            ? "flex opacity-100 pointer-events-auto"
                            : "opacity-0 pointer-events-none"
                    } `}
                >
                    <div
                        id='mobileNavFooter'
                        className='w-full h-[5rem] self-end flex items-center justify-end gap-2'
                    >
                        <TooltipProvider>
                            <Tooltip delayDuration={0}>
                                <TooltipTrigger asChild>
                                    <a href='https://github.com/risixdzn/gymn' target='_blank'>
                                        <Button variant={"outline"} size={"icon"}>
                                            <Github className='h-[1.2rem]' />
                                        </Button>
                                    </a>
                                </TooltipTrigger>
                                <TooltipContent>
                                    <p>Github repo!</p>
                                </TooltipContent>
                            </Tooltip>
                        </TooltipProvider>

                        <ModeToggle side='top' />

                        <Link href='/auth'>
                            <Button className='w-28' variant={"outline"}>
                                Entrar <LogIn className='mx-1' width={20} />
                            </Button>
                        </Link>
                    </div>
                </div>
            </div>
        </header>
    );
}
