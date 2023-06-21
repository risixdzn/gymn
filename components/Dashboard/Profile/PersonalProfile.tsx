import { Edit, CalendarDays, Loader2, LogOut, X, Users2, MapPin, Dumbbell } from "lucide-react";
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
import { Dispatch, SetStateAction, useState, ReactNode } from "react";
import SkeletonProfile from "./SkeletonProfile";
import EditProfile from "./Edit/EditProfile";
import { UserProfile } from "@/types/UserProfile";
import { cn } from "@/lib/utils";

type PersonalProfileProps = {
    router: AppRouterInstance;
    session: Session | null;
};

interface ProfilePictureBannerProps {
    className?: string;
    dialogOpen: boolean;
    setDialogOpen: Dispatch<SetStateAction<boolean>>;
    displayUser: UserProfile | null;
    refetchUser: () => void;
    children?: ReactNode;
}

//USED XL BREAKPOINT ON PROFILE TO AVOID CROWDED SCREEN

function ProfilePicture({
    className,
    dialogOpen,
    setDialogOpen,
    displayUser,
    refetchUser,
}: ProfilePictureBannerProps) {
    return (
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
            <DialogTrigger className='absolute'>
                <div
                    id='pfp'
                    className={cn(
                        `z-[1] absolute w-28 xl:w-48 h-28 xl:h-48 rounded-full  bg-card 
                border-background border-[5px] xl:border-[7.5px] overflow-hidden object-cover`,
                        className
                    )}
                >
                    <div className='hover:opacity-100 opacity-0 w-full h-full bg-black/70 rounded-2xl transition-all absolute flex flex-col gap-2 items-center justify-center text-white'>
                        <Edit className='xl:scale-150 drop-shadow-lg pointer-events-none' />
                        <p className='text-sm drop-shadow-lg  pointer-events-none'>Alterar</p>
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
    );
}

function BannerWithActions({
    className,
    setDialogOpen,
    displayUser,
    refetchUser,
    children,
}: ProfilePictureBannerProps) {
    return (
        <>
            <div
                id='banner'
                className={cn(
                    `w-full h-32 bg-accent rounded-t-2xl xl:h-60 relative overflow-hidden`,
                    className
                )}
            >
                <div className='hover:opacity-100 opacity-0 w-full h-full bg-black/50  transition-all absolute flex flex-row gap-2 items-center justify-center'>
                    <Dialog>
                        <DialogTrigger>
                            <button className='bg-black/50 p-5 rounded-full outline-0 outline-white hover:outline-2 hover:outline-white transition-all text-white'>
                                <Edit className='xl:scale-125 drop-shadow-lg pointer-events-none' />
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

                    <button className='bg-black/50 p-5 rounded-full text-white'>
                        <X className='xl:scale-125 drop-shadow-lg pointer-events-none' />
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
            <div
                id='actions'
                className='w-full h-16 xl:h-20 rounded-b-2xl border-border 
                border-b-0 border-x-0 bg-transparent
                xl:border-b-[1px] xl:border-x-[1px] xl:bg-card
                flex items-center justify-end px-0 xl:px-6 gap-2'
            >
                {children}
            </div>
        </>
    );
}

