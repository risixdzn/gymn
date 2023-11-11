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
import { type Workout, type Exercise } from "@/types/Workout";
import { AnimatePresence, motion } from "framer-motion";

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
    exercise,
    index,
    setterFn,
    watch,
}: {
    exercise: Exercise;
    setterFn: UseFormSetValue<z.infer<typeof Workout>>;
    index: number;
    watch: UseFormWatch<z.infer<typeof Workout>>;
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
                            <DropdownMenuItem className='flex items-center gap-2'>
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
            <table className='w-full mt-4'>
                <thead>
                    <tr className='text-left text-muted-foreground text-xs uppercase'>
                        <th className='p-1 '>Série</th>
                        <th className='p-1'>Carga</th>
                        <th className='p-1'>Repetições</th>
                    </tr>
                </thead>
                <tbody className='transition-all w-full'>
                    {exercise.sets?.map((set, index) => (
                        <motion.tr
                            key={index}
                            initial={{ opacity: 0, scaleY: 0, height: 0, transformOrigin: "top" }}
                            animate={{
                                opacity: 1,
                                scaleY: 1,
                                height: "auto",
                                transformOrigin: "top",
                            }}
                            transition={{ ease: "easeInOut" }}
                            className='text-sm w-full text-left odd:bg-transparent dark:even:bg-accent/20 even:bg-accent/60'
                        >
                            <th className='p-3 '>
                                {set.variant == "Normal" ? index + 1 : set.variant}
                            </th>
                            <th className='p-3'>{set.load}</th>
                            <th className='p-3'>{set.reps}</th>{" "}
                        </motion.tr>
                    ))}
                </tbody>
            </table>
            <Button onClick={() => addSet(index)} variant={"secondary"} className='w-full'>
                <Plus className='scale-75' />
                Adicionar série
            </Button>
        </motion.div>
    );
}
