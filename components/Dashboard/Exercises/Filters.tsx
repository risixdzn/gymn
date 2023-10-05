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
