import { Edit, CalendarDays, Loader2, LogOut, X } from "lucide-react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context";
import { SignOut } from "@/lib/auth/signOut";
import { Badge } from "@/components/ui/badge";
import { useTimestampConverter } from "@/lib/hooks/useTimestampConvert";
import { Session } from "@supabase/supabase-js";
import { useGetCurrentProfile } from "@/lib/supabase/getProfile";
import UploadUI from "./Upload/UploadUI";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { useState } from "react";
import SkeletonProfile from "./SkeletonProfile";
import EditProfile from "./Edit/EditProfile";

type PersonalProfileProps = {
    router: AppRouterInstance;
    session: Session | null;
};

export default function PersonalProfile({ router, session }: PersonalProfileProps) {
    const { loading, displayUser, refetchUser } = useGetCurrentProfile({ session });
    const formattedJoinDate = useTimestampConverter(displayUser?.created_at);
    const [dialogOpen, setDialogOpen] = useState(false);

    return (
        <>
            {!loading ? (
                <div>
                    <div
                        id='banner'
                        className='w-full h-36 bg-accent rounded-t-2xl lg:h-72 relative overflow-hidden'
                    >
                        <div className='hover:opacity-100 opacity-0 w-full h-full bg-black/50  transition-all absolute flex flex-row gap-2 items-center justify-center'>
                            <Dialog>
                                <DialogTrigger>
                                    <button className='bg-black/50 p-5 rounded-full outline-0 outline-white hover:outline-2 hover:outline-white transition-all'>
                                        <Edit className='lg:scale-125 drop-shadow-lg pointer-events-none' />
                                    </button>
                                </DialogTrigger>
                                <DialogContent>
                                    <UploadUI
                                        displayUser={displayUser}
                                        setDialogOpen={setDialogOpen}
                                        refetchUser={refetchUser}
                                        uploadingTo='banners'
                                    />
                                </DialogContent>
                            </Dialog>

                            <button className='bg-black/50 p-5 rounded-full'>
                                <X className='lg:scale-125 drop-shadow-lg pointer-events-none' />
                            </button>
                        </div>
                        {displayUser && displayUser.banner_url !== null && (
                            <Image
                                width={1500}
                                height={1000}
                                src={displayUser.banner_url as string}
                                alt=''
                                key={1}
                                className='w-full h-full object-cover rounded-t-2xl'
                            />
                        )}
                    </div>
                    <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
                        <DialogTrigger className='absolute'>
                            <div
                                id='pfp'
                                className='z-[1] absolute w-28 lg:w-48 h-28 lg:h-48 rounded-full lg:rounded-3xl bg-card 
                    -translate-y-[50%] lg:-translate-y-[15%] ml-0 lg:ml-10 border-background border-[5px] lg:border-[7.5px] overflow-hidden object-cover'
                            >
                                <div className='hover:opacity-100 opacity-0 w-full h-full bg-black/70 rounded-2xl transition-all absolute flex flex-col gap-2 items-center justify-center'>
                                    <Edit className='lg:scale-150 drop-shadow-lg pointer-events-none' />
                                    <p className='text-sm drop-shadow-lg  pointer-events-none'>
                                        Alterar
                                    </p>
                                </div>
                                {displayUser && (
                                    <Image
                                        width={300}
                                        height={300}
                                        alt=''
                                        className='w-full h-full object-cover z-[1]'
                                        key={1}
                                        src={displayUser.avatar_url}
                                    />
                                )}
                                <div className='w-full h-full absolute flex items-center justify-center'>
                                    <h2 className='text-4xl'>
                                        {displayUser?.username.slice(0, 2).toUpperCase()}
                                    </h2>
                                </div>
                            </div>
                        </DialogTrigger>
                        <DialogContent>
                            <UploadUI
                                displayUser={displayUser}
                                setDialogOpen={setDialogOpen}
                                refetchUser={refetchUser}
                                uploadingTo='avatars'
                            />
                        </DialogContent>
                    </Dialog>

                    <div
                        id='actions'
                        className='absolute w-[calc(100%-2.5rem)] lg:w-[calc(100%-5rem)] mt-3 lg:mt-7 h-10 flex gap-2 justify-end'
                    >
                        <EditProfile displayUser={displayUser} />
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
                            {displayUser?.display_name}
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
            ) : (
                <SkeletonProfile />
            )}
        </>
    );
}
