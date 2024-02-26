import {
    Drawer,
    DrawerContent,
    DrawerDescription,
    DrawerTitle,
    DrawerTrigger,
} from "@/components/ui/DrawerOrVaul";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Dumbbell, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Dispatch, ReactNode, SetStateAction, useEffect, useState } from "react";
import { useGetScreenWidth } from "@/lib/hooks/useGetScreenWidth";
import { equipments, levels, muscles as musclesfilters } from "@/lib/filters";
import { Button } from "@/components/ui/button";
import { type Exercise } from "@/types/Workout";
import { Skeleton } from "@/components/ui/skeleton";
import ExerciseCard, { APIExercise } from "../Exercises/ExerciseCard";
import { Checkbox } from "@/components/ui/checkbox";
import { UseFormSetValue, UseFormWatch } from "react-hook-form";
import { Workout } from "@/types/Workout";
import * as z from "zod";

const Filter = ({
    trigger,
    setterFn,
    state,
    options,
    title,
    description,
}: {
    trigger: ReactNode;
    setterFn: Dispatch<SetStateAction<string | null>>;
    state: string | null;
    options: string[];
    title: string;
    description: string;
}) => {
    const [open, setOpen] = useState(false);
    const { screenWidth } = useGetScreenWidth();
    const handleOptionClick = (selectedOption: string, isChecked: boolean | string) => {
        if (isChecked) {
            if (state === selectedOption) {
                setterFn(null); // Uncheck the option by setting the state to null
            } else {
                setterFn(selectedOption); // Set the selected option in the state
            }
            setOpen(false);
        }
    };

    return (
        <Drawer screenWidth={screenWidth} open={open} onOpenChange={setOpen}>
            <DrawerTrigger asChild screenWidth={screenWidth}>
                {trigger}
            </DrawerTrigger>
            <div className='sticky top-0 bg-background'>
                <DrawerContent screenWidth={screenWidth} scrollable>
                    <div className='pt-12 z-[2] -translate-y-12 sticky top-0 bg-background pb-4'>
                        <DrawerTitle screenWidth={screenWidth}>{title}</DrawerTitle>
                        <DrawerDescription screenWidth={screenWidth}>
                            {description}
                        </DrawerDescription>
                    </div>
                    <div className='-mt-10'>
                        {options.map((option, index) => (
                            <div
                                key={index}
                                className={
                                    "py-4 border-b-[1px] border-border w-full px-4 flex items-center gap-4 hover:bg-accent/50 shadow-md justify-between"
                                }
                                onClick={() => {
                                    handleOptionClick(option, setterFn !== null);
                                }}
                            >
                                <label className='font-normal flex items-center gap-4'>
                                    <div className='w-12 h-12 bg-accent rounded-full flex items-center justify-center shadow-md '></div>
                                    {option}
                                </label>
                                <div>
                                    <Checkbox
                                        checked={state == option}
                                        className='scale-125'
                                        onCheckedChange={(checked) => {
                                            handleOptionClick(option, checked); // Call the handleOptionClick function with the selected option and whether it's checked
                                        }}
                                    />
                                </div>
                            </div>
                        ))}
                    </div>
                </DrawerContent>
            </div>
        </Drawer>
    );
};

