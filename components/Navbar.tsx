'use client'

import { ModeToggle } from "./ModeToggle"
import { Button } from "./ui/button"
import { Github, Menu, X } from "lucide-react"
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip"
import GymnLogo from "./GymnLogo"
import Link from "next/link"
import { useState } from "react"

export default function Navbar(){
    const [ navOpen , setNavOpen ] = useState<boolean>(false)
    
    return (
        <header className="flex justify-center">
            <div className={
                navOpen ? `g_NavOpen` : `g_Nav`
            }>
                <div className="w-[100%] max-w-6xl h-20 flex items-center justify-between">
                    <Link href='/'>                        
                        <GymnLogo width={90} className="fill-slate-950 dark:fill-white"/>
                    </Link>                   

                    <div className="flex items-center justify-center gap-2">            
                        <Link href='/auth' className="hidden lg:block">
                            <Button className="w-28" variant={'outline'}>Entrar</Button>
                        </Link>            

                        <TooltipProvider>
                            <Tooltip>
                                <TooltipTrigger asChild className="hidden lg:block">
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
                        
                        <i className="hidden lg:block">                            
                            <ModeToggle/>
                        </i>

                        <Button className="flex lg:hidden" variant={'outline'} size={'icon'} onClick={()=> setNavOpen(!navOpen)}>
                            {navOpen?
                            <X className={navOpen ? `rotate-0 scale-1` : `rotate-90 scale-0`}/>:
                            <Menu className="rotate-45"/>}
                        </Button>
                    </div>
                </div>                
            </div>
            <div className={
                navOpen? 
                `absolute z-40 w-[calc(100vw-2rem)] mt-[6rem] h-[calc(100vh-(6rem+1rem))] transition-all duration-300
                border-x-2 border-b-2 rounded-x-lg rounded-b-lg
                bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-20 px-10
                bg-gray-100 border-gray-300
                dark:bg-zinc-950 dark:border-zinc-800 dark:bg-opacity-20`
                : `absolute z-40 w-full h-20 transition-all duration-300
                bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-20 px-10
                bg-gray-100 border-gray-300
                dark:bg-zinc-950 dark:border-zinc-800 dark:bg-opacity-0`
            }>
                <div className="w-full h-full flex items-center justify-center">
                    <div className="flex items-center justify-center gap-2">
                        <TooltipProvider>
                            <Tooltip>
                                <TooltipTrigger asChild >
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
                        <i className="">                            
                            <ModeToggle/>
                        </i>
                    </div>
                    
                </div>
            </div>            
        </header>
    )
}