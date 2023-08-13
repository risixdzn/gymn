import { Edit, CalendarDays, Loader2, LogOut } from "lucide-react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context";
import { SignOut } from "@/lib/auth/signOut";
import { Badge } from "@/components/ui/badge";
import { useTimestampConverter } from "@/lib/hooks/useTimestampConvert";
import { Session } from "@supabase/supabase-js";
import UnexistentProfile from "./UnexistentProfile";
import { useGetProfile } from "@/lib/supabase/getProfile";

type PersonalProfileProps = {
    router: AppRouterInstance;
    username: string;
    session: Session | null;
};

export default function ForeignProfile({ router, username, session }: PersonalProfileProps) {
    const { loading, displayUser, unexistent } = useGetProfile({ username });
    const formattedJoinDate = useTimestampConverter(displayUser?.created_at);

    return (
        <>
            {!loading && !unexistent ? (
                <div>
                    <div id='banner' className='w-full h-36 bg-accent rounded-t-2xl lg:h-72'></div>
                    <div
                        id='pfp'
                        className='z-[1] absolute w-28 lg:w-48 h-28 lg:h-48 rounded-full lg:rounded-3xl bg-card 
                        -translate-y-[50%] lg:-translate-y-[15%] ml-0 lg:ml-10 border-background border-[5px] lg:border-[7.5px] overflow-hidden'
                    >
                        {displayUser?.username == session?.user.user_metadata.username ? (
                            <div className='group hover:opacity-100 opacity-0 w-full h-full bg-black/70 rounded-2xl transition-all absolute flex flex-col gap-2 items-center justify-center'>
                                <Edit
                                    className='lg:scale-150 drop-shadow-lg pointer-events-none'
                                    style={{ pointerEvents: "none" }}
                                />
                                <p className='text-sm drop-shadow-lg  pointer-events-none'>
                                    Alterar
                                </p>
                            </div>
                        ) : null}

                        {displayUser && (
                            <Image
                                width={300}
                                height={300}
                                alt=''
                                className='w-full h-full object-cover'
                                src={displayUser.avatar_url}
                            />
                        )}
                    </div>
                    {displayUser?.username == session?.user.user_metadata.username ? (
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
                    ) : (
                        <></>
                    )}
                    <div
                        id='topinfo'
                        className='w-full h-auto flex flex-col pl-2 lg:mt-0 mt-10 lg:pl-[calc(12rem+(2.5rem*2))] py-5 lg:py-7 gap-1'
                    >
                        <h1 className='text-2xl lg:text-3xl tracking-tight font-semibold flex items-center'>
                            {displayUser?.first_name}
                            <span className='lg:text-base text-muted-foreground inline-block pl-2 text-sm'>
                                {"@" + displayUser?.username}
                            </span>
                        </h1>
                        <span>
                            <Badge className='w-auto'>
                                {displayUser?.profile == "Member" ? "Membro" : "Dono de .academia."}
                            </Badge>
                        </span>
                        <p className='text-muted-foreground text-[13px] flex items-center mt-1 gap-1'>
                            <CalendarDays className='inline-block scale-75' /> Entrou em{" "}
                            {formattedJoinDate}.
                        </p>
                    </div>
                </div>
            ) : unexistent ? (
                <UnexistentProfile username={username} />
            ) : (
                <div className='w-full flex justify-center'>
                    <Loader2 className='w-10 h-10 animate-spin' />
                </div>
            )}
        </>
    );
}
