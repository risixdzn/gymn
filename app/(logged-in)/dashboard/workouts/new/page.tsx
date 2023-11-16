"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
    Form,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Drawer, DrawerContent, DrawerTrigger } from "@/components/ui/DrawerOrVaul";
import { useGetScreenWidth } from "@/lib/hooks/useGetScreenWidth";
import { Dumbbell, Grip, Plus } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import ExerciseDisplay from "@/components/Dashboard/Workouts/Exercise";
import ExerciseSelector from "@/components/Dashboard/Workouts/ExerciseSelector";
import { Workout } from "@/types/Workout";
import { useEffect, useState } from "react";
import { AnimatePresence, Reorder } from "framer-motion";
import { Dialog, DialogContent, DialogDescription, DialogTitle } from "@/components/ui/dialog";
import { useToast } from "@/components/ui/use-toast";
import { muscles } from "@/lib/filters";
import axios from "axios";

const ExerciseNumbersData = ({
    exerciseNumbersData,
    className,
}: {
    exerciseNumbersData: {
        totalExercises: number;
        totalSets: number;
        totalReps: number;
        totalVolume: number;
    };
    className?: string;
}) => {
    return (
        <div id='exerciseNumbersData' className={className}>
            <h3 className='text-sm font-semibold mb-1'>Totais do treino</h3>
            <span className='flex gap-4'>
                <div>
                    <h4 className='text-xs text-muted-foreground'>Exercícios</h4>
                    <p className='text-sm'>{exerciseNumbersData.totalExercises}</p>
                </div>
                <div>
                    <h4 className='text-xs text-muted-foreground'>Séries</h4>
                    <p className='text-sm'>{exerciseNumbersData.totalSets}</p>
                </div>
                <div>
                    <h4 className='text-xs text-muted-foreground'>Reps</h4>
                    <p className='text-sm'>{exerciseNumbersData.totalReps}</p>
                </div>
                <div>
                    <h4 className='text-xs text-muted-foreground'>Volume</h4>
                    <p className='text-sm'>
                        {exerciseNumbersData.totalVolume}
                        <span className='text-xs ml-1 text-muted-foreground'>kg</span>
                    </p>
                </div>
            </span>
        </div>
    );
};

