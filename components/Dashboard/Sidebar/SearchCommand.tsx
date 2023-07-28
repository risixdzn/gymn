import { Calculator, Calendar, CreditCard, Search, Settings, Smile, User } from "lucide-react";
import {
    CommandDialog,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
    CommandSeparator,
    CommandShortcut,
} from "@/components/ui/command";
import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";

export default function SearchCommand() {
    const [open, setOpen] = useState(false);

    useEffect(() => {
        const down = (event: KeyboardEvent) => {
            if ((event.key === "k" && event.ctrlKey) || event.metaKey) {
                setOpen((open) => !open);
            }
        };
        document.addEventListener("keydown", down);
        return () => document.removeEventListener("keydown", down);
    }, []);

    return (
        <>
            <Button
                onClick={() => setOpen(!open)}
                variant={"outline"}
                className='flex justify-between text-muted-foreground bg-accent/30'
            >
                <span className='flex items-center'>
                    <Search className='inline-block scale-75 mr-4' width={25} />
                    Procurar
                </span>
                <kbd className='pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-accent px-1.5 font-mono text-[10px] font-medium text-muted-foreground opacity-100'>
                    <span className='text-xs'>⌘</span>K
                </kbd>
            </Button>
            <CommandDialog open={open} onOpenChange={setOpen}>
                <CommandInput placeholder='Type a command or search...' />
                <CommandList>
                    <CommandEmpty>No results found.</CommandEmpty>
                    <CommandGroup heading='Suggestions'>
                        <CommandItem>
                            <Calendar className='mr-2 h-4 w-4' />
                            <span>Calendar</span>
                        </CommandItem>
                        <CommandItem>
                            <Smile className='mr-2 h-4 w-4' />
                            <span>Search Emoji</span>
                        </CommandItem>
                        <CommandItem>
                            <Calculator className='mr-2 h-4 w-4' />
                            <span>Calculator</span>
                        </CommandItem>
                    </CommandGroup>
                    <CommandSeparator />
                    <CommandGroup heading='Settings'>
                        <CommandItem>
                            <User className='mr-2 h-4 w-4' />
                            <span>Profile</span>
                            <CommandShortcut>⌘P</CommandShortcut>
                        </CommandItem>
                        <CommandItem>
                            <CreditCard className='mr-2 h-4 w-4' />
                            <span>Billing</span>
                            <CommandShortcut>⌘B</CommandShortcut>
                        </CommandItem>
                        <CommandItem>
                            <Settings className='mr-2 h-4 w-4' />
                            <span>Settings</span>
                            <CommandShortcut>⌘S</CommandShortcut>
                        </CommandItem>
                    </CommandGroup>
                </CommandList>
            </CommandDialog>
        </>
    );
}
