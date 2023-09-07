"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { ArrowRight, Dumbbell, Grid2x2, ListFilter, Plus, Shapes, Triangle } from "lucide-react";
import { Dispatch, SetStateAction, useState } from "react";
import {
    Drawer,
    DrawerContent,
    DrawerDescription,
    DrawerTitle,
} from "@/components/ui/DrawerOrVaul";
import { useGetScreenWidth } from "@/lib/hooks/useGetScreenWidth";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { motion } from "framer-motion";

export type Exercise = {
    id: string;
    muscle: string[];
    name: string;
    equipment: string[];
    level: "Iniciante" | "Intermediário" | "Avançado";
    description: string;
};

//TODO: Add 'remove filter' button, animating x to right, text to left

const ExerciseCard = ({ exercise }: { exercise: Exercise }) => {
    type DifficultiesMap = {
        [key: string]: string;
    };
    const difficultyColor = ({ level }: { level: string }) => {
        const difficulties: DifficultiesMap = {
            Iniciante: "#22c55e",
            Intermediário: "#f59e0b",
            Avançado: "#ef4444",
        };
        return difficulties[level] || "#8a2be2";
    };

    return (
        <div
            id='card'
            className='relative cursor-pointer w-full p-4 rounded-lg h-[125px] md:h-[250px] lg:h-[300px] bg-card shadow-xl border-[1px] border-border
            after:bg-gradient-to-b after:from-transparent after:via-slate-900/50 dark:after:via-white after:to-transparent 
            after:w-[1px] after:h-[50px] md:after:h-[140px] after:absolute after:left-[-1px] after:top-[65%] after:opacity-0 after:content-[""]
            after:transition-all after:ease-in-out after:transition-duration-[600ms]
            hover:after:top-[10%] hover:after:opacity-100
            before:bg-gradient-to-b before:from-transparent before:via-slate-900/50 dark:before:via-white before:to-transparent 
            before:w-[1px] before:h-[50px] md:before:h-[140px] before:absolute before:right-[-1px] before:bottom-[65%] before:opacity-0 before:content-[""]
            before:transition-all before:ease-in-out before:transition-duration-[600ms]
            hover:before:bottom-[10%] hover:before:opacity-100 
            dark:hover:bg-accent/40
            hover:bg-accent/30
            transition-all'
        >
            <div
                id='difficulty_indicator'
                className={`hidden md:block w-full h-2 rounded-full`}
                style={{ backgroundColor: difficultyColor({ level: exercise.level }) }}
            ></div>
            <Badge
                variant={exercise.level}
                className='rounded-md absolute bottom-100 md:bottom-0 right-0 mb-4 mr-4'
            >
                {exercise.level}
            </Badge>
            <div id='info' className='mt-0 md:mt-2'>
                <h2 className='text-base md:text-lg font font-semibold max-w-[200px] md:max-w-none'>
                    {exercise.name}
                </h2>
            </div>
            <span className='absolute bottom-0 right-0 mb-3 mr-3 md:right-auto md:mb-4 text-xs text-muted-foreground flex items-center gap-[0.15rem]'>
                Ver mais <ArrowRight className='scale-[0.65] inline-block' />
            </span>
        </div>
    );
};

