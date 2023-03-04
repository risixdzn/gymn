"use client";

import { ColumnDef } from "@tanstack/react-table";
import { type Root as Affiliation } from "@/app/api/affiliates/route";
import { MoreHorizontal, Trash, User } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";

export const columns: ColumnDef<Affiliation>[] = [
    {
        accessorKey: "affiliate_info.display_name",
        header: "Nome",
    },
    {
        accessorKey: "affiliate_info.username",
        header: "Username",
    },
    {
        accessorKey: "affiliate_info.email",
        header: "Email",
    },
    {
        id: "actions",
        header: "Ações",
        cell: ({ row }) => {
            const root = row.original;
            // @ts-ignore: Unreachable code error
            const affiliate_info = root.affiliate_info;

            return (
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant='ghost' className='h-8 w-8 p-0'>
                            <span className='sr-only'>Open menu</span>
                            <MoreHorizontal className='h-4 w-4' />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align='end'>
                        <DropdownMenuLabel>Ações</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <Link
                            className=''
                            href={`/dashboard/profile/${affiliate_info.username}`}
                            target='_blank'
                        >
                            <DropdownMenuItem className='hover:cursor-pointer flex items-center gap-1 '>
                                <User className='scale-75' />
                                Ver usuário
                            </DropdownMenuItem>
                        </Link>
                        <DropdownMenuItem className='flex items-center gap-1 text-destructive'>
                            <Trash className='scale-75' />
                            Deletar{" "}
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            );
        },
    },
];
