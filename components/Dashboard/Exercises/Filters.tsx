import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Dumbbell, ListFilter, Shapes, Triangle, X } from "lucide-react";
import MuscleFilterDrawer from "./MuscleFilterDrawer";
import { Dispatch, SetStateAction } from "react";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

export const muscles = [
    "Abdominais",
    "Abdutores",
    "Adutores",
    "Antebraços",
    "Biceps",
    "Cardio",
    "Costas superiores",
    "Dorsais",
    "Quadríceps",
    "Glúteos",
    "Posterior",
    "Lombar",
    "Ombros",
    "Panturrilhas",
    "Peito",
    "Trapézio",
    "Tríceps",
];

type FiltersProps = {
    className: string;
    filteredMuscle: string;
    filteredEquipment: string;
    muscleFilterDrawerOpen: boolean;
    setMuscleFilterDrawerOpen: Dispatch<SetStateAction<boolean>>;
    setFilteredMuscle: Dispatch<SetStateAction<string>>;
    setCurrentFilters: Dispatch<SetStateAction<string[]>>;
    currentFilters: string[];
};

export default function Filters({
    className,
    filteredMuscle,
    filteredEquipment,
    muscleFilterDrawerOpen,
    setMuscleFilterDrawerOpen,
    setFilteredMuscle,
    setCurrentFilters,
    currentFilters,
}: FiltersProps) {
    return (
        <>
            <div
                id='filters'
                className={cn("w-full flex flex-row flex-wrap gap-2 transition-all", className)}
            >
                {/* Badges */}
                {filteredMuscle && (
                    <motion.a
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        className='cursor-pointer'
                    >
                        <Badge
                            className='group  transition-all hover:pr-10 h-8 rounded-md text-sm px-4 gap-2 relative'
                            variant={"secondary"}
                            onClick={() => setFilteredMuscle("")}
                        >
                            <span>{filteredMuscle}</span>
                            <X className='opacity-0 group-hover:opacity-100 transition-all hover:delay-100 text-muted-foreground scale-75 absolute right-0 mr-2' />
                        </Badge>
                    </motion.a>
                )}
                {filteredEquipment && (
                    <motion.a
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                    >
                        <Badge
                            className='group  transition-all hover:pr-10 h-8 rounded-md text-sm px-4 gap-2 relative'
                            variant={"secondary"}
                            // onClick={() => setFilteredEquipment("")}
                        >
                            <span>{filteredEquipment}</span>
                            <X className='opacity-0 group-hover:opacity-100 transition-all hover:delay-100 text-muted-foreground scale-75 absolute right-0 mr-2' />
                        </Badge>
                    </motion.a>
                )}
                {/* Add filter buttons */}
                <Popover>
                    <PopoverTrigger>
                        <Button variant={"outline"} className='h-8 text-xs'>
                            <ListFilter className='scale-75' /> Filtrar
                        </Button>
                    </PopoverTrigger>
                    <PopoverContent align='start' side='right' className='w-auto bg-background p-2'>
                        <div className='flex flex-col gap-[2px]'>
                            <Button
                                variant={"ghost"}
                                className='h-8 justify-start gap-2 px-2'
                                onClick={() => setMuscleFilterDrawerOpen(true)}
                            >
                                <Dumbbell className='text-muted-foreground scale-75' /> Músculos
                            </Button>
                            <hr></hr>
                            <Button variant={"ghost"} className='h-8 justify-start gap-2 px-2'>
                                <Triangle className='text-muted-foreground scale-75' /> Equipamentos
                            </Button>
                            <hr></hr>
                            <Button variant={"ghost"} className='h-8 justify-start gap-2 px-2'>
                                <Shapes className='text-muted-foreground scale-75' /> Dificuldade
                            </Button>
                        </div>
                    </PopoverContent>
                </Popover>
            </div>
            {/* Drawers */}
            <MuscleFilterDrawer
                muscles={muscles}
                muscleFilterDrawerOpen={muscleFilterDrawerOpen}
                setMuscleFilterDrawerOpen={setMuscleFilterDrawerOpen}
                setFilteredMuscle={setFilteredMuscle}
                filteredMuscle={filteredMuscle}
                setCurrentFilters={setCurrentFilters}
                currentFilters={currentFilters}
            />
        </>
    );
}
