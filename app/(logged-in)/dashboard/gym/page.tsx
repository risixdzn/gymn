"use client";

import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Root as GymResponse } from "@/app/api/gym/route";
import { ArrowRight, Crown, Info, MapPin, Printer, QrCode, User } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useSession } from "@/lib/supabase/useSession";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import GymAffiliates from "@/components/Dashboard/Gym/GymAffiliates";
import { Skeleton } from "@/components/ui/skeleton";
import { GymRefferal } from "@/components/Dashboard/Gym/ReferralCode";
import JoinGymSuccessAlert from "@/components/Dashboard/Gym/JoinGymSuccessAlert";
import NoGym from "@/components/Dashboard/Gym/NoGym";
import { SkeletonGymPage } from "@/components/Dashboard/Gym/SkeletonGymPage";

export default function GymPage() {
    const session = useSession();

    const { data, isLoading } = useQuery<GymResponse>({
        queryKey: ["gym"], //key and params to define the query
        queryFn: () => {
            return axios.get(`/api/gym`).then((res) => res.data);
        },
        retry: false,
        refetchOnWindowFocus: false,
    });

    const gym = data?.data;
    const url = window.location.href;

    if (isLoading) return <SkeletonGymPage />;

    return (
        <section className='min-h-screen space-y-6'>
            <JoinGymSuccessAlert />
            {gym ? (
                <>
                    <div className='w-full relative rounded-md bg-accent h-28 lg:h-52'>
                        {session?.user.id == gym?.owner?.id && (
                            <GymRefferal
                                className='absolute right-0 bottom-0 mb-2 mr-2'
                                gym={data}
                                url={url}
                            />
                        )}
                    </div>

                    <div className='flex items-center gap-6 lg:gap-8'>
                        <Avatar className=' w-20 h-20 lg:w-36 lg:h-36 rounded-md'>
                            <AvatarFallback className='rounded-md text-2xl lg:text-4xl '>
                                {gym?.name?.slice(0, 2).toUpperCase()}
                            </AvatarFallback>
                        </Avatar>
                        <div className='lg:space-y-1'>
                            <h1 className='text-xl xl:text-3xl tracking-tight font-semibold '>
                                {gym?.name}
                            </h1>
                            <span className='text-muted-foreground text-sm flex gap-1 items-center '>
                                <MapPin className='inline-block scale-75' />
                                <span className='text-sm text-muted-foreground'>
                                    {gym?.address}
                                </span>
                            </span>
                            <div className='flex gap-2 items-center text-xs'>
                                <Avatar className='w-8 h-8'>
                                    <AvatarImage
                                        src={`/api/users/${gym?.owner?.username}/avatar?cache=true`}
                                    />
                                    <AvatarFallback className='text-sm'>
                                        {gym?.owner?.username?.slice(0, 2).toUpperCase()}
                                    </AvatarFallback>
                                </Avatar>
                                Responsável:
                                {session?.user?.id === gym?.owner?.id ? (
                                    <Badge>Você</Badge>
                                ) : (
                                    <b>{gym?.owner?.display_name}</b>
                                )}
                                <Crown className='w-4 h-4 text-amber-400 inline-block' />
                            </div>
                        </div>
                    </div>
                    <hr className='block lg:hidden' />
                    {session?.user?.id === gym?.owner?.id && (
                        <Card className='lg:bg-card shadow-none p-0 bg-transparent border-none lg:border-solid border-border lg:p-8'>
                            <h1 className='text-2xl font-semibold tracking-tight flex items-center'>
                                <User className='w-6 h-6 inline-block mr-2 text-purple-600' />
                                Alunos afiliados
                            </h1>
                            <p className='text-sm text-muted-foreground mt-3 lg:mt-1'>
                                Veja e gerencie todos os alunos afiliados a <b>{gym?.name}</b>.
                            </p>
                            <GymAffiliates />
                        </Card>
                    )}
                </>
            ) : (
                <NoGym />
            )}
        </section>
    );
}
