import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogTrigger,
    DialogContent,
    DialogDescription,
    DialogTitle,
} from "@/components/ui/dialog";
import { Info, MoreVertical, Plus, Shuffle, Trash } from "lucide-react";
import { type Workout, Workout as ZodWorkout, type Exercise } from "@/types/Workout";
import { AnimatePresence, LayoutGroup, PanInfo, motion, useDragControls } from "framer-motion";

import {
    DropdownMenu,
    DropdownMenuTrigger,
    DropdownMenuContent,
    DropdownMenuLabel,
    DropdownMenuItem,
    DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { UseFormSetValue, UseFormWatch } from "react-hook-form";
import * as z from "zod";
import { Dispatch, SetStateAction } from "react";
import { useTheme } from "next-themes";
import { useGetScreenWidth } from "@/lib/hooks/useGetScreenWidth";
import { Input } from "@/components/ui/input";

const ExerciseInfo = ({ exercise }: { exercise: Exercise }) => {
    return (
        <>
            <DialogTitle>{exercise.name}</DialogTitle>
            <DialogDescription className='-mt-2'>
                <span className='flex gap-2 max-w-screen flex-wrap'>
                    {exercise && exercise.muscles
                        ? exercise.muscles.map((muscle, index) => (
                              <Badge key={index} className='rounded-md'>
                                  {muscle}
                              </Badge>
                          ))
                        : null}
                </span>
            </DialogDescription>
            <hr></hr>
            <h3 className='font-semibold'>Execução</h3>
            <p className='text-muted-foreground text-xs'>{exercise.description}</p>
            <span className='w-full relative h-4'>
                <Badge variant={exercise.level[0] as any} className='absolute rounded-md right-0'>
                    {exercise.level[0]}
                </Badge>
            </span>
        </>
    );
};

export default function ExerciseDisplay({
    setExerciseReordererOpen,
    exercise,
    index,
    setterFn,
    watch,
}: {
    setExerciseReordererOpen: Dispatch<SetStateAction<boolean>>;
    exercise: Exercise;
    setterFn: UseFormSetValue<z.infer<typeof ZodWorkout>>;
    index: number;
    watch: UseFormWatch<z.infer<typeof ZodWorkout>>;
}) {
    function deleteExercise(index: number) {
        const previousExercises: Exercise[] = watch("exercises");
        const filteredExercises = previousExercises.filter((_, i) => i !== index);
        setterFn("exercises", filteredExercises);
    }

    function addSet(index: number) {
        const previousExercises: Exercise[] = watch("exercises");
        previousExercises[index].sets?.push({ variant: "Normal", load: 0, reps: 0 });
        //console log previous exercises + the exercise with the new set
        //the set should be like: {variant: "Normal", load: 0, reps: 0}
        setterFn("exercises", previousExercises);
    }

    function deleteSet(info: PanInfo, setIndex: number) {
        const dragDistance = info.offset.x;
        const deleteThreshold = 180;

        if (Math.abs(dragDistance) >= deleteThreshold) {
            // If the drag distance exceeds the threshold, delete the set
            const previousExercises: Exercise[] = watch("exercises");
            const updatedExercises = previousExercises.map((exercise, exerciseIndex) => {
                if (index === exerciseIndex) {
                    // Delete the set at the specified index
                    if (exercise.sets && exercise.sets.length > 1) {
                        const updatedSets = exercise.sets.filter((_, i) => i !== setIndex);
                        return { ...exercise, sets: updatedSets };
                    }
                }
                return exercise;
            });
            setterFn("exercises", updatedExercises);
        }
    }

    function setLoad(value: number, setIndex: number) {
        const previousExercises: Exercise[] = watch("exercises");
        const updatedExercises = previousExercises.map((exercise, exerciseIndex) => {
            if (exerciseIndex === index) {
                const updatedSets = exercise.sets?.map((set, innerSetIndex) => {
                    if (innerSetIndex === setIndex) {
                        return { ...set, load: value };
                    }
                    return set;
                });
                return { ...exercise, sets: updatedSets };
            }
            return exercise;
        });
        setterFn("exercises", updatedExercises);
    }

    function setReps(value: number, setIndex: number) {
        const previousExercises: Exercise[] = watch("exercises");
        const updatedExercises = previousExercises.map((exercise, exerciseIndex) => {
            if (exerciseIndex === index) {
                const updatedSets = exercise.sets?.map((set, innerSetIndex) => {
                    if (innerSetIndex === setIndex) {
                        return { ...set, reps: value };
                    }
                    return set;
                });
                return { ...exercise, sets: updatedSets };
            }
            return exercise;
        });
        setterFn("exercises", updatedExercises);
    }

    const dragControls = useDragControls();

    function startDrag(event: any) {
        dragControls.start(event);
    }

    const { theme } = useTheme();
    return (
        <motion.div
            initial={{ opacity: 0, x: -100, height: 0, marginTop: 0, marginBottom: 0 }}
            animate={{
                opacity: 1,
                x: 0,
                height: "auto",
                marginTop: index == 0 ? "0" : "1.25rem",
                marginBottom: "1.25rem",
            }}
            transition={{ delay: index * 0.075 }}
            exit={{ opacity: 0, scale: 0, height: 0, marginTop: 0, marginBottom: 0 }}
            className='w-full h-auto rounded-md'
        >
            <div id='header' className='w-full h-auto flex justify-between items-center'>
                <div id='exercisename' className='flex items-center'>
                    <div
                        id='exerciseicon'
                        className='w-9 h-9 lg:w-12 lg:h-12 rounded-full bg-accent inline-block'
                    ></div>
                    <div
                        id='exerciseinfo'
                        className='ml-4 text-sm lg:text-base lg:font-medium inline-block'
                    >
                        <h2>{exercise.name}</h2>
                        <Dialog>
                            <DialogTrigger>
                                <Info className='scale-50 text-muted-foreground inline-block -ml-1' />
                                <span className='text-xs text-muted-foreground hover:underline'>
                                    Detalhes
                                </span>
                            </DialogTrigger>
                            <DialogContent>
                                <ExerciseInfo exercise={exercise} />
                            </DialogContent>
                        </Dialog>
                    </div>
                    {/* More info */}
                </div>
                <div id='options' className='flex items-center'>
                    <Badge
                        variant={exercise.level[0] as any}
                        className='mr-4 rounded-md block lg:hidden xl:block'
                    >
                        {exercise.level[0]}
                    </Badge>
                    {/* Options dropdown button */}
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button size={"icon"} variant={"ghost"}>
                                <MoreVertical className='' />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align='end'>
                            <DropdownMenuLabel>Opções</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem
                                className='flex items-center gap-2'
                                onClick={() => setExerciseReordererOpen(true)}
                            >
                                <Shuffle className='scale-75' />
                                Reordenar{" "}
                            </DropdownMenuItem>
                            <DropdownMenuItem
                                onClick={() => deleteExercise(index)}
                                className='flex items-center gap-2 text-destructive'
                            >
                                <Trash className='scale-75' />
                                Deletar{" "}
                            </DropdownMenuItem>
                        </DropdownMenuContent>{" "}
                    </DropdownMenu>{" "}
                </div>
            </div>
            <div id='table' className='w-full mt-4'>
                <div id='head' className='w-full'>
                    <div className='text-left font-semibold text-muted-foreground text-xs uppercase flex'>
                        <div className='p-1 w-1/5'>Série</div>
                        <div className='p-1 w-2/5'>Carga (KG)</div>
                        <div className='p-1 w-2/5'>Repetições</div>
                    </div>
                </div>
                <div id='body' className='transition-all w-full flex flex-col'>
                    <AnimatePresence>
                        {exercise.sets?.map((set, index) => (
                            <div key={index} className='relative'>
                                <motion.div
                                    {...(index !== 0 ? { drag: "x" } : {})}
                                    dragDirectionLock
                                    dragConstraints={{ top: 0, right: 0, bottom: 0, left: 0 }}
                                    whileTap={{ cursor: "grabbing" }}
                                    key={index}
                                    onPointerDown={startDrag}
                                    className={`relative text-sm z-[2] font-bold flex w-full text-left bg-background ${
                                        index % 2 == 0
                                            ? "bg-[hsl(0 0% 100%)] dark:bg-[hsl(0 0% 5.5%)]"
                                            : "bg-[hsl(0 0% 97%)] dark:bg-[hsl(0 0% 4%)]"
                                    }`}
                                    onDragEnd={(event, info) => deleteSet(info, index)}
                                >
                                    <div className='p-3 w-1/5 '>
                                        {set.variant == "Normal" ? index + 1 : set.variant}
                                    </div>
                                    <div className='w-2/5 flex relative items-center'>
                                        <Input
                                            type='number'
                                            value={set.load}
                                            className='bg-transparent border-none w-20 lg:w-auto focus-visible:ring-0 
                                            [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none'
                                            placeholder='0'
                                            onChange={(e) =>
                                                setLoad(e.target.value as unknown as number, index)
                                            }
                                            onKeyDown={(evt) =>
                                                ["e", "E", "+", "-"].includes(evt.key) &&
                                                evt.preventDefault()
                                            }
                                        ></Input>
                                    </div>
                                    <div className='w=2/5 flex justify-between items-center'>
                                        <Input
                                            type='number'
                                            value={set.reps}
                                            className='bg-transparent border-none w-20 lg:w-auto focus-visible:ring-0 
                                            [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none'
                                            placeholder='0'
                                            onChange={(e) =>
                                                setReps(e.target.value as unknown as number, index)
                                            }
                                            onKeyDown={(evt) =>
                                                ["e", "E", "+", "-"].includes(evt.key) &&
                                                evt.preventDefault()
                                            }
                                        ></Input>
                                    </div>
                                </motion.div>
                                <button
                                    draggable={false}
                                    className='absolute flex justify-between px-4 text-destructive-foreground items-center text-sm font-semibold -translate-y-[43px] translate-x-[1px] z-[1] w-[calc(100%-2px)] h-[calc(100%-2px)] bg-destructive'
                                >
                                    <span>Deletar</span>
                                    <span>Deletar</span>
                                </button>
                            </div>
                        ))}
                    </AnimatePresence>
                </div>
            </div>
            <Button
                type='button'
                onClick={() => addSet(index)}
                variant={"secondary"}
                className='w-full'
            >
                <Plus className='scale-75' />
                Adicionar série
            </Button>
        </motion.div>
    );
}
