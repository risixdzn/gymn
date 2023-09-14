import {
    Drawer,
    DrawerContent,
    DrawerDescription,
    DrawerTitle,
} from "@/components/ui/DrawerOrVaul";
import { useGetScreenWidth } from "@/lib/hooks/useGetScreenWidth";
import { Grid2x2 } from "lucide-react";
import { Dispatch, SetStateAction } from "react";

export default function MuscleFilterDrawer({
    muscles,
    muscleFilterDrawerOpen,
    setMuscleFilterDrawerOpen,
    setFilteredMuscle,
    setCurrentFilters,
    currentFilters,
    filteredMuscle,
}: {
    muscles: string[];
    muscleFilterDrawerOpen: boolean;
    setMuscleFilterDrawerOpen: Dispatch<SetStateAction<boolean>>;
    setFilteredMuscle: Dispatch<SetStateAction<string>>;
    setCurrentFilters: Dispatch<SetStateAction<string[]>>;

    currentFilters: string[];
    filteredMuscle: string;
}) {
    const { screenWidth } = useGetScreenWidth();

    return (
        <Drawer
            screenWidth={screenWidth}
            open={muscleFilterDrawerOpen}
            onOpenChange={setMuscleFilterDrawerOpen}
        >
            <DrawerContent screenWidth={screenWidth} scrollable={true}>
                <DrawerTitle screenWidth={screenWidth}>Grupos musculares</DrawerTitle>
                <DrawerDescription screenWidth={screenWidth} className='text-center lg:text-left'>
                    Selecione o grupo musculares para filtrar os exercícios.
                </DrawerDescription>
                <div className='mt-4'>
                    <button
                        className={`py-4 border-b-[1px] border-border w-full px-4 flex items-center gap-4 hover:bg-accent/50 ${
                            filteredMuscle == "" && "bg-accent/50"
                        }`}
                        onClick={() => {
                            setFilteredMuscle("");
                            setMuscleFilterDrawerOpen(false);
                        }}
                    >
                        <div
                            className={`w-12 h-12 bg-accent rounded-full flex items-center justify-center shadow-md ${
                                filteredMuscle == "" && "bg-background"
                            }`}
                        >
                            <Grid2x2 className='text-foreground' />
                        </div>
                        <span className='text-sm'>Todos</span>
                    </button>
                    {muscles.map((muscle, index) => (
                        <button
                            className={`py-4 border-b-[1px] border-border w-full px-4 flex items-center gap-4 hover:bg-accent/50 hadow-md ${
                                filteredMuscle == muscle && "bg-accent/50"
                            }`}
                            onClick={() => {
                                setCurrentFilters([...currentFilters, muscle]);
                                setFilteredMuscle(muscle);
                                setMuscleFilterDrawerOpen(false);
                            }}
                            key={index}
                        >
                            <div
                                className={`w-12 h-12 bg-accent rounded-full flex items-center justify-center shadow-md ${
                                    filteredMuscle == muscle && "bg-background"
                                }`}
                            ></div>
                            <span className='text-sm'>{muscle}</span>
                        </button>
                    ))}
                </div>
            </DrawerContent>
        </Drawer>
    );
}
