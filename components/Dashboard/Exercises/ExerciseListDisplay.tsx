"use client";

import { APIExercise } from "./ExerciseCard";
import Link from "next/link";
import { motion } from "framer-motion";
import ExerciseCard from "./ExerciseCard";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuSub,
    DropdownMenuCheckboxItem,
    DropdownMenuSubContent,
    DropdownMenuSubTrigger,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Filter, ListOrdered, Search } from "lucide-react";
import { equipments, muscles } from "@/lib/filters";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { useSession } from "@/lib/supabase/useSession";
import { Tumbleweed } from "@/public/svg/Tumbleweed";
import AddExercise from "./AddExercise/AddExercise";

export const ExerciseListFilter = () => {
    const searchParams = useSearchParams();
    const router = useRouter();

    const paramsMuscle = searchParams.get("muscle");
    const [selectedMuscle, setSelectedMuscle] = useState<string>(paramsMuscle ?? "");
    const paramsEquipment = searchParams.get("equipment");
    const [selectedEquipment, setSelectedEquipment] = useState<string>(paramsEquipment ?? "");
    const paramsCreated = searchParams.get("created");
    const [selectedCreated, setSelectedCreated] = useState<string>(paramsCreated ?? "");

    const paramsFilter = searchParams.get("filter");
    const [searchFilter, setSearchFilter] = useState<string>(paramsFilter ?? "");

    const filterAmount = useRef<number>(0);

    useEffect(() => {
        const filters = [selectedMuscle, selectedEquipment, selectedCreated];
        const appliedFilters = filters.filter((filter) => filter !== "");
        filterAmount.current = appliedFilters.length;

        router.push(
            `?muscle=${selectedMuscle}&equipment=${selectedEquipment}&created=${selectedCreated}&filter=${searchFilter}`,
            { scroll: false }
        );
    }, [selectedMuscle, selectedEquipment, selectedCreated, searchFilter, router]);

    return (
        <div className='flex gap-2 flex-wrap'>
            {/* Filtrar */}
            <DropdownMenu>
                <DropdownMenuTrigger>
                    <Button variant={"outline"}>
                        Filtrar
                        <Filter className='w-5 h-5 inline-block ml-2' />
                        {filterAmount.current > 0 && (
                            <Badge className='ml-2' variant={"secondary"}>
                                {filterAmount.current}
                            </Badge>
                        )}
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align='start' className='w-56'>
                    <DropdownMenuLabel>Filtros</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuSub>
                        <DropdownMenuSubTrigger>Criado por</DropdownMenuSubTrigger>
                        <DropdownMenuSubContent>
                            <DropdownMenuCheckboxItem
                                onSelect={(e) => e.preventDefault()}
                                checked={paramsCreated == null || paramsCreated == ""}
                                onCheckedChange={() => setSelectedCreated("")}
                            >
                                Todos
                            </DropdownMenuCheckboxItem>
                            <DropdownMenuCheckboxItem
                                onSelect={(e) => e.preventDefault()}
                                checked={paramsCreated == "default"}
                                onCheckedChange={() => setSelectedCreated("default")}
                            >
                                Padrão
                            </DropdownMenuCheckboxItem>
                            <DropdownMenuCheckboxItem
                                onSelect={(e) => e.preventDefault()}
                                checked={paramsCreated == "me"}
                                onCheckedChange={() => setSelectedCreated("me")}
                            >
                                Por mim
                            </DropdownMenuCheckboxItem>
                            <DropdownMenuCheckboxItem
                                onSelect={(e) => e.preventDefault()}
                                checked={paramsCreated == "thirds"}
                                onCheckedChange={() => setSelectedCreated("thirds")}
                            >
                                Por terceiros
                            </DropdownMenuCheckboxItem>
                        </DropdownMenuSubContent>
                    </DropdownMenuSub>
                    <DropdownMenuSeparator />
                    <DropdownMenuSub>
                        <DropdownMenuSubTrigger>Grupo muscular</DropdownMenuSubTrigger>
                        <DropdownMenuSubContent>
                            <DropdownMenuCheckboxItem
                                onSelect={(event) => event.preventDefault()}
                                onCheckedChange={() => setSelectedMuscle("")}
                                checked={paramsMuscle == null || paramsMuscle == ""}
                            >
                                Todos
                            </DropdownMenuCheckboxItem>
                            {muscles.map((muscle, index) => (
                                <DropdownMenuCheckboxItem
                                    key={index}
                                    checked={paramsMuscle === muscle}
                                    onSelect={(event) => event.preventDefault()}
                                    onCheckedChange={() => setSelectedMuscle(muscle)}
                                >
                                    {muscle}
                                </DropdownMenuCheckboxItem>
                            ))}
                        </DropdownMenuSubContent>
                    </DropdownMenuSub>
                    <DropdownMenuSub>
                        <DropdownMenuSubTrigger>Equipamento</DropdownMenuSubTrigger>
                        <DropdownMenuSubContent>
                            <DropdownMenuCheckboxItem
                                checked={paramsEquipment == null || paramsEquipment == ""}
                                onSelect={(event) => event.preventDefault()}
                                onCheckedChange={() => setSelectedEquipment("")}
                            >
                                Todos
                            </DropdownMenuCheckboxItem>
                            {equipments.map((equipment, index) => (
                                <DropdownMenuCheckboxItem
                                    key={index * 3}
                                    checked={paramsEquipment === equipment}
                                    onSelect={(event) => event.preventDefault()}
                                    onCheckedChange={() => setSelectedEquipment(equipment)}
                                >
                                    {equipment}
                                </DropdownMenuCheckboxItem>
                            ))}
                        </DropdownMenuSubContent>
                    </DropdownMenuSub>
                </DropdownMenuContent>
            </DropdownMenu>

            {/* Pesquisa */}
            <div className='relative'>
                <Search className='text-muted-foreground absolute mt-3 ml-4  w-4 h-4' />
                <Input
                    value={searchFilter}
                    placeholder='Pesquisar'
                    onChange={(e) => setSearchFilter(e.target.value)}
                    className=' pl-10 w-64'
                />
            </div>
        </div>
    );
};

