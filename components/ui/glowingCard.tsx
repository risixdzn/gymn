import { cn } from "@/lib/utils";
import { ReactNode } from "react";

export default function GlowingCard({
    children,
    className,
}: {
    children: ReactNode;
    className?: string;
}) {
    return (
        <div
            id='card'
            className={cn(
                `relative cursor-pointer p-4 rounded-lg bg-card shadow-xl border-[1px] border-border
            after:bg-gradient-to-b after:from-transparent after:via-slate-900/50 dark:after:via-white after:to-transparent 
            after:w-[1px] after:h-[50px] md:after:h-[140px] after:absolute after:left-[-1px] after:top-[65%] after:opacity-0 after:content-[""]
            after:transition-all after:ease-in-out after:transition-duration-[600ms]
            hover:after:top-[10%] hover:after:opacity-100
            before:bg-gradient-to-b before:from-transparent before:via-slate-900/50 dark:before:via-white before:to-transparent 
            before:w-[1px] before:h-[50px] md:before:h-[140px] before:absolute before:right-[-1px] before:bottom-[65%] before:opacity-0 before:content-[""]
            before:transition-all before:ease-in-out before:transition-duration-[600ms]
            hover:before:bottom-[10%] hover:before:opacity-100 
            dark:hover:bg-accent/40
            hover:bg-accent/30
            `,
                className
            )}
        >
            {children}
        </div>
    );
}