export default function NewWorkout() {
    const form = useForm<z.infer<typeof Workout>>({
        resolver: zodResolver(Workout),
        defaultValues: {
            title: "",
            muscle_group: [],
            exercises: [
                // {
                //     name: "test",
                //     muscles: ["test"],
                //     sets: [{ variant: "Aquecimento", load: 0, reps: 0 }],
                // },
            ],
            description: "",
        },
        mode: "all",
    });

    const { toast } = useToast();

    async function onSubmit(values: z.infer<typeof Workout>) {
        if (!values.exercises || values.exercises.length === 0) {
            toast({
                variant: "destructive",
                title: "O treino deve ter pelo menos um exercício",
                description: "Adicione um exercício e tente novamente.",
            });
            return;
        }

        // Validate each exercise
        for (const exercise of values.exercises) {
            // Validate if there is at least one set in each exercise
            if (!exercise.sets || exercise.sets.length === 0) {
                toast({
                    variant: "destructive",
                    title: "Todo exercício deve ter ao menos uma série",
                    description: "Adicione uma série e tente novamente.",
                });
                return;
            }
        }

        // Validate the title
        if (!values.title || values.title.trim() === "") {
            toast({
                variant: "destructive",
                title: "O treino deve ter um título",
                description: "Dê um nome ao treino e tente novamente.",
            });
            return;
        }

        // If all validations pass, you can proceed with the submission

        var muscleGroup: typeof muscles = [];
        for (const exercise of values.exercises) {
            if (exercise.muscles) {
                for (const muscle of exercise.muscles) {
                    if (!muscleGroup.includes(muscle)) {
                        muscleGroup.push(muscle);
                    }
                }
            }
        }

        //convert all the set reps and load to numbers (they can be strings if altered on the input)

        const updatedExercises = values.exercises.map((exercise) => {
            const updatedSets = exercise.sets?.map((set) => ({
                ...set,
                reps: parseInt(set.reps as unknown as string, 10),
                load: parseFloat(set.load as unknown as string),
            }));
            return {
                ...exercise,
                sets: updatedSets,
            };
        });

        const finalWorkout = {
            ...values,
            muscle_group: muscleGroup,
            exercises: updatedExercises,
        };

        const { data } = await axios.post("/api/workouts", finalWorkout);
        if (data.success === true) {
            console.log(data);
            toast({
                variant: "success",
                title: `Treino ${values.title} criado com sucesso!`,
            });
        } else {
            console.log(data);
            toast({
                variant: "destructive",
                title: "Ocorreu um erro ao criar o treino",
                description: "Aguarde e tente novamente",
            });
        }
    }

    const { watch, setValue } = form;
    const formValues = watch();
    const { screenWidth } = useGetScreenWidth();
    const [exerciseSelectorOpen, setExerciseSelectorOpen] = useState(false);
    const [exerciseReordererOpen, setExerciseReordererOpen] = useState(false);

    const exercises = watch("exercises");

    const exerciseNumbersData = exercises.reduce(
        (acc, exercise) => {
            // Iterate through sets for each exercise
            if (exercise.sets && exercise.sets.length > 0) {
                exercise.sets.forEach((set) => {
                    // Increment totalSets by 1
                    acc.totalSets += 1;
                    // Increment totalReps by the reps in this set
                    acc.totalReps +=
                        !isNaN(set.reps) && (set.reps as unknown as string) !== ""
                            ? parseInt(set.reps as unknown as string, 10)
                            : 0;
                    // Increment totalVolume by the load in this set
                    acc.totalVolume += !isNaN(set.load)
                        ? parseInt((set.load * set.reps) as unknown as string, 10)
                        : 0;
                });
            }
            // Increment totalExercises for each exercise in the workout
            acc.totalExercises += 1;

            return acc;
        },
        {
            totalExercises: 0,
            totalSets: 0,
            totalReps: 0,
            totalVolume: 0,
        }
    );

    useEffect(() => {
        console.log("exercises=> ", exercises);
    }, [exercises]);

    return (
        <>
            <Form {...form}>
                {/* Form de edição do treino */}
                <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className='mt-20 lg:mt-0 w-full grid lg:grid-cols-[20rem_minmax(0,_1fr)] xl:grid-cols-[25rem_minmax(0,_1fr)] gap-2'
                >
                    <div className='lg:hidden w-full h-20 z-20 fixed -translate-x-5 px-5 -translate-y-[5.75rem] flex items-center justify-between bg-background'>
                        {/* Dados numericos do treino (séries, volume, reps...) */}
                        <ExerciseNumbersData exerciseNumbersData={exerciseNumbersData} />
                        {/* Botão de salvar */}
                        <Button type='submit' onClick={() => onSubmit(formValues)}>
                            Salvar
                        </Button>
                    </div>
                    {/* Edição das informações textuais (titulo, desc...) */}
                    <div id='infoediting' className='border-border lg:border-r-[1px] lg:pr-8'>
                        <h2 className='text-lg lg:text-xl font-semibold'>Criar treino</h2>
                        {/* Editar titulo */}
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
                        {/* Editar descrição */}
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
                        <Button
                            className='w-full mt-4 hidden lg:block'
                            onClick={() => onSubmit(formValues)}
                            type='submit'
                        >
                            Salvar Treino
                        </Button>
                        <ExerciseNumbersData
                            exerciseNumbersData={exerciseNumbersData}
                            className='lg:block hidden mt-4'
                        />
                    </div>
                    {/* Display exercicios selecionados */}
                    <div className='w-full overflow-x-hidden lg:pl-8 flex items-center flex-col relative'>
                        <FormField
                            control={form.control}
                            name='exercises'
                            render={({ field }) => (
                                <FormItem className='w-full'>
                                    {/* Se houver exercicios */}
                                    {exercises?.length ? (
                                        <>
                                            {/* Titulo da lista*/}
                                            <span
                                                id='exerciselisttitle'
                                                className='lg:hidden w-full mt-4'
                                            >
                                                <hr></hr>
                                                <h2 className='my-4 text-xl text-left font-semibold'>
                                                    Exercícios
                                                </h2>
                                            </span>
                                            {/* Container display dos exercicios */}
                                            <div
                                                id='exercisescontainer'
                                                className='h-auto lg:max-h-[calc(100vh-7rem)] w-full overflow-y-auto overflow-x-hidden
                                                 flex flex-col pb-24 lg:pb-0
                                                 scrollbar-thin pr-2 scrollbar-thumb-accent scrollbar-track-background scrollbar-rounded-full '
                                            >
                                                <AnimatePresence>
                                                    {exercises.map((exercise, index) => (
                                                        <ExerciseDisplay
                                                            setExerciseReordererOpen={
                                                                setExerciseReordererOpen
                                                            }
                                                            setterFn={setValue}
                                                            watch={watch}
                                                            index={index}
                                                            exercise={exercise}
                                                            key={exercise.id}
                                                        />
                                                    ))}
                                                </AnimatePresence>
                                                <Drawer
                                                    screenWidth={screenWidth}
                                                    open={exerciseSelectorOpen}
                                                    onOpenChange={setExerciseSelectorOpen}
                                                >
                                                    <DrawerTrigger
                                                        screenWidth={screenWidth}
                                                        asChild
                                                    >
                                                        <Button
                                                            type='button'
                                                            className='flex items-center gap-2 w-full'
                                                        >
                                                            <Plus className='scale-75' />
                                                            Adicionar exercício
                                                        </Button>
                                                    </DrawerTrigger>
                                                    <DrawerContent
                                                        asChild
                                                        desktopClassname='sm:w-[calc(100%-20rem)] max-w-full'
                                                        screenWidth={screenWidth}
                                                        className=''
                                                    >
                                                        <ExerciseSelector
                                                            setExerciseSelectorOpen={
                                                                setExerciseSelectorOpen
                                                            }
                                                            watch={watch}
                                                            screenWidth={screenWidth}
                                                            setterFn={setValue}
                                                        />
                                                    </DrawerContent>
                                                </Drawer>
                                            </div>
                                            {/* Reorganizador dos exercicios. */}
                                            <Dialog
                                                open={exerciseReordererOpen}
                                                onOpenChange={setExerciseReordererOpen}
                                            >
                                                <DialogContent>
                                                    <DialogTitle>Reordenar exercícios</DialogTitle>
                                                    <DialogDescription>
                                                        Arraste os exercícios para alterar as ordens
                                                    </DialogDescription>
                                                    <Reorder.Group
                                                        className='w-full flex flex-col gap-2 max-h-96 overflow-y-auto overflow-x-hidden scrollbar-thin pr-2 scrollbar-thumb-accent scrollbar-track-background'
                                                        axis='y'
                                                        values={exercises}
                                                        layoutScroll
                                                        onReorder={(exercise) =>
                                                            setValue("exercises", exercise)
                                                        }
                                                    >
                                                        {exercises.map((exercise, index) => (
                                                            <Reorder.Item
                                                                className='w-full py-2 bg-card px-4 rounded-md text-sm flex justify-between items-center'
                                                                key={exercise.id}
                                                                value={exercise}
                                                            >
                                                                {exercise.name}
                                                                <Grip className='text-muted-foreground' />
                                                            </Reorder.Item>
                                                        ))}
                                                    </Reorder.Group>
                                                </DialogContent>
                                            </Dialog>
                                        </>
                                    ) : (
                                        // /* Se não houver exercicios , mostrar o selecionador*/
                                        <div
                                            className='text-center mt-6 lg:mt-0 
                                        w-full lg:h-[calc(100vh-7rem)] 
                                        flex items-center justify-center flex-col gap-4 
                                        text-sm text-muted-foreground'
                                        >
                                            <Dumbbell className='text-g_purple' />
                                            <span className='text-foreground -mb-2 font-semibold'>
                                                Sem exercícios
                                            </span>
                                            Comece adicionando um exercício ao seu treino
                                            <Drawer
                                                screenWidth={screenWidth}
                                                open={exerciseSelectorOpen}
                                                onOpenChange={setExerciseSelectorOpen}
                                            >
                                                <DrawerTrigger screenWidth={screenWidth}>
                                                    <Button
                                                        type='button'
                                                        className='flex items-center gap-2'
                                                    >
                                                        Adicionar exercício
                                                        <Plus className='scale-75' />
                                                    </Button>
                                                </DrawerTrigger>
                                                <DrawerContent
                                                    desktopClassname='sm:w-[calc(100%-20rem)] max-w-full'
                                                    screenWidth={screenWidth}
                                                    className=''
                                                >
                                                    <ExerciseSelector
                                                        setExerciseSelectorOpen={
                                                            setExerciseSelectorOpen
                                                        }
                                                        watch={watch}
                                                        screenWidth={screenWidth}
                                                        setterFn={setValue}
                                                    />
                                                </DrawerContent>
                                            </Drawer>
                                        </div>
                                    )}
                                </FormItem>
                            )}
                        />
                    </div>
                </form>
            </Form>
        </>
    );
}