export default function ExerciseListDisplay({ exercises }: { exercises: APIExercise[] }) {
    const searchParams = useSearchParams();

    const filteredMuscle = searchParams.get("muscle");
    const filteredEquipment = searchParams.get("equipment");
    const filteredCreator = searchParams.get("created");
    const session = useSession();

    const exercisesFiltered = exercises.filter(function (exercise) {
        const creatorFilter: { [key: string]: string } = {
            default: "da89627e-3917-4e7c-a583-dab21d5ef726",
            me: session?.user?.id as string,
            others: "",
        };

        const hasMatchingMuscle = !filteredMuscle || exercise.muscles.includes(filteredMuscle);

        const hasMatchingEquipment =
            !filteredEquipment || exercise.equipment.includes(filteredEquipment);

        const hasMatchingCreator =
            !filteredCreator ||
            //se o filtro for diferente de outros ,
            (filteredCreator !== "others"
                ? exercise.created_by.includes(creatorFilter[filteredCreator])
                : exercise.created_by !== session?.user?.id &&
                  exercise.created_by !== "da89627e-3917-4e7c-a583-dab21d5ef726");

        return hasMatchingMuscle && hasMatchingEquipment && hasMatchingCreator;
    });

    const searchFilter = searchParams.get("filter");
    const searchedExercises = exercisesFiltered.filter((exercise) =>
        exercise.name.toLowerCase().includes(searchFilter?.toLowerCase() as string)
    );

    return (
        <>
            {searchedExercises.length > 0 ? (
                <>
                    {searchedExercises.map((exercise, index) => (
                        <Link href={`/dashboard/exercises/${exercise.id}`} key={index}>
                            <motion.div
                                initial={
                                    index < 35
                                        ? { opacity: 0, scale: 0.8 }
                                        : { opacity: 1, scale: 1 }
                                }
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: index * 0.075 }}
                            >
                                <ExerciseCard seeMore key={exercise.id} exercise={exercise} />
                            </motion.div>
                        </Link>
                    ))}
                </>
            ) : (
                <div className='w-[calc(100%-(2*1.25rem))] lg:w-[calc(100%-(2*2.5rem))] h-[calc(100vh-20rem)] flex items-center justify-center border-dashed border-[2px] bg-card rounded-lg absolute'>
                    <div className='gap-2 flex flex-col items-center'>
                        <Tumbleweed className='w-24 h-24 fill-neutral-500' />
                        <h3 className='font-semibold text-muted-foreground text-2xl tracking-tight'>
                            Nenhum exercício encontrado
                        </h3>
                        <p className='max-w-sm text-sm text-muted-foreground text-center '>
                            Conhece o exercício mas ele não está aqui? Adicione-o!
                        </p>
                        <div className='mt-3'>
                            <AddExercise variant='secondary' />
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
