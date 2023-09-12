import { Drawer as VaulDrawer } from "vaul";
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet";
import { ReactNode, Dispatch, SetStateAction } from "react";

type Props = {
    screenWidth: number;
    children?: ReactNode;
};

const Drawer = ({
    screenWidth,
    children,
    open,
    onOpenChange,
}: {
    screenWidth: number;
    children?: ReactNode;
    open?: boolean;
    onOpenChange?: Dispatch<SetStateAction<boolean>>;
}) => {
    return screenWidth < 1024 ? (
        <VaulDrawer.Root open={open} onOpenChange={onOpenChange}>
            {children}
        </VaulDrawer.Root>
    ) : (
        <Sheet open={open} onOpenChange={onOpenChange}>
            {children}
        </Sheet>
    );
};

const DrawerTrigger = ({ screenWidth, children }: Props) => {
    return screenWidth < 1024 ? (
        <VaulDrawer.Trigger>{children}</VaulDrawer.Trigger>
    ) : (
        <SheetTrigger>{children}</SheetTrigger>
    );
};

const DrawerContent = ({ screenWidth, children }: Props) => {
    return screenWidth < 1024 ? (
        <VaulDrawer.Portal>
            <VaulDrawer.Overlay className='fixed inset-0 bg-black/40 z-[48]' />
            <VaulDrawer.Content className='bg-background flex flex-col rounded-t-[10px] h-[96%] mt-24 fixed bottom-0 left-0 right-0 z-[49]'>
                <div className='mx-auto w-12 h-1.5 flex-shrink-0 rounded-full bg-accent mb-8 mt-4' />
                <div className='max-w-md mx-auto px-8'>{children}</div>
            </VaulDrawer.Content>
        </VaulDrawer.Portal>
    ) : (
        <SheetContent className='w-[400px] sm:w-[540px]'>{children}</SheetContent>
    );
};

const DrawerTitle = ({ screenWidth, children }: Props) => {
    return screenWidth < 1024 ? (
        <VaulDrawer.Title className='max-w-md mx-auto text-lg font-semibold text-foreground'>
            {children}
        </VaulDrawer.Title>
    ) : (
        <SheetTitle>{children}</SheetTitle>
    );
};

const DrawerDescription = ({ screenWidth, children }: Props) => {
    return screenWidth < 1024 ? (
        <VaulDrawer.Description className='text-sm text-muted-foreground'>
            {children}
        </VaulDrawer.Description>
    ) : (
        <SheetDescription>{children}</SheetDescription>
    );
};

export { Drawer, DrawerContent, DrawerTrigger, DrawerDescription, DrawerTitle };
