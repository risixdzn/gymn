import { Drawer as VaulDrawer } from "vaul";
import {
    Sheet,
    SheetClose,
    SheetContent,
    SheetDescription,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet";
import { ReactNode, Dispatch, SetStateAction } from "react";
import { cn } from "@/lib/utils";

type Props = {
    screenWidth: number;
    children?: ReactNode;
    scrollable?: boolean;
    className?: string;
    closeVisible?: boolean;
    asChild?: boolean;
    desktopClassname?: string;
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

const DrawerTrigger = ({ screenWidth, children, asChild }: Props) => {
    return screenWidth < 1024 ? (
        <VaulDrawer.Trigger asChild={asChild}>{children}</VaulDrawer.Trigger>
    ) : (
        <SheetTrigger asChild={asChild}>{children}</SheetTrigger>
    );
};

const DrawerContent = ({
    screenWidth,
    children,
    scrollable,
    className,
    closeVisible,
    desktopClassname,
}: Props) => {
    return screenWidth < 1024 ? (
        <VaulDrawer.Portal>
            <VaulDrawer.Overlay className='fixed inset-0 bg-black/40 z-[48]' />
            <VaulDrawer.Content
                className={cn(
                    "bg-background flex flex-col rounded-t-[10px] h-[96%] mt-24 fixed bottom-0 left-0 right-0 z-[9999999]",
                    className
                )}
            >
                <div className='mx-auto w-12 h-1.5 flex-shrink-0 rounded-full bg-accent mb-8 mt-4' />
                <div
                    className={`max-w-md w-full mx-auto px-8 flex flex-col  ${
                        scrollable ? "overflow-auto" : ""
                    }`}
                >
                    {children}
                </div>
            </VaulDrawer.Content>
        </VaulDrawer.Portal>
    ) : (
        <SheetContent
            className={cn(
                `sm:w-[400px] sm:max-w-full ${scrollable ? "overflow-auto" : ""}`,
                desktopClassname,
                className
            )}
        >
            {children}
        </SheetContent>
    );
};

const DrawerTitle = ({ screenWidth, children, className }: Props) => {
    return screenWidth < 1024 ? (
        <VaulDrawer.Title
            className={cn("max-w-md mx-auto text-lg font-semibold text-foreground", className)}
        >
            {children}
        </VaulDrawer.Title>
    ) : (
        <SheetTitle className={className}>{children}</SheetTitle>
    );
};

const DrawerDescription = ({ screenWidth, children, className }: Props) => {
    return screenWidth < 1024 ? (
        <VaulDrawer.Description className={cn("text-sm text-muted-foreground", className)}>
            {children}
        </VaulDrawer.Description>
    ) : (
        <SheetDescription className={className}>{children}</SheetDescription>
    );
};

export { Drawer, DrawerContent, DrawerTrigger, DrawerDescription, DrawerTitle };
