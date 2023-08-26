import { Button } from "@/components/ui/button";
import { Dumbbell, LogOut, UserPlus2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";
import { UserProfile } from "@/types/UserProfile";

export function ProfilePreview({ displayUser }: { displayUser: UserProfile | null }) {
    return (
        <div className='relative'>
            <div id='banner' className='w-full h-20 bg-accent rounded-t-lg'>
                {displayUser && (
                    <Image
                        width={1500}
                        height={700}
                        src={displayUser.banner_url as string}
                        alt=''
                        key={1}
                        className='w-full h-full object-cover rounded-t-2xl'
                    />
                )}
            </div>
            <div
                id='pfp'
                className='z-[1] absolute w-20 h-20 rounded-full bg-card 
                -translate-y-[50%] ml-0 border-background border-[5px] overflow-hidden object-cover'
            >
                {displayUser && (
                    <Image
                        width={300}
                        height={300}
                        src={displayUser.avatar_url}
                        alt=''
                        key={1}
                        className='w-full h-full object-cover'
                    />
                )}
            </div>
        </div>
    );
}
