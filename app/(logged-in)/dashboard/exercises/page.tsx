"use client";

import { Button } from "@/components/ui/button";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Plus } from "lucide-react";
import { useState } from "react";
import { motion } from "framer-motion";
import ExerciseCard from "@/components/Dashboard/Exercises/ExerciseCard";
import Filters from "@/components/Dashboard/Exercises/Filters";
import { Skeleton } from "@/components/ui/skeleton";
import Link from "next/link";

export type Exercise = {
    id: string;
    muscle: string[];
    name: string;
    equipment: string[];
    level: "Iniciante" | "Intermediário" | "Avançado";
    description: string;
};

//TODO: Add 'remove filter' button, animating x to right, text to left

export default function Exercises() {
    const [filteredMuscle, setFilteredMuscle] = useState("");
    const [filteredEquipment, setFilteredEquipment] = useState("");
    const [currentFilters, setCurrentFilters] = useState<string[]>([]);

    const { data, isLoading } = useQuery({
        queryKey: ["exercises", filteredMuscle, filteredEquipment], //key and params to define the query
        queryFn: () => {
            //function called on querying
            return axios.get(`/api/exercises?muscle=${filteredMuscle}`).then((res) => res.data);
        },
    });

    const renderTitle = () => {
        if (filteredMuscle) return `Exercícios para ${filteredMuscle}.`;

        if (filteredEquipment) return `Exercícios com ${filteredEquipment}`;

        if (filteredMuscle && filteredEquipment) {
            return `Exercicios para ${filteredMuscle} com ${filteredEquipment}`;
        } else {
            return "Todos exercícios";
        }
    };

    const [muscleFilterDrawerOpen, setMuscleFilterDrawerOpen] = useState(false);
    const [equipmentFilterDrawerOpen, setEquipmentFilterDrawerOpen] = useState(false);

    const skeletons = new Array(15).fill(null);

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
            </div>

            <Filters
                className='mt-4'
                filteredMuscle={filteredMuscle}
                filteredEquipment={filteredEquipment}
                muscleFilterDrawerOpen={muscleFilterDrawerOpen}
                setMuscleFilterDrawerOpen={setMuscleFilterDrawerOpen}
                setFilteredMuscle={setFilteredMuscle}
                setCurrentFilters={setCurrentFilters}
                currentFilters={currentFilters}
            />

            <div className='grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-2 md:gap-4 mt-4 mb-20 lg:mb-0'>
                {!isLoading ? (
                    <>
                        {data?.data.map((exercise: Exercise, index: number) => (
                            <Link href={`/dashboard/exercises/${exercise.id}`} key={index}>
                                <motion.div
                                    initial={{ opacity: 0, scale: 0.8 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    transition={{ delay: index * 0.075 }}
                                >
                                    <ExerciseCard key={exercise.id} exercise={exercise} />
                                </motion.div>
                            </Link>
                        ))}
                    </>
                ) : (
                    <>
                        {skeletons.map((_, index) => (
                            <Skeleton
                                className='w-full h-[150px] md:h-[250px] lg:h-[300px] dark:opacity-50'
                                key={index}
                            />
                        ))}
                    </>
                )}
            </div>
        </div>
    );
}