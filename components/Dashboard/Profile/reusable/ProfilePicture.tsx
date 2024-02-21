import { cn } from "@/lib/utils";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Edit, X } from "lucide-react";
import UploadUI from "../Upload/UploadUI";
import Image from "next/image";
import { UserProfile } from "@/types/UserProfile";
import { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export function ProfilePicture({
    className,
    dialogOpen,
    setDialogOpen,
    user,
    refetchUser,
    ableToEdit,
}: {
    className?: string;
    dialogOpen: boolean;
    setDialogOpen: React.Dispatch<React.SetStateAction<boolean>>;
    user: UserProfile;
    refetchUser: () => void;
    ableToEdit: boolean;
}) {
    return (
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
            <DialogTrigger className='absolute'>
                <div
                    id='pfp'
                    className={cn(
                        `z-[1] w-28 xl:w-48 h-28 xl:h-48 rounded-full bg-card 
                border-background border-[5px] xl:border-[7.5px] overflow-hidden object-cover`,
                        className
                    )}
                >
                    {ableToEdit && (
                        <div className='hover:opacity-100 opacity-0 z-[2] w-full h-full bg-black/70 rounded-2xl transition-all absolute flex flex-col gap-2 items-center justify-center text-white'>
                            <Edit className='xl:scale-150 drop-shadow-lg pointer-events-none' />
                            <p className='text-sm drop-shadow-lg  pointer-events-none'>Alterar</p>
                        </div>
                    )}
                    <Avatar className='w-full h-full object-cover z-[]'>
                        <AvatarImage
                            className='w-full h-full object-cover z-[1]'
                            src={`/api/users/${user.username}/avatar`}
                            alt={`@${user?.username}`}
                        />
                        <AvatarFallback className='text-4xl'>
                            {user?.username?.slice(0, 2).toUpperCase()}
                        </AvatarFallback>
                    </Avatar>
                </div>
            </DialogTrigger>
            <DialogContent>
                <UploadUI
                    user={user}
                    setDialogOpen={setDialogOpen}
                    refetchUser={refetchUser}
                    uploadingTo='avatars'
                />
            </DialogContent>
        </Dialog>
    );
}
