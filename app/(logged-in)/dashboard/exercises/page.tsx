"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Dumbbell, Filter, ListFilter, Plus, Shapes, Triangle } from "lucide-react";
import { Dispatch, SetStateAction, useState } from "react";
import {
    Drawer,
    DrawerContent,
    DrawerDescription,
    DrawerTitle,
} from "@/components/ui/DrawerOrVaul";
import { useGetScreenWidth } from "@/lib/hooks/useGetScreenWidth";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

export type Exercise = {
    id: string;
    muscle: string[];
    name: string;
    equipment: string[];
    level: string;
    description: string;
};

const ExerciseCard = ({ exercise }: { exercise: Exercise }) => {
    return (
        <Card key={exercise.id}>
            <CardHeader>
                <CardTitle>{exercise.name}</CardTitle>
                <CardDescription>{exercise.equipment}</CardDescription>
            </CardHeader>
            <CardContent>
                <p className='font-semibold'>Músculos</p>
                {exercise.muscle.map((muscle: string) => (
                    <Badge key={muscle}>{muscle}</Badge>
                ))}
            </CardContent>
        </Card>
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

            <div className='flex flex-col gap-4 mt-4'>
                {data?.data.map((exercise: Exercise) => (
                    <ExerciseCard key={exercise.id} exercise={exercise} />
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
                        className={`py-4 border-b-[1px] border-border w-full px-4 flex items-center gap-4 ${
                            filteredMuscle == "" && "bg-accent/50 rounded-lg border-b-0"
                        }`}
                        onClick={() => {
                            setFilteredMuscle("");
                            setMuscleFilterDrawerOpen(false);
                        }}
                    >
                        <div className='w-12 h-12 bg-accent rounded-full'></div>
                        <span className='text-sm'>Todos</span>
                    </button>
                    {muscles.map((muscle, index) => (
                        <button
                            className={`py-4 border-b-[1px] border-border w-full px-4 flex items-center gap-4 ${
                                filteredMuscle == muscle && "bg-accent/50 rounded-lg border-b-0"
                            }`}
                            onClick={() => {
                                setCurrentFilters([...currentFilters, muscle]);
                                setFilteredMuscle(muscle);
                                setMuscleFilterDrawerOpen(false);
                            }}
                            key={index}
                        >
                            <div className='w-12 h-12 bg-accent rounded-full'></div>
                            <span className='text-sm'>{muscle}</span>
                        </button>
                    ))}
                </div>
            </DrawerContent>
        </Drawer>
    );
}