export default function PersonalProfile({ router, session }: PersonalProfileProps) {
    const { loading, displayUser, refetchUser } = useGetCurrentProfile({ session });
    const formattedJoinDate = useTimestampConverter(displayUser?.created_at);
    const [dialogOpen, setDialogOpen] = useState(false);

    return (
        <>
            {!loading ? (
                <div className='rounded-xl shadow-sm'>
                    <BannerWithActions
                        dialogOpen={dialogOpen}
                        setDialogOpen={setDialogOpen}
                        displayUser={displayUser}
                        refetchUser={refetchUser}
                    >
                        <EditProfile
                            className='xl:hidden'
                            displayUser={displayUser}
                            refetchUser={refetchUser}
                        />
                        <Button
                            onClick={() => SignOut({ router })}
                            size={"icon"}
                            variant={"outline"}
                        >
                            <LogOut className='scale-75' />
                        </Button>
                    </BannerWithActions>
                    <ProfilePicture
                        dialogOpen={dialogOpen}
                        displayUser={displayUser}
                        refetchUser={refetchUser}
                        setDialogOpen={setDialogOpen}
                        className='-translate-y-[calc(4rem+50%)] xl:-translate-y-[calc(5rem+50%)]
                        xl:w-80 xl:h-80 xl:ml-10 xl:border-card shadow-lg'
                    />
                    <div
                        id='content'
                        className='
                        xl:mt-6 xl:grid xl:grid-cols-[20rem_auto] xl:gap-6 xl:pl-10'
                    >
                        <div id='profiledata' className='xl:w-80 xl:pt-20'>
                            <h1
                                id='display_name'
                                className='text-2xl xl:text-3xl tracking-tight font-semibold'
                            >
                                {displayUser?.display_name}
                            </h1>
                            <h3 id='username' className='text-muted-foreground'>
                                {"@" + displayUser?.username}
                                <Badge
                                    id='profile'
                                    className='w-auto bg-accent dark:bg-accent/60 text-foreground mt-2 ml-3'
                                >
                                    {displayUser?.profile == "Member"
                                        ? "Membro"
                                        : "Dono de .academia."}
                                </Badge>
                            </h3>

                            <p
                                id='bio'
                                className='text-sm text-foreground my-4 leading-5 max-h-[80px] overflow-clip whitespace-pre-line'
                            >
                                {displayUser?.bio}
                            </p>
                            <EditProfile
                                width='full'
                                className='w-full bg-card h-9 xl:block hidden'
                                displayUser={displayUser}
                                refetchUser={refetchUser}
                            />
                            <div className='text-muted-foreground flex gap-2 my-4 xl:mt-4 -mt-5'>
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
                                <span className=' text-muted-foreground text-sm flex gap-2 items-center '>
                                    <MapPin className='inline-block scale-75' />
                                    <span className='text-sm text-foreground'>
                                        Av Paulista, 735
                                    </span>
                                </span>
                                <span className='text-muted-foreground text-xs flex gap-2 items-center mt-2'>
                                    Entrou em {formattedJoinDate}.
                                </span>
                            </div>
                        </div>
                        <hr className='xl:hidden my-7 xl:my-0'></hr>
                        <div
                            id='posts'
                            className='w-full xl:bg-card h-[30rem] rounded-2xl xl:border-border xl:border-[1px]'
                        ></div>
                    </div>
                </div>
            ) : (
                <SkeletonProfile />
            )}
        </>
    );
}

{
    /* <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
                        <DialogTrigger className='absolute'>
                            <div
                                id='pfp'
                                className='z-[1] absolute w-28 xl:w-48 h-28 xl:h-48 rounded-full xl:rounded-3xl bg-card 
                    -translate-y-[50%] xl:-translate-y-[15%] ml-0 xl:ml-10 border-background border-[5px] xl:border-[7.5px] overflow-hidden object-cover'
                            >
                                <div className='hover:opacity-100 opacity-0 w-full h-full bg-black/70 rounded-2xl transition-all absolute flex flex-col gap-2 items-center justify-center text-white'>
                                    <Edit className='xl:scale-150 drop-shadow-lg pointer-events-none' />
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
                        className='absolute w-[calc(100%-2.5rem)] xl:w-[calc(100%-5rem)] mt-3 xl:mt-7 h-10 flex gap-2 justify-end'
                    >
                        <EditProfile displayUser={displayUser} refetchUser={refetchUser} />
                        <Button
                            onClick={() => SignOut({ router })}
                            size={"icon"}
                            className='xl:mr-7'
                            variant={"outline"}
                        >
                            <LogOut className='scale-75' />
                        </Button>
                    </div>
                    <div
                        id='topinfo'
                        className='w-full h-auto flex flex-col pl-2 xl:mt-0 mt-10 xl:pl-[calc(12rem+(2.5rem*2))] py-5 xl:py-7 gap-1'
                    >
                        <h1 className='text-2xl xl:text-3xl tracking-tight font-semibold flex items-center'>
                            {displayUser?.display_name}
                            <span className='xl:text-base text-muted-foreground inline-block pl-2 text-sm'>
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
                    </div> */
}
