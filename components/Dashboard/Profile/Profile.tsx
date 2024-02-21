"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { SignOut } from "@/lib/auth/signOut";
import { Session } from "@supabase/auth-helpers-nextjs";
import { Banner } from "./reusable/BannerWithActions";
import EditProfile from "./Edit/EditProfile";
import { Dumbbell, LogOut, MapPin, Users2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { UserProfile } from "@/types/UserProfile";
import { useTimestampConverter } from "@/lib/hooks/useTimestampConvert";
import { useQueryClient } from "@tanstack/react-query";
import { ProfilePicture } from "./reusable/ProfilePicture";

import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Edit, X } from "lucide-react";
import UploadUI from "./Upload/UploadUI";

export default function Profile({
    user,
    session,
    refetch,
}: {
    user: UserProfile;
    session: Session | null;
    refetch: () => void;
}) {
    const router = useRouter();
    const formattedJoinDate = useTimestampConverter(user?.created_at);
    // editprofile dialog state
    const [dialogOpen, setDialogOpen] = useState(false);

    const queryClient = useQueryClient();

    const refetchAvatar = () => {
        queryClient.refetchQueries(["avatar"]);
    };

    const refetchBanner = () => {
        queryClient.refetchQueries(["banner"]);
    };

    const ableToEdit = user?.id == session?.user?.id;

    return (
        <div className='rounded-xl shadow-sm relative min-h-screen'>
            {/* Banner section */}
            <Banner>
                <Banner.BannerImage user={user}>
                    <Banner.Content>
                        {ableToEdit && (
                            <>
                                <Dialog>
                                    <DialogTrigger>
                                        <button className='bg-black/50 p-5 rounded-full outline-0 outline-white hover:outline-2 hover:outline-white transition-all text-white'>
                                            <Edit className='xl:scale-125 drop-shadow-lg pointer-events-none' />
                                        </button>
                                    </DialogTrigger>
                                    <DialogContent>
                                        <UploadUI
                                            user={user}
                                            setDialogOpen={setDialogOpen}
                                            refetchUser={refetchBanner}
                                            uploadingTo='banners'
                                        />
                                    </DialogContent>
                                </Dialog>

                                <button className='bg-black/50 p-5 rounded-full text-white'>
                                    <X className='xl:scale-125 drop-shadow-lg pointer-events-none' />
                                </button>
                            </>
                        )}
                    </Banner.Content>
                </Banner.BannerImage>
                <Banner.Actions>
                    <EditProfile className='xl:hidden' user={user} refetchUser={refetch} />
                    <Button onClick={() => SignOut({ router })} size={"icon"} variant={"outline"}>
                        <LogOut className='scale-75' />
                    </Button>
                </Banner.Actions>
            </Banner>
            {/* pfp section */}
            <ProfilePicture
                dialogOpen={dialogOpen}
                user={user}
                refetchUser={refetchAvatar}
                setDialogOpen={setDialogOpen}
                ableToEdit={ableToEdit}
                className='-translate-y-[calc(4rem+50%)] xl:-translate-y-[calc(5rem+50%)]
        xl:w-80 xl:h-80 xl:ml-10 xl:border-card shadow-lg'
            />
            {/* profilecontent */}
            <div
                id='content'
                className='
        xl:mt-6 xl:grid xl:grid-cols-[20rem_auto] xl:gap-6 xl:pl-10 relative'
            >
                <div id='profiledata' className='xl:w-80 xl:pt-20 max-h-screen'>
                    <h1
                        id='display_name'
                        className='text-2xl xl:text-3xl tracking-tight font-semibold'
                    >
                        {user?.display_name}
                    </h1>
                    <h3 id='username' className='text-muted-foreground'>
                        {"@" + user?.username}
                        <Badge
                            id='profile'
                            className='w-auto bg-accent dark:bg-accent/60 text-foreground mt-2 ml-3'
                        >
                            {user?.profile == "Member" ? "Membro" : "Dono de .academia."}
                        </Badge>
                    </h3>

                    <p
                        id='bio'
                        className='text-sm text-foreground mt-4 xl:my-4 leading-5 max-h-[80px] overflow-clip whitespace-pre-line'
                    >
                        {user?.bio}
                    </p>
                    {ableToEdit && (
                        <EditProfile
                            width='full'
                            className='w-full bg-card h-9 xl:block hidden'
                            user={user}
                            refetchUser={refetch}
                        />
                    )}
                    <div className='text-muted-foreground flex gap-2 mb-4 xl:mt-4 '>
                        <Users2 />
                        <Badge className='bg-accent dark:bg-accent/60 text-muted-foreground h-7 rounded-sm text-sm gap-1'>
                            <span className='text-foreground'>50</span> seguidores
                        </Badge>
                        <span>&bull;</span>
                        <Badge className='bg-accent dark:bg-accent/60 text-muted-foreground h-7 rounded-sm text-sm gap-1'>
                            <span className='text-foreground'>24</span> seguindo
                        </Badge>
                    </div>
                    <div className='flex flex-col gap-1'>
                        <span className=' text-muted-foreground text-sm flex gap-2 items-center '>
                            <Dumbbell className='inline-block scale-75' />
                            <span className='text-sm text-foreground'>Punch Fitness</span>
                        </span>
                        {user?.location && (
                            <span className=' text-muted-foreground text-sm flex gap-2 items-center '>
                                <MapPin className='inline-block scale-75' />
                                <span className='text-sm text-foreground'>{user.location}</span>
                            </span>
                        )}
                        <span className='text-muted-foreground text-xs flex gap-2 items-center mt-2'>
                            Entrou em {formattedJoinDate}.
                        </span>
                    </div>
                </div>
                <hr className='xl:hidden my-7 xl:my-0'></hr>
                <div
                    id='posts'
                    className='w-full xl:bg-card h-[90rem] rounded-2xl xl:border-border xl:border-[1px] xl:shadow-lg'
                ></div>
            </div>
        </div>
    );
}
