"use client";

import { UseFormSetValue, UseFormWatch, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
    Drawer,
    DrawerContent,
    DrawerDescription,
    DrawerTitle,
    DrawerTrigger,
} from "@/components/ui/DrawerOrVaul";
import { useGetScreenWidth } from "@/lib/hooks/useGetScreenWidth";
import { ChevronDown, Dumbbell, Plus } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import ExerciseDisplay from "@/components/Dashboard/Workouts/Exercise";

const set = z.object({
    variant: z.enum(["Aquecimento", "Normal", "Falha"]),
    load: z.number(),
    reps: z.number(),
});

const Exercise = z.object({
    name: z.string(),
    muscles: z.array(z.string()),
    sets: z.array(set),
});

const Workout = z.object({
    title: z.string().max(50, "O nome deve ser menor.").optional(),
    muscle_group: z.array(z.string()),
    description: z.string().max(400, "A descrição deve ser menor.").optional(),
    exercises: z.array(Exercise),
});

export default function NewWorkout() {
    const form = useForm<z.infer<typeof Workout>>({
        resolver: zodResolver(Workout),
        defaultValues: {
            title: "",
            muscle_group: [],
            exercises: [
                {
                    name: "test",
                    muscles: ["test"],
                    sets: [{ variant: "Aquecimento", load: 0, reps: 0 }],
                },
            ],
            description: "",
        },
        mode: "all",
    });

    function onSubmit(values: z.infer<typeof Workout>) {
        console.log(values);
    }

    const { watch, setValue } = form;
    const formValues = watch();
    const { screenWidth } = useGetScreenWidth();

    return (
        <>
            <Form {...form}>
                <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className='w-full grid lg:grid-cols-[20rem_minmax(0,_1fr)] xl:grid-cols-[25rem_minmax(0,_1fr)] gap-2'
                >
                    <div id='infoediting' className='border-border lg:border-r-[1px] lg:pr-8'>
                        <h2 className='text-lg lg:text-xl font-semibold'>Criar treino</h2>
                        {/* Workout title */}
                        <FormField
                            control={form.control}
                            name='title'
                            render={({ field }) => (
                                <FormItem className='mt-2'>
                                    <span className='flex gap-2 items-center'>
                                        <Input
                                            {...field}
                                            className='text-2xl lg:text-3xl py-0 focus:none focus-visible:ring-0 rounded-none font-semibold border-none px-0 outline-none bg-none'
                                            placeholder={"Título do treino"}
                                        ></Input>
                                    </span>
                                    <hr></hr>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        {/* Muscle group selector */}
                        <FormField
                            control={form.control}
                            name='muscle_group'
                            render={({ field }) => (
                                <FormItem className='mt-4'>
                                    <FormLabel>Músculos</FormLabel>
                                    <FormDescription className='-mt-2'>
                                        Selecione os musculos alvo do exercício
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        {/* Workout description */}
                        <FormField
                            control={form.control}
                            name='description'
                            render={({ field }) => (
                                <FormItem className='mt-4'>
                                    <FormLabel>Descrição</FormLabel>
                                    <Textarea placeholder='Descrição do treino...' {...field} />
                                    <FormDescription>
                                        Descrição, breve ou detalhada, sobre este treino.
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <pre className='bg-card overflow-hidden hidden lg:block'>
                            {JSON.stringify(formValues, null, 4)}
                        </pre>{" "}
                    </div>
                    <div className='w-full overflow-x-hidden lg:pl-8 flex items-center flex-col'>
                        <FormField
                            control={form.control}
                            name='exercises'
                            render={({ field }) => (
                                <FormItem className='w-full'>
                                    {watch("exercises")?.length ? (
                                        <>
                                            <span className='lg:hidden w-full mt-4'>
                                                <hr></hr>
                                                <h2 className='my-4 text-xl text-left font-semibold'>
                                                    Exercícios
                                                </h2>
                                            </span>

                                            <div
                                                id='exercisescontainer'
                                                className='h-auto lg:max-h-[calc(100vh-7rem)] w-full overflow-y-auto flex flex-col gap-10 scrollbar-thin pr-2 scrollbar-thumb-accent scrollbar-track-background scrollbar-rounded-full'
                                            >
                                                <ExerciseDisplay />
                                                <ExerciseDisplay />
                                                <ExerciseDisplay />
                                                <ExerciseDisplay />
                                                <ExerciseDisplay />
                                            </div>
                                        </>
                                    ) : (
                                        <div className='text-center w-full lg:h-[calc(100vh-7rem)] flex items-center justify-center flex-col gap-4 text-sm text-muted-foreground'>
                                            <Dumbbell className='text-g_purple' />
                                            <span className='text-foreground -mb-2 font-semibold'>
                                                Sem exercícios
                                            </span>
                                            Comece adicionando um exercício ao seu treino
                                            <Button
                                                type='button'
                                                className='flex items-center gap-2'
                                            >
                                                Adicionar exercício
                                                <Plus className='scale-75' />
                                            </Button>
                                        </div>
                                    )}
                                </FormItem>
                            )}
                        />
                    </div>
                </form>
            </Form>

            {/* <Button className='mt-10' onClick={() => setValue("muscle_group", ["Test"])}>
                Add muscle
            </Button> */}
        </>
    );
}