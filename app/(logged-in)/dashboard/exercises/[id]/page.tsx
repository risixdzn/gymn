"use client";

import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { type Exercise } from "@/types/Workout";
import ExerciseCard, { APIExercise } from "@/components/Dashboard/Exercises/ExerciseCard";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

type ExercisePageProps = {
    params: {
        id: string;
    };
};

export default function ExercisePage({ params }: ExercisePageProps) {
    const { data, isLoading } = useQuery({
        queryKey: ["exercise", params.id], //key and params to define the query
        queryFn: () => {
            //function called on querying
            return axios.get(`/api/exercises/exercise?id=${params.id}`).then((res) => res.data);
        },

        retry: false,
        refetchOnWindowFocus: false,
    });

    const router = useRouter();

    return (
        <>
            <Button className='mb-4' onClick={() => router.back()} variant={"secondary"}>
                <ArrowLeft className='scale-75 w-auto' /> Voltar
            </Button>
            {!isLoading ? (
                <>
                    {data?.data?.map((exercise: APIExercise, index: number) => (
                        <ExerciseCard key={exercise.id} exercise={exercise} />
                    ))}
                </>
            ) : (
                <Skeleton className='w-full h-[150px] md:h-[250px] lg:h-[300px] dark:opacity-50' />
            )}
        </>
    );
}
