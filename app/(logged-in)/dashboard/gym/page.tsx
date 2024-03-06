"use client";

import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Root as GymResponse } from "@/app/api/gym/route";
import { MapPin } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export default function GymPage() {
    const { data, isLoading } = useQuery<GymResponse>({
        queryKey: ["gym"], //key and params to define the query
        queryFn: () => {
            return axios.get(`/api/gym`).then((res) => res.data);
        },
        retry: false,
    });

    const gym = data?.data;

    return (
        <section className='min-h-screen space-y-4'>
            <div className='w-full rounded-md bg-accent h-52'></div>

            <div className='flex items-center gap-8'>
                <Avatar className=' w-36 h-36 rounded-md'>
                    <AvatarFallback className='rounded-md text-4xl '>
                        {gym?.name?.slice(0, 2).toUpperCase()}
                    </AvatarFallback>
                </Avatar>
                <div className='space-y-2'>
                    <h1 className='text-2xl xl:text-3xl tracking-tight font-semibold'>
                        {gym?.name}
                    </h1>
                    <span className=' text-muted-foreground text-sm flex gap-1 items-center '>
                        <MapPin className='inline-block scale-75' />
                        <span className='text-sm text-muted-foreground'>{gym?.address}</span>
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
                        Responsável: <b>{gym?.owner?.display_name}</b>
                    </div>
                </div>
            </div>
        </section>
    );
}
