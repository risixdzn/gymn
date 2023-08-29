import { ProfilePictureBannerProps } from "../PersonalProfile";
import { cn } from "@/lib/utils";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Edit, X } from "lucide-react";
import UploadUI from "../Upload/UploadUI";
import Image from "next/image";

export function BannerWithActions({
    className,
    setDialogOpen,
    displayUser,
    refetchUser,
    children,
    ableToEdit,
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
                {ableToEdit && (
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
                )}
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
                className='xl:shadow-lg w-full h-16 xl:h-20 rounded-b-2xl border-border 
                border-b-0 border-x-0 bg-transparent
                xl:border-b-[1px] xl:border-x-[1px] xl:bg-card
                flex items-center justify-end px-0 xl:px-6 gap-2'
            >
                {children}
            </div>
        </>
    );
}
