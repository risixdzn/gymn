"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { Workout } from "@/types/Workout";
import * as z from "zod";

export default function Workouts() {
    const { data, isLoading } = useQuery({
        queryKey: ["workouts"], //key and params to define the query
        queryFn: () => {
            //function called on querying
            return axios.get(`/api/workouts`).then((res) => res.data);
        },
    });

    return (
        <>
            <Link href='/dashboard/workouts/new'>
                <Button>Novo treino</Button>
            </Link>
            <h2 className='text-xl font-semibold'>Seus treinos</h2>
            <p className='text-sm text-muted-foreground'>
                Veja aqui os treinos criados por você ou por sua academia.
            </p>
            <div className='grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-2 md:gap-4 mt-4 mb-20 lg:mb-0'>
                {data?.data.map((workout: z.infer<typeof Workout>, index: number) => (
                    <div>{workout.title}</div>
                ))}
            </div>
        </>
    );
}
