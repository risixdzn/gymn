"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { SignOut } from "@/lib/auth/signOut";
import { Session, createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useRouter } from "next/navigation";
import { useCallback, useState, useEffect } from "react";
import Image from "next/image";
import gLogo from "../../../public/g_SquareIcon.png";
import { Edit, LogOut } from "lucide-react";
import { useTimestampConverter } from "@/lib/hooks/useTimestampConvert";
import { CalendarDays } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

type User = {
    created_at: string;
    username: string;
    first_name: string;
    profile: string;
};

export default function Profile({ session }: { session: Session | null }) {
    const supabase = createClientComponentClient();
    const [loading, setLoading] = useState<boolean>(false);
    const user = session?.user;
    const router = useRouter();

    const [displayUser, setDisplayUser] = useState<User>({
        created_at: "",
        username: "",
        first_name: "",
        profile: "",
    });

    const getProfile = useCallback(async () => {
        try {
            setLoading(true);

            let { data, error, status } = await supabase
                .from("users")
                .select("created_at, username, profile, first_name")
                .eq("id", user?.id)
                .single();
            if (error && status !== 406) {
                throw error;
            }

            if (data) {
                setDisplayUser({
                    created_at: data.created_at,
                    username: data.username,
                    first_name: data.first_name,
                    profile: data.profile,
                });
            }
        } catch (error) {
            console.log("Error on getting user data", error);
        } finally {
            setLoading(false);
        }
    }, [user, supabase]);

    useEffect(() => {
        getProfile();
        console.log(user);
    }, [user, getProfile]);

    const formattedJoinDate = useTimestampConverter(displayUser?.created_at);

    return (
        <>
            <div>
                <div id='banner' className='w-full h-36 bg-accent rounded-t-2xl lg:h-72'></div>
                <div
                    id='pfp'
                    className='absolute w-28 lg:w-48 h-28 lg:h-48 rounded-full lg:rounded-3xl bg-card 
                        -translate-y-[50%] lg:-translate-y-[15%] ml-0 lg:ml-10 border-background border-[5px] lg:border-[7.5px] overflow-hidden'
                >
                    <div className=' hover:opacity-100 opacity-0 w-full h-full bg-black/70 rounded-2xl transition-all absolute flex flex-col gap-2 items-center justify-center'>
                        <Edit className='scale-150 drop-shadow-lg pointer-events-none' />
                        <p className='text-sm drop-shadow-lg  pointer-events-none'>Alterar</p>
                    </div>
                    <Image width={100} height={100} alt='' className='w-full h-full' src={gLogo} />
                </div>
                <div
                    id='actions'
                    className='absolute w-[calc(100%-2.5rem)] lg:w-[calc(100%-5rem)] mt-3 lg:mt-7 h-10 flex gap-2 justify-end'
                >
                    <Button variant={"outline"}>Editar perfil</Button>
                    <Button
                        onClick={() => SignOut({ router })}
                        size={"icon"}
                        className='lg:mr-7'
                        variant={"outline"}
                    >
                        <LogOut className='scale-75' />
                    </Button>
                </div>
                <div
                    id='topinfo'
                    className='w-full h-auto flex flex-col pl-2 lg:mt-0 mt-10 lg:pl-[calc(12rem+(2.5rem*2))] py-5 lg:py-7 gap-1'
                >
                    <h1 className='text-2xl lg:text-3xl tracking-tight font-semibold flex items-center'>
                        {!loading ? displayUser.first_name : <Skeleton className='w-36 h-6' />}
                        <span className='lg:text-base text-muted-foreground inline-block pl-2 text-sm'>
                            {!loading ? (
                                "@" + displayUser.username
                            ) : (
                                <Skeleton className='w-20 h-3' />
                            )}
                        </span>
                    </h1>
                    <span>
                        {!loading ? (
                            <Badge className='w-auto'>
                                {displayUser.profile == "Member" ? "Membro" : "Dono de .academia."}
                            </Badge>
                        ) : (
                            <Skeleton className='w-20 h-5 rounded-full' />
                        )}
                    </span>
                    <p className='text-muted-foreground text-[13px] flex items-center mt-1 gap-1'>
                        <CalendarDays className='inline-block scale-75' /> Entrou em{" "}
                        {!loading ? formattedJoinDate : <Skeleton className='w-32 h-4' />}.
                    </p>
                </div>
            </div>
        </>
    );
}
