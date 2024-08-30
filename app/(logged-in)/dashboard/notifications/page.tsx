"use client";

import { Button } from "@/components/ui/button";
import { Check, Info, Trash } from "lucide-react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { NotificationData } from "@/app/api/notifications/route";
import axios from "axios";
import Notification from "@/components/Dashboard/Notifications/Notification";
import { AnimatePresence, motion } from "framer-motion";
import { Skeleton } from "@/components/ui/skeleton";
import { Tumbleweed } from "@/public/svg/Tumbleweed";

interface APIResponse<T> {
    success: boolean;
    data: T[];
}

export default function NotificationsPage() {
    const supabase = createClientComponentClient();

    const { data, isLoading } = useQuery<APIResponse<NotificationData>>({
        queryKey: ["notifications"], //key and params to define the query
        queryFn: () => {
            return axios.get(`/api/notifications`).then((res) => res.data);
        },
        retry: false,
        refetchOnWindowFocus: false,
    });

    const queryClient = useQueryClient();

    supabase
        .channel("notifications")
        .on(
            "postgres_changes",
            { event: "INSERT", schema: "public", table: "notifications" },
            () => {
                queryClient.refetchQueries(["notifications"]);
            }
        )
        .on(
            "postgres_changes",
            { event: "DELETE", schema: "public", table: "notifications" },
            () => {
                queryClient.refetchQueries(["notifications"]);
            }
        )
        .subscribe();

    return (
        <div className='flex gap-4'>
            <section className=' w-full min-h-screen space-y-6 '>
                <div className='flex flex-col lg:flex-row justify-between lg:items-center gap-2 lg:gap-0'>
                    <div className='space-y-1'>
                        <h1 className='text-3xl font-semibold tracking-tight'>Notificações</h1>
                        <p className='text-muted-foreground'>Gerencie suas notificações aqui.</p>
                    </div>
                    <div className='flex gap-1'>
                        <Button variant={"outline"}>
                            <Check className='w-4 h-4 inline-block mr-1' />
                            Marcar como lidas
                        </Button>
                        <button className='text-sm text-muted-foreground hover:text-accent'></button>

                        <Button variant={"ghost"}>
                            <Trash className='w-4 h-4 inline-block mr-1' /> Limpar
                        </Button>
                    </div>
                </div>
                <div className='w-full flex flex-col gap-2'>
                    {!isLoading ? (
                        <>
                            {data?.data!?.length > 0 ? (
                                <AnimatePresence>
                                    {data?.data.map((not, index) => (
                                        <motion.div
                                            key={index}
                                            initial={
                                                index < 35
                                                    ? { opacity: 0, scale: 0.8 }
                                                    : { opacity: 1, scale: 1 }
                                            }
                                            animate={{ opacity: 1, scale: 1 }}
                                            transition={{ delay: index * 0.075 }}
                                        >
                                            <Notification not={not} />
                                        </motion.div>
                                    ))}
                                </AnimatePresence>
                            ) : (
                                <div className='w-full h-auto aspect-video bg-card rounded-lg border-dashed border-[2px] flex items-center justify-center flex-col space-y-2 lg:space-y-4 p-6'>
                                    <Tumbleweed className='w-24 h-24 fill-neutral-500' />
                                    <h3 className='font-semibold text-muted-foreground text-lg lg:text-2xl tracking-tight'>
                                        Ainda não há nada aqui.
                                    </h3>
                                    <p className='max-w-xs text-xs lg:text-sm text-muted-foreground text-center '>
                                        Volte mais tarde e poderá ver as notificações recebidas por
                                        aqui.
                                    </p>
                                </div>
                            )}
                        </>
                    ) : (
                        <>
                            {Array.from({ length: 5 }).map((_, index) => (
                                <Skeleton key={index} className='w-full h-32' />
                            ))}
                        </>
                    )}
                </div>
            </section>
            <div className='h-screen w-[1px] bg-border xl:block hidden'></div>
            <section className='w-[30rem] pl-4 xl:block hidden'>
                <p className='text-muted-foreground text-sm'>
                    <Info className='w-4 h-4 mr-1 inline-block' />
                    As notificações são geradas automaticamente com base em ações suas ou de outros
                    usuários dentro do Gymn.
                    <br />
                    <br />
                    Como exemplo, uma notificação é enviada quando um aluno se afilia ou sai de sua
                    academia, ou quando você recebe uma mensagem.
                </p>
            </section>
        </div>
    );
}
