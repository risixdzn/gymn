import { Exercise } from "@/app/(logged-in)/dashboard/exercises/page";
import { Badge } from "@/components/ui/badge";
import GlowingCard from "@/components/ui/glowingCard";
import { useGetScreenWidth } from "@/lib/hooks/useGetScreenWidth";
import { ArrowRight } from "lucide-react";

export default function ExerciseCard({ exercise }: { exercise: Exercise }) {
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

    const { screenWidth } = useGetScreenWidth();

    return (
        <GlowingCard className='relative w-full h-[150px] md:h-[250px] lg:h-[300px] group'>
            <div
                id='difficulty_indicator'
                className={`hidden md:block w-full h-2 rounded-full`}
                style={{ backgroundColor: difficultyColor({ level: exercise.level }) }}
            ></div>
            <Badge
                variant={exercise.level}
                className='rounded-md absolute bottom-100 md:bottom-0 right-0 mb-4 mr-4'
            >
                {exercise.level}
            </Badge>
            <div id='info' className='mt-0 md:mt-2  h-full'>
                <h2
                    id='nome'
                    className='text-base md:text-lg font font-semibold max-w-[200px] md:max-w-none'
                >
                    {exercise.name}
                </h2>
                <span className='flex gap-2 mt-1 w-full flex-wrap'>
                    {exercise.muscle.map((muscle) => (
                        <Badge key={muscle} className='rounded-md'>
                            {muscle}
                        </Badge>
                    ))}
                </span>
                <span className='mt-1 w-full text-muted-foreground text-xs'>
                    Equipamento:{" "}
                    {exercise.equipment.length == 1 ? (
                        <span>{exercise.equipment[0]}</span>
                    ) : (
                        exercise.equipment.map((equipment, index) => (
                            <span key={equipment}>
                                {index === exercise.equipment.length - 1 ? ( //se o indice for igual ao ultimo
                                    equipment //apenas equipamento
                                ) : (
                                    <>{equipment} ou </> //equipamento, ou
                                )}
                            </span>
                        ))
                    )}
                </span>
                {screenWidth >= 768 && (
                    <>
                        <hr className='md:my-2 lg:my-4'></hr>
                        <h4 className='font-semibold '>Execução:</h4>
                        <p
                            className='text-xs mt-2 text-muted-foreground h-[50px] lg:h-75px '
                            style={{ overflow: "clip", textOverflow: "..." }}
                        >
                            {exercise.description}
                        </p>
                    </>
                )}
            </div>
            <span className='group-hover:underline absolute bottom-0 right-0 mb-3 mr-3 md:right-auto md:mb-4 text-xs flex items-center gap-[0.15rem]'>
                Ver mais <ArrowRight className='scale-[0.65] inline-block' />
            </span>
        </GlowingCard>
    );
}
