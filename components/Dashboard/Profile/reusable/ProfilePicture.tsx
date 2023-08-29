import { ProfilePictureBannerProps } from "../PersonalProfile";
import { cn } from "@/lib/utils";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Edit, X } from "lucide-react";
import UploadUI from "../Upload/UploadUI";
import Image from "next/image";
export function ProfilePicture({
    className,
    dialogOpen,
    setDialogOpen,
    displayUser,
    refetchUser,
    ableToEdit,
}: ProfilePictureBannerProps) {
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
                        <div className='hover:opacity-100 opacity-0 w-full h-full bg-black/70 rounded-2xl transition-all absolute flex flex-col gap-2 items-center justify-center text-white'>
                            <Edit className='xl:scale-150 drop-shadow-lg pointer-events-none' />
                            <p className='text-sm drop-shadow-lg  pointer-events-none'>Alterar</p>
                        </div>
                    )}
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
