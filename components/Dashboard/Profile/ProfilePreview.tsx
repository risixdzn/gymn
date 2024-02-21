import { Button } from "@/components/ui/button";
import { Dumbbell, LogOut, UserPlus2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";
import { UserProfile } from "@/types/UserProfile";
import nullimg from "@/public/null.png";

export function ProfilePreview({ user }: { user: UserProfile | null }) {
    return (
        <div className='relative'>
            <div id='banner' className='w-full h-20 bg-accent rounded-t-lg'>
                <Image
                    width={1500}
                    height={700}
                    src={`/api/users/${user?.username}/banner` || nullimg}
                    alt=''
                    key={1}
                    className='w-full h-full object-cover rounded-t-lg'
                />
            </div>
            <div
                id='pfp'
                className='z-[1] absolute w-20 h-20 rounded-full bg-card 
                -translate-y-[50%] ml-0 border-background border-[5px] overflow-hidden object-cover'
            >
                <Image
                    width={300}
                    height={300}
                    src={`/api/users/${user?.username}/avatar` || nullimg}
                    alt=''
                    key={1}
                    className='w-full h-full object-cover'
                />
            </div>
        </div>
    );
}
