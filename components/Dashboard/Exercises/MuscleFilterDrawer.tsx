import {
    Drawer,
    DrawerContent,
    DrawerDescription,
    DrawerTitle,
} from "@/components/ui/DrawerOrVaul";
import { Input } from "@/components/ui/input";
import { SheetClose } from "@/components/ui/sheet";
import { useGetScreenWidth } from "@/lib/hooks/useGetScreenWidth";
import { Grid2x2, Search } from "lucide-react";
import { Dispatch, SetStateAction } from "react";
import { useState } from "react";
import { motion } from "framer-motion";

export default function MuscleFilterDrawer({
    muscles,
    muscleFilterDrawerOpen,
    setMuscleFilterDrawerOpen,
    setFilteredMuscle,
    setCurrentFilters,
    currentFilters,
    filteredMuscle,
}: {
    muscles: string[];
    muscleFilterDrawerOpen: boolean;
    setMuscleFilterDrawerOpen: Dispatch<SetStateAction<boolean>>;
    setFilteredMuscle: Dispatch<SetStateAction<string>>;
    setCurrentFilters: Dispatch<SetStateAction<string[]>>;

    currentFilters: string[];
    filteredMuscle: string;
}) {
    const { screenWidth } = useGetScreenWidth();

    const [searchTerm, setSearchTerm] = useState(""); // State for the search term

    // Filter the muscles based on the search term
    const searchedMuscles = muscles.filter((muscle) =>
        muscle.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <Drawer
            screenWidth={screenWidth}
            open={muscleFilterDrawerOpen}
            onOpenChange={setMuscleFilterDrawerOpen}
        >
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
                    <button
                        className={`py-4 border-b-[1px] border-border w-full px-4 flex items-center gap-4 hover:bg-accent/50 ${
                            filteredMuscle == "" && "bg-accent/50"
                        }`}
                        onClick={() => {
                            setFilteredMuscle("");
                            setMuscleFilterDrawerOpen(false);
                        }}
                    >
                        <div
                            className={`w-12 h-12 bg-accent rounded-full flex items-center justify-center shadow-md ${
                                filteredMuscle == "" && "bg-background"
                            }`}
                        >
                            <Grid2x2 className='text-foreground' />
                        </div>
                        <span className='text-sm'>Todos</span>
                    </button>
                    {searchedMuscles.map((muscle, index) => (
                        <motion.button
                            className={`py-4 border-b-[1px] border-border w-full px-4 flex items-center gap-4 hover:bg-accent/50 hadow-md ${
                                filteredMuscle == muscle && "bg-accent/50"
                            }`}
                            onClick={() => {
                                setCurrentFilters([...currentFilters, muscle]);
                                setFilteredMuscle(muscle);
                                setMuscleFilterDrawerOpen(false);
                            }}
                            key={index}
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: index * 0.03 }}
                        >
                            <div
                                className={`w-12 h-12 bg-accent rounded-full flex items-center justify-center shadow-md ${
                                    filteredMuscle == muscle && "bg-background"
                                }`}
                            ></div>
                            <span className='text-sm'>{muscle}</span>
                        </motion.button>
                    ))}
                </div>
            </DrawerContent>
        </Drawer>
    );
}
