"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { DBWorkout, Workout } from "@/types/Workout";
import * as z from "zod";
import WorkoutCard from "@/components/Dashboard/Workouts/WorkoutCard";
import { motion } from "framer-motion";
import { Skeleton } from "@/components/ui/skeleton";
import { Tumbleweed } from "@/public/svg/Tumbleweed";

export default function Workouts() {
    const { data, isLoading } = useQuery({
        queryKey: ["workouts"], //key and params to define the query
        queryFn: () => {
            //function called on querying
            return axios.get(`/api/workouts`).then((res) => res.data);
        },
        retry: false,
        refetchOnWindowFocus: false,
    });

    return (
        <>
            <div id='title' className='flex w-full gap-4 justify-between'>
                <h1 className='text-4xl font-semibold'>Treinos</h1>
                <Link href='/dashboard/workouts/new'>
                    <Button>Novo treino</Button>
                </Link>
            </div>
            <h2 className='text-xl font-semibold mt-4'>Seus treinos</h2>
            <p className='text-sm text-muted-foreground'>
                Veja aqui os treinos criados por você ou por sua academia.
            </p>
            <div className='grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-2 md:gap-4 mt-4 mb-20 lg:mb-0'>
                {!isLoading ? (
                    <>
                        {data.data.length == 0 ? (
                            <div className='col-span-3 row-span-3 w-full aspect-video mt-6 bg-card rounded-lg border-dashed border-[2px] flex items-center justify-center flex-col space-y-4 p-6'>
                                <Tumbleweed className='w-24 h-24 fill-neutral-500' />
                                <h3 className='font-semibold text-muted-foreground text-2xl tracking-tight'>
                                    Não há nada aqui.
                                </h3>
                                <p className='max-w-sm text-sm text-muted-foreground text-center '>
                                    Comece sua jornada fitness criando um treino e adicionando
                                    alguns exercícios.
                                </p>
                                <Link href='/dashboard/workouts/new'>
                                    <Button variant={"secondary"}>Novo treino</Button>
                                </Link>
                            </div>
                        ) : (
                            <>
                                {data?.data?.map((workout: DBWorkout, index: number) => (
                                    <motion.div
                                        key={index}
                                        initial={
                                            index < 35
                                                ? { opacity: 0, scale: 0.8 }
                                                : { opacity: 1, scale: 1 }
                                        }
                                        animate={{ opacity: 1, scale: 1 }}
                                        transition={{ delay: index * 0.075 }}
                                    >
                                        <WorkoutCard workout={workout} />
                                    </motion.div>
                                ))}
                            </>
                        )}
                    </>
                ) : (
                    <>
                        {Array.from({ length: 9 }).map((_, index) => (
                            <Skeleton key={index} className='w-full h-[30rem]' />
                        ))}
                    </>
                )}
            </div>
        </>
    );
}
