"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Plus } from "lucide-react";
import { Dispatch, SetStateAction, useState } from "react";
import {
    Drawer,
    DrawerContent,
    DrawerDescription,
    DrawerTitle,
    DrawerTrigger,
} from "@/components/ui/DrawerOrVaul";
import { useGetScreenWidth } from "@/lib/hooks/useGetScreenWidth";

export type Exercise = {
    id: string;
    muscle: string[];
    name: string;
    equipment: string[];
    level: string;
    description: string;
};

interface QueryMuscle {
    muscle: string;
    filteredMuscle: string;
    setFilteredMuscle: Dispatch<SetStateAction<string>>;
}
const QueryMuscle = ({ muscle, filteredMuscle, setFilteredMuscle }: QueryMuscle) => {
    return (
        <Button
            variant={muscle == filteredMuscle ? "default" : "outline"}
            className='whitespace-nowrap'
            onClick={() => setFilteredMuscle(muscle)}
        >
            {muscle}
        </Button>
    );
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
    const [filteredMuscle, setFilteredMuscle] = useState("");
    const [filteredEquipment, setFilteredEquipment] = useState("");
    const { screenWidth } = useGetScreenWidth();
    const [drawerOpen, setDrawerOpen] = useState(false);

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

    return (
        <div>
            <div id='title' className='flex w-full gap-4 justify-between'>
                <h1 className='text-4xl font-semibold'>Exercícios</h1>
                <Button>
                    <Plus className='scale-75' /> Adicionar
                </Button>
            </div>
            <div className='flex flex-row items-center gap-4 mt-4 flex-wrap'>
                <div id='subtitle'>
                    <h2 className='text-xl font-semibold'>Todos exercícios (194)</h2>
                    <p className='text-sm text-muted-foreground'>
                        Exercícios para todos grupos musculares
                    </p>
                </div>
                <div id='filters' className='flex gap-4 w-full lg:w-auto'>
                    {/* Equipment Filter Button */}
                    <Drawer screenWidth={screenWidth}>
                        <DrawerTrigger screenWidth={screenWidth}>
                            <Button variant={"secondary"} className='w-full whitespace-nowrap'>
                                Todos equipamentos
                            </Button>
                        </DrawerTrigger>
                        <DrawerContent screenWidth={screenWidth}>
                            <DrawerTitle screenWidth={screenWidth}>AAAa</DrawerTitle>
                            <DrawerDescription screenWidth={screenWidth}>BBB</DrawerDescription>
                        </DrawerContent>
                    </Drawer>
                    {/* Muscles Filter Button */}
                    <Drawer
                        screenWidth={screenWidth}
                        open={drawerOpen}
                        onOpenChange={setDrawerOpen}
                    >
                        <DrawerTrigger screenWidth={screenWidth}>
                            <Button variant={"secondary"} className='w-full whitespace-nowrap'>
                                Todos músculos
                            </Button>
                        </DrawerTrigger>
                        <DrawerContent screenWidth={screenWidth}>
                            <DrawerTitle screenWidth={screenWidth}>Grupo muscular</DrawerTitle>
                            <DrawerDescription screenWidth={screenWidth}>
                                Selecione o grupo muscular
                            </DrawerDescription>
                            <div className='flex flex-col'>
                                {muscles.map((muscle) => (
                                    <button
                                        className='w-full min-w-[300px] border-b-[1px] border-border py-4 flex items-center gap-4'
                                        key={muscle}
                                        onClick={() => {
                                            setFilteredMuscle(muscle);
                                            setDrawerOpen(false);
                                        }}
                                    >
                                        <div className='bg-accent w-16 h-16 rounded-full'></div>
                                        <span className='text-sm '>{muscle}</span>
                                    </button>
                                ))}
                            </div>
                        </DrawerContent>
                    </Drawer>
                </div>
            </div>

            <div className='flex flex-col gap-4 mt-4'>
                {data?.data.map((exercise: Exercise) => (
                    <ExerciseCard key={exercise.id} exercise={exercise} />
                ))}
            </div>
        </div>
    );
}
