"use client";

import { Button } from "@/components/ui/button";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Dispatch, SetStateAction, useState } from "react";

export type Exercise = {
    id: string;
    muscle: string[];
    name: string;
    equipment: string[];
    level: string;
    description: string;
};

interface QueryMuscle {
    muscle: string;
    filteredMuscle: string;
    setFilteredMuscle: Dispatch<SetStateAction<string>>;
}
const QueryMuscle = ({ muscle, filteredMuscle, setFilteredMuscle }: QueryMuscle) => {
    return (
        <Button
            variant={muscle == filteredMuscle ? "default" : "outline"}
            className='whitespace-nowrap'
            onClick={() => setFilteredMuscle(muscle)}
        >
            {muscle}
        </Button>
    );
};

export default function Exercises() {
    const [filteredMuscle, setFilteredMuscle] = useState("");
    const { data } = useQuery(["exercises", filteredMuscle], () => {
        //data serves as the 'state' of the api data
        return axios.get(`/api/exercises?muscle=${filteredMuscle}`).then((res) => res.data);
    });

    const muscles = [
        "Abdominais",
        "Abdutores",
        "Adutores",
        "Antebraços",
        "Biceps",
        "Cardio",
        "Costas superiores",
        "Dorsais",
        "Quadríceps",
        "Glúteos",
        "Posterior",
        "Lombar",
        "Ombros",
        "Panturrilhas",
        "Peito",
        "Trapézio",
        "Tríceps",
    ];

    return (
        <div>
            <div className='flex gap-2 overflow-x-scroll overflow-y-hidden scrollbar-thin scrollbar-thumb-purple-600 py-2 scrollbar-thumb-rounded-full'>
                {muscles.map((muscle) => (
                    <QueryMuscle
                        key={muscle}
                        muscle={muscle}
                        filteredMuscle={filteredMuscle}
                        setFilteredMuscle={setFilteredMuscle}
                    />
                ))}
            </div>

            <h1 className='text-3xl font-semibold mt-4'>Exercícios</h1>
            {data?.data.map((exercise: Exercise) => (
                <div className='mt-4' key={exercise.id}>
                    <h2 className='font-semibold'>{exercise.name}</h2>
                    <h4>{exercise.level}</h4>
                    <p>{exercise.description}</p>
                </div>
            ))}
        </div>
    );
}
