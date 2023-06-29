import Image from "next/image"
import GymnLogo from '../public/gymn_BlackTextLogo.svg'
import { ModeToggle } from "./ModeToggle"
import { Button } from "./ui/button"
import { Github } from "lucide-react"
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
  } from "@/components/ui/tooltip"

export default function Navbar(){
    return (
        <header>
            <div className="
                fixed z-50 bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-20
                bg-gray-100 border-gray-200
                dark:bg-zinc-950 dark:border-zinc-900 dark:bg-opacity-20
                w-full h-20 flex items-center justify-center border-b-2 "
            >
                <div className="w-[100%] max-w-6xl h-20 flex items-center justify-between">
                    <Image src={GymnLogo} alt='' width={90} className="dark:invert"/>
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