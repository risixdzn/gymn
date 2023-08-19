import { Button } from "@/components/ui/button";
import { LogOut } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";
import { UserProfile } from "@/types/UserProfile";

export function ProfilePreview({ displayUser }: { displayUser: UserProfile | null }) {
    return (
        <div className='relative '>
            <div id='banner' className='w-full h-32 bg-accent rounded-t-2xl'>
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
                className='z-[1] absolute w-28 h-28 rounded-full bg-card 
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
            <div id='actions' className='absolute w-[calc(100%)] mt-3 h-10 flex gap-2 justify-end'>
                <Button variant={"outline"}>Editar perfil</Button>
                <Button size={"icon"} variant={"outline"}>
                    <LogOut className='scale-75' />
                </Button>
            </div>
            <div id='topinfo' className='w-full h-auto flex flex-col pl-2 mt-12 py-5  gap-1'>
                <h1 className='text-2xl tracking-tight font-semibold flex items-center'>
                    {displayUser?.display_name}
                    <span className='text-muted-foreground inline-block pl-2 text-sm'>
                        {"@" + displayUser?.username}
                    </span>
                </h1>
                <span>
                    <Badge className='w-auto'>
                        {displayUser?.profile == "Member" ? "Membro" : "Dono de .academia."}
                    </Badge>
                </span>
            </div>
        </div>
    );
}
