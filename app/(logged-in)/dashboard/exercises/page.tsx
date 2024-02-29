"use client";

import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { motion } from "framer-motion";
import ExerciseCard, { APIExercise } from "@/components/Dashboard/Exercises/ExerciseCard";
import Filters from "@/components/Dashboard/Exercises/Filters";
import { Skeleton } from "@/components/ui/skeleton";
import Link from "next/link";
import AddExercise from "@/components/Dashboard/Exercises/AddExercise/AddExercise";
import { useRouter, useSearchParams } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import ExerciseListDisplay, {
    ExerciseListFilter,
} from "@/components/Dashboard/Exercises/ExerciseListDisplay";

//TODO: Add 'remove filter' button, animating x to right, text to left
export default function Exercises() {
    const searchParams = useSearchParams();

    //Defines query params
    const queryParams: Record<string, string | null> = {
        muscle: searchParams.get("muscle"),
        equipment: searchParams.get("equipment"),
        difficulty: searchParams.get("level"),
    };

    const { data, isLoading } = useQuery({
        queryKey: ["exercises"], //key and params to define the query
        queryFn: () => {
            //function called on querying
            return axios.get(`/api/exercises`).then((res) => res.data);
        },
    });

    const renderTitle = () => {
        if (queryParams.muscle && queryParams.equipment) {
            return `Exercicios para ${queryParams.muscle} usando ${queryParams.equipment}`;
        }
        if (queryParams.muscle) return `Exercícios para ${queryParams.muscle}.`;
        if (queryParams.equipment) return `Exercícios com ${queryParams.equipment}`;
        else {
            return "Todos exercícios";
        }
    };

    const skeletons = new Array(15).fill(null);

    return (
        <div>
            <div id='title' className='flex w-full gap-4 justify-between'>
                <h1 className='text-4xl font-semibold'>Exercícios</h1>
                <AddExercise />
            </div>
            <div className='flex flex-col gap-4 mt-4 flex-wrap'>
                <div id='subtitle'>
                    <h2 className='text-xl font-semibold'>{renderTitle()}</h2>
                    <p className='text-sm text-muted-foreground'>
                        Exercícios para todos grupos musculares
                    </p>
                </div>
            </div>

            {!isLoading && (
                <div className='mt-4'>
                    <ExerciseListFilter />
                </div>
            )}

            <div className='grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-2 md:gap-4 mt-4 mb-20 lg:mb-0'>
                {!isLoading ? (
                    <ExerciseListDisplay exercises={data?.data} />
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
