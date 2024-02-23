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

export interface DBWorkout {
    id: string;
    owner: string;
    created_at: string;
    workout: Workout;
    users: Users;
}

export interface Workout {
    title: string;
    exercises: z.infer<typeof Exercise>[];
    description: string;
    muscle_group: string[];
}

export interface Set {
    load: number;
    reps: number;
    variant: string;
}

export interface Users {
    id: string;
    created_at: string;
    username: string;
    display_name: string;
    profile: string;
    email: string;
    avatar_id: string;
    banner_id: string;
    bio: string;
    location: string;
}

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
    sets: z.array(Set).optional(),
    description: z.string(),
});

export const Workout = z.object({
    title: z.string().max(50, "O nome deve ser menor."),
    muscle_group: z.array(z.string()),
    description: z.string().max(400, "A descrição deve ser menor.").optional(),
    exercises: z.array(Exercise),
});