export default function Exercises() {
    const { screenWidth } = useGetScreenWidth();
    const [drawerOpen, setDrawerOpen] = useState(false);
    const [filteredMuscle, setFilteredMuscle] = useState("");
    const [filteredEquipment, setFilteredEquipment] = useState("");
    const [currentFilters, setCurrentFilters] = useState<string[]>([]);

    const { data } = useQuery({
        queryKey: ["exercises", filteredMuscle, filteredEquipment], //key and params to define the query
        queryFn: () => {
            //function called on querying
            return axios.get(`/api/exercises?muscle=${filteredMuscle}`).then((res) => res.data);
        },
    });

    const muscles = [
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

    const renderTitle = () => {
        if (filteredMuscle) {
            return `Exercícios para ${filteredMuscle}.`;
        }
        if (filteredEquipment) {
            return `Exercícios com ${filteredEquipment}`;
        }
        if (filteredMuscle && filteredEquipment) {
            return `Exercicios para ${filteredMuscle} com ${filteredEquipment}`;
        } else {
            return "Todos exercícios";
        }
    };

    const [muscleFilterDrawerOpen, setMuscleFilterDrawerOpen] = useState(false);
    const [equipmentFilterDrawerOpen, setEquipmentFilterDrawerOpen] = useState(false);

    return (
        <div>
            <div id='title' className='flex w-full gap-4 justify-between'>
                <h1 className='text-4xl font-semibold'>Exercícios</h1>
                <Button>
                    <Plus className='scale-75' /> Adicionar
                </Button>
            </div>
            <div className='flex flex-col gap-4 mt-4 flex-wrap'>
                <div id='subtitle'>
                    <h2 className='text-xl font-semibold'>{renderTitle()}</h2>
                    <p className='text-sm text-muted-foreground'>
                        Exercícios para todos grupos musculares
                    </p>
                </div>
                <div id='filters' className='w-full flex flex-row flex-wrap gap-2 '>
                    {filteredMuscle && (
                        <Badge className='h-8 rounded-md text-sm px-6' variant={"secondary"}>
                            {filteredMuscle}
                        </Badge>
                    )}
                    {filteredEquipment && (
                        <Badge className='h-8 rounded-md text-sm px-6' variant={"secondary"}>
                            {filteredEquipment}
                        </Badge>
                    )}
                    <Popover>
                        <PopoverTrigger>
                            <Button variant={"outline"} className='h-8 text-xs'>
                                <ListFilter className='scale-75' /> Filtrar
                            </Button>
                        </PopoverTrigger>
                        <PopoverContent align='start' className='w-auto bg-background'>
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
                                    <Triangle className='text-muted-foreground scale-75' />{" "}
                                    Equipamentos
                                </Button>
                                <hr></hr>
                                <Button variant={"ghost"} className='h-8 justify-start gap-2 px-2'>
                                    <Shapes className='text-muted-foreground scale-75' />{" "}
                                    Dificuldade
                                </Button>
                            </div>
                        </PopoverContent>
                    </Popover>
                </div>
                <MuscleFilterDrawer
                    muscles={muscles}
                    muscleFilterDrawerOpen={muscleFilterDrawerOpen}
                    setMuscleFilterDrawerOpen={setMuscleFilterDrawerOpen}
                    setFilteredMuscle={setFilteredMuscle}
                    filteredMuscle={filteredMuscle}
                    setCurrentFilters={setCurrentFilters}
                    currentFilters={currentFilters}
                />
            </div>

            <div className='grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-4 mt-4'>
                {data?.data.map((exercise: Exercise, index: number) => (
                    <motion.div
                        key={index}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: index * 0.04 }}
                    >
                        <ExerciseCard key={exercise.id} exercise={exercise} />
                    </motion.div>
                ))}
            </div>
        </div>
    );
}

function MuscleFilterDrawer({
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

    return (
        <Drawer
            screenWidth={screenWidth}
            open={muscleFilterDrawerOpen}
            onOpenChange={setMuscleFilterDrawerOpen}
        >
            <DrawerContent screenWidth={screenWidth} scrollable={true}>
                <DrawerTitle screenWidth={screenWidth}>Grupos musculares</DrawerTitle>
                <DrawerDescription screenWidth={screenWidth} className='text-center lg:text-left'>
                    Selecione o grupo musculares para filtrar os exercícios.
                </DrawerDescription>
                <div className='mt-4'>
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
                    {muscles.map((muscle, index) => (
                        <button
                            className={`py-4 border-b-[1px] border-border w-full px-4 flex items-center gap-4 hover:bg-accent/50 hadow-md ${
                                filteredMuscle == muscle && "bg-accent/50"
                            }`}
                            onClick={() => {
                                setCurrentFilters([...currentFilters, muscle]);
                                setFilteredMuscle(muscle);
                                setMuscleFilterDrawerOpen(false);
                            }}
                            key={index}
                        >
                            <div
                                className={`w-12 h-12 bg-accent rounded-full flex items-center justify-center shadow-md ${
                                    filteredMuscle == muscle && "bg-background"
                                }`}
                            ></div>
                            <span className='text-sm'>{muscle}</span>
                        </button>
                    ))}
                </div>
            </DrawerContent>
        </Drawer>
    );
}
