import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card";
import { UserProfile } from "@/types/UserProfile";
import { ElementRef, ReactNode } from "react";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { CalendarDays } from "lucide-react";
import { useTimestampConverter } from "@/lib/hooks/useTimestampConvert";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import * as HoverCardPrimitive from "@radix-ui/react-hover-card";
import { cn } from "@/lib/utils";

export default function ProfileHoverCard({
    user,
    children,
    className,
    side,
}: {
    user: UserProfile;
    children: ReactNode;
    className?: string;
    side?: "bottom" | "left" | "right" | "top";
}) {
    const formattedJoinDate = useTimestampConverter(user.created_at);
    return (
        <HoverCard>
            <HoverCardTrigger asChild>{children}</HoverCardTrigger>
            <HoverCardContent side={side} className={cn("bg-card w-72 h-[17rem]", className)}>
                <div
                    id='banner'
                    className='bg-accent dark:bg-accent/60 rounded-t-md absolute w-72 h-[4.5rem] -ml-4 -mt-4'
                >
                    {user.banner_id && (
                        <Image
                            width={300}
                            height={100}
                            src={`/api/users/${user.username}/banner`}
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
                    <Badge className='rounded-sm bg-accent dark:bg-accent/60' variant={"secondary"}>
                        {user.profile == "Member" ? "Membro" : "Dono de .academia."}
                    </Badge>
                </div>
                <div
                    id='content'
                    className='absolute w-72 h-[calc((14rem-4.5rem)+2rem)] -ml-4 mt-[3.5rem] rounded-b-md px-5 pt-9'
                >
                    <h3 className='text-[13px] text-muted-foreground'>{user.username}</h3>
                    <h2 className='font-semibold'>{user.display_name}</h2>
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
                    <Avatar className='w-full h-full object-cover rounded-xl'>
                        <AvatarImage
                            src={`/api/users/${user.username}/avatar`}
                            className=''
                        ></AvatarImage>
                        <AvatarFallback className='w-full h-full object-cover rounded-xl'>
                            {user.username.slice(0, 2)}
                        </AvatarFallback>
                    </Avatar>
                </div>
            </HoverCardContent>
        </HoverCard>
    );
}
