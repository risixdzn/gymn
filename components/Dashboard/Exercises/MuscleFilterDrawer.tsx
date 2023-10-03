import {
    Drawer,
    DrawerContent,
    DrawerDescription,
    DrawerTitle,
    DrawerTrigger,
} from "@/components/ui/DrawerOrVaul";
import { Input } from "@/components/ui/input";
import { useGetScreenWidth } from "@/lib/hooks/useGetScreenWidth";
import { Grid2x2, Search } from "lucide-react";
import { Dispatch, SetStateAction, useEffect } from "react";
import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { muscles } from "./Filters";
import { Button } from "@/components/ui/button";

export default function MuscleFilterDrawer() {
    const [open, setOpen] = useState(false);
    const { screenWidth } = useGetScreenWidth();
    const searchParams = useSearchParams();
    const selectedMuscle = searchParams.get("muscle");

    const [searchTerm, setSearchTerm] = useState(""); // State for the search term
    // Filter the muscles based on the search term
    const searchedMuscles = muscles.filter((muscle) =>
        muscle.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <Drawer screenWidth={screenWidth} open={open} onOpenChange={setOpen}>
            <DrawerTrigger screenWidth={screenWidth}>
                <Button className='h-8' variant={selectedMuscle ? "secondary" : "outline"}>
                    {selectedMuscle ? selectedMuscle : "Todos os músculos"}
                </Button>
            </DrawerTrigger>
            <DrawerContent screenWidth={screenWidth} scrollable={true} closeVisible={false}>
                <div className='pt-12 z-[2] -translate-y-12 sticky top-0 bg-background pb-4'>
                    <DrawerTitle screenWidth={screenWidth} className='z-[4]'>
                        Grupos musculares
                    </DrawerTitle>
                    <DrawerDescription screenWidth={screenWidth} className='text-left '>
                        Selecione o grupo musculares para filtrar os exercícios.
                    </DrawerDescription>
                    <div id='search' className='relative mt-4'>
                        <Search className='absolute top-0 bottom-0 w-6 h-6 my-auto left-3 scale-75' />
                        <Input
                            type='text'
                            placeholder='Search'
                            className='pl-12 pr-4'
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                </div>
                <div className='mt-2 -translate-y-12'>
                    <Link
                        href={`?`}
                        className={`py-4 border-b-[1px] border-border w-full px-4 flex items-center gap-4 hover:bg-accent/50 ${
                            selectedMuscle == "" && "bg-accent/50"
                        }`}
                        onClick={() => setOpen(false)}
                    >
                        <div
                            className={`w-12 h-12 bg-accent rounded-full flex items-center justify-center shadow-md ${
                                selectedMuscle == "" && "bg-background"
                            }`}
                        >
                            <Grid2x2 className='text-foreground' />
                        </div>
                        <span className='text-sm'>Todos</span>
                    </Link>
                    {searchedMuscles.map((muscle, index) => (
                        <Link
                            href={`?muscle=${muscle}`}
                            className={`py-4 border-b-[1px] border-border w-full px-4 flex items-center gap-4 hover:bg-accent/50 hadow-md ${
                                selectedMuscle == muscle && "bg-accent/50"
                            }`}
                            key={index}
                            onClick={() => setOpen(false)}
                        >
                            <div
                                className={`w-12 h-12 bg-accent rounded-full flex items-center justify-center shadow-md ${
                                    selectedMuscle == muscle && "bg-background"
                                }`}
                            ></div>
                            <span className='text-sm'>{muscle}</span>
                        </Link>
                    ))}
                </div>
            </DrawerContent>
        </Drawer>
    );
}
