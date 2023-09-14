"use client";

import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { Exercise } from "../page";
import ExerciseCard from "@/components/Dashboard/Exercises/ExerciseCard";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";

type ExercisePageProps = {
    params: {
        id: string;
    };
};

export default function ExercisePage({ params }: ExercisePageProps) {
    const { data } = useQuery({
        queryKey: ["exercise", params.id], //key and params to define the query
        queryFn: () => {
            //function called on querying
            return axios.get(`/api/exercises/exercise?id=${params.id}`).then((res) => res.data);
        },
    });

    const router = useRouter();

    return (
        <>
            <Button className='mb-4' onClick={() => router.back()}>
                <ArrowLeft className='scale-75 w-auto' /> Voltar
            </Button>
            {data?.data.map((exercise: Exercise, index: number) => (
                <ExerciseCard key={exercise.id} exercise={exercise} />
            ))}
        </>
    );
}
