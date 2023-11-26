import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuTrigger,
    DropdownMenuLabel,
    DropdownMenuItem,
    DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import GlowingCard from "@/components/ui/glowingCard";
import { cn } from "@/lib/utils";
import { DBWorkout } from "@/types/Workout";
import { Dumbbell, Edit, Menu, MoreVertical, Trash } from "lucide-react";
import { ReactNode } from "react";

export default function WorkoutCard({
    workout,
    className,
}: {
    workout: DBWorkout;
    className?: string;
}) {
    type DifficultiesMap = {
        [key: string]: string;
    };
    const difficultyColor = ({ level }: { level: string }) => {
        const difficulties: DifficultiesMap = {
            Iniciante: "#22c55e",
            Intermediário: "#f59e0b",
            Avançado: "#ef4444",
        };
        return difficulties[level] || "#8a2be2";
    };

    return (
        <GlowingCard
            className={cn(
                "dark:hover:bg-card group w-full h-auto bg-card space-y-1 relative",
                className
            )}
        >
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button
                        size={"icon"}
                        className='absolute right-0 mr-4 bg-card'
                        variant={"outline"}
                    >
                        <MoreVertical className='' />
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align='end'>
                    <DropdownMenuLabel>Opções</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem className='flex items-center gap-2'>
                        <Edit className='scale-75' />
                        Reordenar{" "}
                    </DropdownMenuItem>
                    <DropdownMenuItem className='flex items-center gap-2 text-destructive'>
                        <Trash className='scale-75' />
                        Deletar{" "}
                    </DropdownMenuItem>
                </DropdownMenuContent>{" "}
            </DropdownMenu>{" "}
            <h2 className='font-semibold text-lg max-w-[270px] -translate-y-1 overflow-clip'>
                {workout.workout.title}
            </h2>
            <span className='flex gap-2 w-full flex-wrap  -translate-y-1'>
                {workout.workout.muscle_group.map((muscle) => (
                    <Badge key={muscle} className='rounded-md'>
                        {muscle}
                    </Badge>
                ))}
            </span>
            <section className='max-h-[11rem] overflow-clip relative'>
                <h3 className='font-semibold'>Exercícios:</h3>
                <div className=' mb-1 min-h-[2.5rem] flex items-center'>
                    <span className='text-sm line-clamp-2 text-muted-foreground'>
                        {workout.workout.exercises.map((exercise, index) => (
                            <a className='' key={index}>
                                {`${exercise.name}${
                                    index !== workout.workout.exercises.length - 1 ? ", " : ""
                                }`}
                            </a>
                        ))}
                    </span>
                </div>
            </section>
            <Button className='w-full'>
                Iniciar treino
                <Dumbbell className='scale-75 ml-2' />
            </Button>
        </GlowingCard>
    );
}
