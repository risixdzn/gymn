'use client'

import Image from "next/image"
import { ModeToggle } from "./ModeToggle"
import { Button } from "./ui/button"
import { Github } from "lucide-react"
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip"
import GymnLogo from "./GymnLogo"

// import { 
//     NavigationMenu,
//     NavigationMenuList,
//     NavigationMenuItem,
//     NavigationMenuLink,
//     navigationMenuTriggerStyle
// } from "@/components/ui/navigation-menu"

// import Link from "next/link"

export default function Navbar(){    
    return (
        <header>
            <div className="
                fixed z-50 bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-20 px-10
                bg-gray-100 border-gray-200
                dark:bg-zinc-950 dark:border-zinc-900 dark:bg-opacity-20
                w-full h-20 flex items-center justify-center border-b-2 "
            >
                <div className="w-[100%] max-w-6xl h-20 flex items-center justify-between">
                    <GymnLogo width={90} className="fill-slate-950 dark:fill-white"/>

                    {/* <NavigationMenu>
                        <NavigationMenuList>
                            <NavigationMenuItem>
                                <Link href='/' legacyBehavior passHref>
                                    <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                                        Home
                                    </NavigationMenuLink>
                                </Link>
                            </NavigationMenuItem>
                            <NavigationMenuItem>
                                <Link href='/login' legacyBehavior passHref>
                                    <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                                        Login
                                    </NavigationMenuLink>
                                </Link>
                            </NavigationMenuItem>
                        </NavigationMenuList>
                    </NavigationMenu> */}

                    <div className="flex items-center justify-center gap-2">
                        <TooltipProvider>
                            <Tooltip>
                                <TooltipTrigger asChild>
                                    <a href='https://github.com/risixdzn/gymn' target="_blank">
                                        <Button variant={"outline"} size={'icon'}>
                                            <Github className="h-[1.2rem]"/>
                                        </Button>
                                    </a> 
                                </TooltipTrigger>
                                <TooltipContent>
                                    <p>Github repo!</p>
                                </TooltipContent>
                            </Tooltip>
                        </TooltipProvider>
                        
                        <ModeToggle/>
                    </div>
                </div>                
            </div>
        </header>
    )
}