"use client";

import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { motion } from "framer-motion";
import ExerciseCard from "@/components/Dashboard/Exercises/ExerciseCard";
import Filters from "@/components/Dashboard/Exercises/Filters";
import { Skeleton } from "@/components/ui/skeleton";
import Link from "next/link";
import AddExercise from "@/components/Dashboard/Exercises/AddExercise/AddExercise";
import { useSearchParams } from "next/navigation";
import { type Exercise } from "@/types/Workout";

//TODO: Add 'remove filter' button, animating x to right, text to left
export default function Exercises() {
    const searchParams = useSearchParams();

    //Defines query params
    const queryParams: Record<string, string | null> = {
        muscles: searchParams.get("muscles"),
        equipment: searchParams.get("equipment"),
        difficulty: searchParams.get("level"),
    };

    // Filter out keys with null values
    const filteredQueryParams = Object.entries(queryParams).reduce((acc, [key, value]) => {
        if (value !== null) {
            acc[key] = value;
        }
        return acc;
    }, {} as { [key: string]: string });

    const queryString = new URLSearchParams(filteredQueryParams);

    const { data, isLoading } = useQuery({
        queryKey: ["exercises", queryParams.muscle, queryParams.equipment, queryParams.difficulty], //key and params to define the query
        queryFn: () => {
            //function called on querying
            return axios
                .get(`/api/exercises?${queryString && queryString}`)
                .then((res) => res.data);
        },
    });

    const renderTitle = () => {
        if (queryParams.muscle) return `Exercícios para ${queryParams.muscle}.`;
        if (queryParams.equipment) return `Exercícios com ${queryParams.equipment}`;
        if (queryParams.muscle && queryParams.equipment) {
            return `Exercicios para ${queryParams.muscle} com ${queryParams.equipment}`;
        } else {
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
                <p className='hidden'>{`/api/exercises?${queryString}`}</p>
            </div>

            <Filters className='mt-4' />

            <div className='grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-2 md:gap-4 mt-4 mb-20 lg:mb-0'>
                {!isLoading ? (
                    <>
                        {data?.data.map((exercise: Exercise, index: number) => (
                            <Link href={`/dashboard/exercises/${exercise.id}`} key={index}>
                                <motion.div
                                    initial={
                                        index < 35
                                            ? { opacity: 0, scale: 0.8 }
                                            : { opacity: 1, scale: 1 }
                                    }
                                    animate={{ opacity: 1, scale: 1 }}
                                    transition={{ delay: index * 0.075 }}
                                >
                                    <ExerciseCard seeMore key={exercise.id} exercise={exercise} />
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
