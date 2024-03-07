"use client";

import {
    Bell,
    Compass,
    Layers,
    User,
    Activity,
    Dumbbell,
    Warehouse,
    Settings,
    BadgeHelp,
} from "lucide-react";
import { useContext, useEffect, useState } from "react";
import GymnIcon from "../../../../public/g_SquareIcon.png";
import Image from "next/image";
import LinkButton from "./ui/LinkButton";
import SearchCommand from "./ui/SearchCommand";
import { Session } from "@supabase/auth-helpers-nextjs";
import { useSearchParams } from "next/navigation";
import { SidebarData } from "./SidebarContext";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import ProfileHoverCard from "../../Profile/ProfileHoverCard";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { UserProfile } from "@/types/UserProfile";
import { ModeToggle } from "@/components/ModeToggle";
import { Skeleton } from "@/components/ui/skeleton";

export default function Sidebar({ session }: { session: Session | null }) {
    const [user, setUser] = useState<UserProfile | null>(null);

    const { data } = useQuery({
        queryKey: ["sidebarprofile"], //key and params to define the query
        queryFn: () => {
            return axios
                .get(`/api/users/${session?.user?.id}`)
                .then((res) => res.data && setUser(res.data));
        },
        retry: false,
        refetchOnWindowFocus: false,
    });
    const { isClient, screenWidth, setSidebarOpen, sidebarOpen, pathname } =
        useContext(SidebarData);
    const searchParams = useSearchParams();

    useEffect(() => {
        setSidebarOpen(false);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [pathname, searchParams]);

    if (!isClient) {
        return null;
    }

    return (
        <>
            <div
                id='sidebar'
                className={`fixed w-80 h-[100%] bg-card shadow-lg transition-all duration-300 border-border border-r-[1px] z-[30]
flex justify-between flex-col ${screenWidth >= 1024 ? "" : sidebarOpen ? "" : "-translate-x-80"}`}
            >
                <div id='topsection' className='w-full h-auto px-5 pt-5 flex flex-col gap-6'>
                    <div className='flex items-center w-full h-10 gap-4'>
                        <div className='w-10 h-10 bg-card rounded-lg'>
                            <Image
                                className='rounded-md'
                                width={40}
                                height={40}
                                src={GymnIcon}
                                alt=''
                            />
                        </div>
                        <div>
                            <h3 className='text-sm font-semibold'>Gymn</h3>
                            <h3 className='text-sm text-muted-foreground'>Plano Membro</h3>
                        </div>
                    </div>
                    <SearchCommand />
                    <div className='flex flex-col gap-1 -mt-2'>
                        <LinkButton
                            icon={<Compass />}
                            href='/explore'
                            text='Descobrir'
                            command='d'
                        />
                        <LinkButton icon={<Layers />} href='/inbox' text='Inbox' command='i' />

                        <LinkButton
                            icon={<Bell />}
                            href='/notifications'
                            text='Notificações'
                            command='n'
                        />

                        <LinkButton icon={<User />} href='/profile' text='Conta' command='c' />
                    </div>
                    <hr className='-mt-2'></hr>
                </div>

                <div
                    id='middlesection'
                    className=' w-full h-[100%] flex flex-col justify-between px-5 py-4'
                >
                    <div>
                        <p className='text-muted-foreground text-xs ml-5 mb-3'>Fitness</p>
                        <LinkButton icon={<Dumbbell />} href='/workouts' text='Treinos' />
                        <LinkButton icon={<Activity />} href='/exercises' text='Exercícios' />
                        <LinkButton icon={<Warehouse />} href='/gym' text='Sua academia' />
                    </div>
                    <div>
                        <LinkButton
                            icon={<Settings />}
                            href='/setting'
                            text='Configurações'
                            variant='muted'
                        />
                        <LinkButton
                            icon={<BadgeHelp />}
                            href='/about'
                            text={"Sobre"}
                            variant='muted'
                        />
                    </div>
                </div>

                <div
                    id='bottomsection'
                    className='w-full h-[7.5rem] border-t-[1px] border-border py-5 px-5'
                >
                    {user ? (
                        <ProfileHoverCard user={user} className='mb-8'>
                            <div className='flex flex-row items-center gap-4'>
                                <div className='w-11 h-11 bg-card rounded-md overflow-hidden'>
                                    <Avatar className='rounded-md w-11 h-11'>
                                        <AvatarImage
                                            className='rounded-md'
                                            src={`/api/users/${user.username}/avatar`}
                                        ></AvatarImage>
                                        <AvatarFallback>{user.username.slice(0, 2)}</AvatarFallback>
                                    </Avatar>
                                </div>
                                <div>
                                    <h3 className='text-sm font-semibold'>{user.display_name}</h3>
                                    <h3 className='relative text-sm text-muted-foreground w-[10rem] truncate'>
                                        {user.username}
                                    </h3>
                                </div>
                                <ModeToggle side='top' />
                            </div>
                        </ProfileHoverCard>
                    ) : (
                        <div className='flex flex-row items-center justify-between gap-4'>
                            <div className='flex flex-row items-center gap-4'>
                                <div className='w-11 h-11 bg-card rounded-md overflow-hidden'>
                                    <Skeleton className='w-11 h-11' />
                                </div>
                                <div className='space-y-2'>
                                    <Skeleton className='w-20 h-4' />
                                    <Skeleton className='w-10 h-3' />
                                </div>
                            </div>
                            <Skeleton className='w-10 h-10' />
                        </div>
                    )}
                </div>
            </div>
        </>
    );
}
