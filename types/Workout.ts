import * as z from "zod";

export type Exercise = {
    id: string;
    muscles: string[];
    name: string;
    equipment: string[];
    level: string[] | ["Iniciante" | "Intermediário" | "Avançado"];
    description: string;
    sets?: {
        variant: "Aquecimento" | "Normal" | "Falha";
        load: number;
        reps: number;
    }[];
};

export const Set = z.object({
    variant: z.enum(["Aquecimento", "Normal", "Falha"]),
    load: z.number(),
    reps: z.number(),
});

export const Exercise = z.object({
    id: z.string(),
    name: z.string(),
    muscles: z.array(z.string()),
    equipment: z.array(z.string()),
    level: z.array(z.string()),
    sets: z.array(Set),
    description: z.string(),
});

export const Workout = z.object({
    title: z.string().max(50, "O nome deve ser menor.").optional(),
    muscle_group: z.array(z.string()),
    description: z.string().max(400, "A descrição deve ser menor.").optional(),
    exercises: z.array(Exercise),
});
