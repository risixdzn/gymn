"use client";

import { useGetPathnameArray } from "@/lib/hooks/useGetRouteName";
import { translatePathnameArray } from "@/lib/hooks/useTranslateAppRoutes";
import { cn } from "@/lib/utils";
import { Folder } from "lucide-react";
import Link from "next/link";
import { SidebarData } from "../Sidebar/SidebarContext";
import { useContext } from "react";

export default function Breadcrumbs({ className }: { className?: string }) {
    const { pathname } = useContext(SidebarData);
    //all pathnames
    const pathnames: string[] = useGetPathnameArray(pathname);
    //translated using hook
    const translatedPathnames: string[] = translatePathnameArray(pathnames);

    //this gets an array and interleaves it with the 'thing'
    //meaning that:: interleave(['foo', 'bar', 'baz'], 'avocado')
    //prints > ["foo", "avocado", "bar", "avocado", "baz"]
    const interleave = (arr: any[], thing: any): any[] => {
        return ([] as any[]).concat(...arr.map((n) => [n, thing])).slice(0, -1) as any[];
    };

    return (
        <nav className={cn("text-sm", className)}>
            <ul className='flex items-center'>
                <Folder className='scale-75 text-muted-foreground' />
                {translatedPathnames.map((pathname, index) =>
                    index !== 0 && index !== translatedPathnames.length - 1 ? (
                        <Link
                            href={`/${interleave(pathnames.slice(1, index + 2), "/").join("")}`} //slicing it on 1 until index + 2 and joining on every index, the href is returned
                            key={index}
                            replace
                        >
                            <li
                                key={index}
                                className={
                                    index < translatedPathnames.length - 1
                                        ? "text-muted-foreground ml-2"
                                        : "ml-2"
                                }
                            >
                                <span className='hover:text-purple-500 hover:underline'>
                                    {pathname}
                                </span>

                                {index < translatedPathnames.length - 1 && `\u00A0\u00A0/`}
                            </li>
                        </Link>
                    ) : (
                        <li
                            key={index}
                            className={
                                index < translatedPathnames.length - 1
                                    ? "text-muted-foreground ml-2"
                                    : "ml-2"
                            }
                        >
                            {index < translatedPathnames.length - 1
                                ? `${pathname}\u00A0\u00A0/`
                                : pathname}
                        </li>
                    )
                )}
            </ul>
        </nav>
    );
}
