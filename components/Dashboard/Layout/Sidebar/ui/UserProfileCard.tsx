import { ModeToggle } from "@/components/ModeToggle";
import { UserProfile } from "@/types/UserProfile";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card";
import { Badge } from "@/components/ui/badge";
import { CalendarDays } from "lucide-react";
import { useRouter } from "next/navigation";
import { useTimestampConverter } from "@/lib/hooks/useTimestampConvert";
import { useState } from "react";
import UserLogo from "../../../../public/user.png";
import Image from "next/image";
import Link from "next/link";

type UserProfileCardProps = {
    displayUser: UserProfile | null;
    screenWidth: number;
};

export default function UserProfileCard({ displayUser, screenWidth }: UserProfileCardProps) {
    const [open, setOpen] = useState(false);
    const router = useRouter();
    const formattedJoinDate = useTimestampConverter(displayUser?.created_at);

    return (
        <>
            <HoverCard openDelay={100}>
                <HoverCardTrigger>
                    <Link href={"/dashboard/profile"}>
                        <div className='flex items-center justify-between py-5 px-5'>
                            <div className='flex flex-row items-center gap-4'>
                                <div className='w-11 h-11 bg-card rounded-md overflow-hidden'>
                                    {displayUser && (
                                        <Image
                                            width={100}
                                            height={100}
                                            alt=''
                                            className='w-full h-full object-cover'
                                            src={displayUser.avatar_url}
                                        />
                                    )}
                                </div>
                                <div>
                                    <h3 className='text-sm font-semibold'>
                                        {displayUser?.display_name}
                                    </h3>
                                    <h3 className='relative text-sm text-muted-foreground w-[10rem] truncate'>
                                        {displayUser?.username}
                                    </h3>
                                </div>
                            </div>
                            <ModeToggle side='top' />
                        </div>
                    </Link>
                </HoverCardTrigger>
                <HoverCardContent
                    className='mx-2 mb-2 bg-background w-72 h-[17rem]'
                    side={screenWidth >= 750 ? "right" : "top"}
                    align='center'
                >
                    <div
                        id='banner'
                        className='bg-accent dark:bg-accent/60 rounded-t-md absolute w-72 h-[4.5rem] -ml-4 -mt-4'
                    >
                        {displayUser && displayUser.banner_url !== null && (
                            <Image
                                width={300}
                                height={100}
                                src={displayUser.banner_url as string}
                                alt=''
                                key={1}
                                className='w-full h-full object-cover rounded-t-md'
                            />
                        )}
                    </div>
                    <div
                        id='badgeholder'
                        className='absolute w-[16rem] h-auto mt-[4.5rem] flex justify-end'
                    >
                        <Badge
                            className='rounded-sm bg-accent dark:bg-accent/60'
                            variant={"secondary"}
                        >
                            {displayUser?.profile == "Member" ? "Membro" : "Dono de .academia."}
                        </Badge>
                    </div>
                    <div
                        id='content'
                        className='absolute w-72 h-[calc((14rem-4.5rem)+2rem)] -ml-4 mt-[3.5rem] rounded-b-md px-5 pt-9'
                    >
                        <h3 className='text-[13px] text-muted-foreground'>
                            {displayUser?.username}
                        </h3>
                        <h2 className='font-semibold'>{displayUser?.display_name}</h2>
                        <p className='text-sm text-muted-foreground max-h-10 overflow-hidden truncate'>
                            • Lorem ipsum dolor, sit amet consectetur adipisicing elit. Fugiat error
                            velit quo explicabo expedita, aut nesciunt voluptatibus quia tenetur.
                        </p>
                        <hr className='mt-3'></hr>
                        <div className='flex flex-col mt-3'>
                            <div className='flex gap-2'>
                                <Badge
                                    className='rounded-sm bg-accent dark:bg-accent/60'
                                    variant={"secondary"}
                                >
                                    0 Seguidores
                                </Badge>
                                <Badge
                                    className='rounded-sm bg-accent dark:bg-accent/60'
                                    variant={"secondary"}
                                >
                                    0 Seguindo
                                </Badge>
                            </div>
                            <p className='text-muted-foreground text-[13px] flex items-center mt-2 gap-2'>
                                <CalendarDays className='inline-block scale-75' /> Entrou em{" "}
                                {formattedJoinDate}.
                            </p>
                        </div>
                    </div>
                    <div
                        id='pfp'
                        className='w-14 h-14 bg-card mt-7 border-border border-[1px] absolute z-[1] rounded-xl overflow-hidden'
                    >
                        {displayUser && (
                            <Image
                                width={100}
                                height={100}
                                alt=''
                                className='w-full h-full object-cover'
                                src={displayUser.avatar_url}
                            />
                        )}
                    </div>
                </HoverCardContent>
            </HoverCard>
        </>
    );
}
