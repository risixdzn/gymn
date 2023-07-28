"use client";

import { ReactElement, cloneElement, useEffect, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

import Link from "next/link";

type LinkButtonProps = {
    href: string;
    icon: ReactElement;
    text: string;
    command?: string;
    variant?: "default" | "muted";
};

const CustomIcon = ({ icon }: { icon: ReactElement }) => {
    return cloneElement(icon, { width: 21 });
};

export default function LinkButton({ href, icon, text, command, variant }: LinkButtonProps) {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const [active, setActive] = useState(false);

    //shortcut handling
    useEffect(() => {
        if (command !== undefined) {
            const down = (event: KeyboardEvent) => {
                if ((event.key === command && event.ctrlKey) || event.metaKey) {
                    router.push(`/dashboard${href}`);
                }
            };
            document.addEventListener("keydown", down);
            return () => document.removeEventListener("keydown", down);
        }
    });

    //active handling
    useEffect(() => {
        if (pathname == `/dashboard${href}`) {
            setActive(true);
        } else setActive(false);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [pathname, searchParams]);

    return (
        <Link href={`/dashboard${href}`}>
            <button
                className={`w-full text-sm flex items-center justify-between transition-colors pl-5 pr-4 py-2 rounded-md
                    ${active ? "bg-accent/50" : "hover:bg-accent/50"} ${
                    variant == "muted" ? "text-muted-foreground" : ""
                }
                `}
            >
                <div className='flex items-center gap-4'>
                    <span className='inline-block text-muted-foreground'>
                        <CustomIcon icon={icon} />
                    </span>
                    {text}
                </div>
                {command !== undefined ? (
                    <kbd className='pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-accent px-1.5 font-mono text-[10px] font-medium text-muted-foreground opacity-100'>
                        <span className='text-xs'>⌘</span>
                        {command.toUpperCase()}
                    </kbd>
                ) : null}
            </button>
        </Link>
    );
}