export default function ExerciseSelector({
    screenWidth,
    setterFn,
    watch,
    setExerciseSelectorOpen,
}: {
    screenWidth: number;
    setterFn: UseFormSetValue<z.infer<typeof Workout>>;
    watch: UseFormWatch<z.infer<typeof Workout>>;
    setExerciseSelectorOpen: Dispatch<SetStateAction<boolean>>;
}) {
    const [muscles, setMuscles] = useState<string | null>(null);
    const [equipment, setEquipment] = useState<string | null>(null);
    const [level, setLevel] = useState<string | null>(null);
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedExercises, setSelectedExercises] = useState<Exercise[] | null>([]);

    const filteredFilters = Object.entries({
        muscles,
        equipment,
        level,
    }).reduce((acc, [key, value]) => {
        if (value !== null) {
            acc[key] = value;
        }
        return acc;
    }, {} as { [key: string]: string });

    const queryString = new URLSearchParams(filteredFilters);

    const { data, isLoading } = useQuery({
        queryKey: ["exercises", muscles, equipment, level], //key and params to define the query
        queryFn: () => {
            //function called on querying
            return axios
                .get(`/api/exercises?${queryString && queryString}`)
                .then((res) => res.data);
        },
    });

    const skeletons = new Array(15).fill(null);

    const handleSelectExercise = (exercise: Exercise) => {
        if (selectedExercises?.includes(exercise)) {
            // If the exercise is already selected, remove it from the array
            setSelectedExercises(
                selectedExercises.filter((selectedExercise) => selectedExercise !== exercise)
            );
        } else {
            // If it's not selected, add it to the array, without removing the previous ones
            setSelectedExercises([...(selectedExercises || []), exercise]);
        }
        console.log(selectedExercises);
    };

    const onSubmit = () => {
        const workoutExercises =
            selectedExercises?.map((exercise) => ({
                ...exercise,
                muscles: exercise.muscles,
                sets: exercise.sets || [
                    {
                        variant: "Normal",
                        load: 0,
                        reps: 0,
                    },
                ],
            })) || [];

        console.log(selectedExercises);

        const previousExercises: Exercise[] = watch("exercises");
        // Merge the previous exercises with the new ones
        const mergedExercises: Exercise[] = [...previousExercises, ...workoutExercises];

        setterFn("exercises", mergedExercises);
        setExerciseSelectorOpen(false);
    };

    // results div scroll position
    const [scrollPosition, setScrollPosition] = useState(0);

    useEffect(() => {
        console.log("data => ", data);
    }, [data]);

    return (
        <>
            {/* Add selected button */}
            <div className='bg-background absolute bottom-0 w-[calc(100%-4rem)] max-w-[calc(28rem-4rem)] z-10 '>
                <Button
                    disabled={selectedExercises?.length == 0}
                    onClick={() => onSubmit()}
                    className='w-full lg:w-80 mb-6 disabled:opacity-100 disabled:bg-primary/50'
                >
                    Adicionar
                    <Dumbbell className='ml-2 scale-75' />
                </Button>
            </div>
            <DrawerTitle screenWidth={screenWidth}>Exercícios</DrawerTitle>
            <DrawerDescription screenWidth={screenWidth}>
                Clique nos exercícios para selecioná-los, e em seguida, pressione
                &quot;Adicionar&quot;.
            </DrawerDescription>
            <div
                id='options'
                className='flex flex-row lg:gap-1 xl:gap-4 items-center flex-wrap mt-4 xl:mt-4'
            >
                <div id='search' className='relative w-full lg:w-full xl:w-auto'>
                    <Search className='absolute top-0 bottom-0 w-6 h-6 my-auto left-3 scale-75' />
                    <Input
                        type='text'
                        placeholder='Procurar exercício'
                        className='pl-12 pr-4 xl:w-auto w-full'
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
                <div
                    id='filters'
                    className='flex lg:flex-row flex-col w-full lg:w-auto gap-x-2 gap-y-1 mt-2 items-center lg:mt-0 flex-wrap'
                >
                    <Filter
                        title='Músculo'
                        description='Selecione o músculo para filtrar os resultados.'
                        setterFn={setMuscles}
                        options={musclesfilters}
                        state={muscles}
                        trigger={
                            <Button
                                className='lg:w-auto w-full text-xs h-6 lg:h-10 lg:text-sm'
                                variant={muscles ? "default" : "secondary"}
                            >
                                {muscles ? muscles : "Selecionar músculo"}
                            </Button>
                        }
                    />
                    <Filter
                        title='Equipamento'
                        description='Selecione o equipamento para filtrar os resultados.'
                        setterFn={setEquipment}
                        options={equipments}
                        state={equipment}
                        trigger={
                            <Button
                                className='lg:w-auto w-full text-xs h-6 lg:h-10 lg:text-sm'
                                variant={equipment ? "default" : "secondary"}
                            >
                                {equipment ? equipment : "Selecionar equipamento"}
                            </Button>
                        }
                    />
                    <Filter
                        title='Dificuldade'
                        description='Selecione a dificuldade para filtrar os resultados.'
                        setterFn={setLevel}
                        options={levels}
                        state={level}
                        trigger={
                            <Button
                                className='lg:w-auto w-full text-xs h-6 lg:h-10 lg:text-sm'
                                variant={level ? "default" : "secondary"}
                            >
                                {level ? level : "Selecionar dificuldade"}
                            </Button>
                        }
                    />
                </div>
                <div
                    id='results'
                    className='mt-4 lg:mt-0 w-full grid grid-cols-1 xl:grid-cols-3 2xl:grid-cols-4 gap-2 md:gap-4 max-h-[calc(100vh-14rem)] rounded-lg overflow-y-auto overflow-x-hidden scrollbar-thin pr-2 scrollbar-thumb-accent scrollbar-track-accent/50 scrollbar-rounded-full'
                >
                    {!isLoading ? (
                        <>
                            {data?.data
                                ?.filter(
                                    (exercise: Exercise) =>
                                        exercise.name
                                            .toLowerCase()
                                            .includes(searchTerm.toLowerCase()) ||
                                        exercise.muscles
                                            ?.toString()
                                            .toLowerCase()
                                            .includes(searchTerm.toLowerCase()) ||
                                        exercise.equipment
                                            .toString()
                                            .toLowerCase()
                                            .includes(searchTerm.toLowerCase())
                                )
                                .map((exercise: APIExercise, index: number) => (
                                    <div key={exercise.id} className='relative'>
                                        <Checkbox
                                            checked={selectedExercises?.includes(exercise)}
                                            onCheckedChange={() => handleSelectExercise(exercise)}
                                            className='scale-150 absolute right-5 top-12 lg:top-10 z-[5]'
                                        />
                                        <div onClick={() => handleSelectExercise(exercise)}>
                                            <ExerciseCard
                                                className={
                                                    selectedExercises?.includes(exercise)
                                                        ? "dark:bg-accent/60 bg-accent"
                                                        : ""
                                                }
                                                key={exercise.id}
                                                exercise={exercise}
                                            />
                                        </div>
                                    </div>
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
        </>
    );
}
