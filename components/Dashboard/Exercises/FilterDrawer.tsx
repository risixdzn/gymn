import {
    Drawer,
    DrawerContent,
    DrawerDescription,
    DrawerTitle,
    DrawerTrigger,
} from "@/components/ui/DrawerOrVaul";
import { Input } from "@/components/ui/input";
import { useGetScreenWidth } from "@/lib/hooks/useGetScreenWidth";
import { ChevronDown, Grid2x2, Search } from "lucide-react";
import { useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";

type FilterDrawerProps = {
    drawerTitle: string;
    drawerDescription: string;
    allowAnyFilter?: boolean | true;
    options: string[];
    filterKey: "muscles" | "level" | "equipment";
    currentFilters: {
        muscle: string | null;
        equipment: string | null;
        level: string | null;
    };
};

export default function FilterDrawer({
    drawerTitle,
    drawerDescription,
    allowAnyFilter,
    options,
    filterKey,
    currentFilters,
}: FilterDrawerProps) {
    const [open, setOpen] = useState(false);
    const { screenWidth } = useGetScreenWidth();
    const searchParams = useSearchParams();
    const selectedOption = searchParams.get(filterKey);

    const [searchTerm, setSearchTerm] = useState(""); // State for the search term
    // Filter the options based on the search term
    const searchedOptions = options.filter((option) =>
        option.toLowerCase().includes(searchTerm.toLowerCase())
    );
    const { muscle, equipment, level } = currentFilters;

    // Filter out keys with null values
    const filteredFilters = Object.entries({
        muscle,
        equipment,
        level,
    }).reduce((acc, [key, value]) => {
        if (value !== null && key !== filterKey) {
            acc[key] = value;
        }
        return acc;
    }, {} as { [key: string]: string });

    const queryString = new URLSearchParams(filteredFilters).toString();

    return (
        <Drawer screenWidth={screenWidth} open={open} onOpenChange={setOpen}>
            <DrawerTrigger screenWidth={screenWidth}>
                <Button
                    className='h-8'
                    variant={selectedOption ? "secondary" : "outline"}
                    onClick={() => {
                        searchParams.set;
                    }}
                >
                    {selectedOption ? selectedOption : "Todos os músculos"}
                    <ChevronDown className='p-0 mr-0 scale-75' />
                </Button>
            </DrawerTrigger>
            <DrawerContent screenWidth={screenWidth} scrollable={true} closeVisible={false}>
                <div className='pt-12 z-[2] -translate-y-12 sticky top-0 bg-background pb-4'>
                    <DrawerTitle screenWidth={screenWidth} className='z-[4]'>
                        {drawerTitle}
                    </DrawerTitle>
                    <DrawerDescription screenWidth={screenWidth} className='text-left '>
                        {drawerDescription}
                    </DrawerDescription>
                    <div id='search' className='relative mt-4'>
                        <Search className='absolute top-0 bottom-0 w-6 h-6 my-auto left-3 scale-75' />
                        <Input
                            type='text'
                            placeholder='Search'
                            className='pl-12 pr-4'
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                </div>
                <div className='mt-2 -translate-y-12'>
                    {!allowAnyFilter ? (
                        <></>
                    ) : (
                        <Link
                            href={`?${queryString}`}
                            className={`py-4 border-b-[1px] border-border w-full px-4 flex items-center gap-4 hover:bg-accent/50 ${
                                selectedOption == "" && "bg-accent/50"
                            }`}
                            onClick={() => setOpen(false)}
                        >
                            <div
                                className={`w-12 h-12 bg-accent rounded-full flex items-center justify-center shadow-md ${
                                    selectedOption == "" && "bg-background"
                                }`}
                            >
                                <Grid2x2 className='text-foreground' />
                            </div>
                            <span className='text-sm'>Todos</span>
                        </Link>
                    )}

                    {searchedOptions.map((option, index) => (
                        <Link
                            href={`?${filterKey}=${option}&${queryString}`}
                            className={`py-4 border-b-[1px] border-border w-full px-4 flex items-center gap-4 hover:bg-accent/50 hadow-md ${
                                selectedOption == option && "bg-accent/50"
                            }`}
                            key={index}
                            onClick={() => setOpen(false)}
                        >
                            <div
                                className={`w-12 h-12 bg-accent rounded-full flex items-center justify-center shadow-md ${
                                    selectedOption == option && "bg-background"
                                }`}
                            ></div>
                            <span className='text-sm'>{option}</span>
                        </Link>
                    ))}
                </div>
            </DrawerContent>
        </Drawer>
    );
}
