import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Dumbbell, ListFilter, Shapes, Triangle, X } from "lucide-react";
import MuscleFilterDrawer from "./MuscleFilterDrawer";
import { Dispatch, SetStateAction } from "react";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import FilterDrawer from "./FilterDrawer";
import { useSearchParams } from "next/navigation";

export const muscles = [
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

export const levels = ["Iniciante", "Intermediário", "Avançado"];

export default function Filters({ className }: { className: string }) {
    const searchParams = useSearchParams();
    const currentFilters = {
        muscle: searchParams.get("muscle"),
        equipment: searchParams.get("equipment"),
        level: searchParams.get("level"),
    };

    return (
        <div className={className}>
            {/* Filters */}
            <FilterDrawer
                drawerTitle='Grupos musculares'
                drawerDescription='Selecione o grupo musculares para filtrar os exercícios.'
                options={muscles}
                filterKey={"muscle"}
                allowAnyFilter={true}
                currentFilters={currentFilters}
            />
        </div>
    );
}
