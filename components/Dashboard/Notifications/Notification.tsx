import { NotificationData } from "@/app/api/notifications/route";
import {
    AlertDialog,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogDescription,
    AlertDialogTrigger,
    AlertDialogAction,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { notificationsInfo } from "@/lib/notifications";
import { timeSince } from "@/lib/utils";
import Link from "next/link";
import { useState } from "react";

export default function Notification({ not }: { not: NotificationData }) {
    const [showAlert, setShowAlert] = useState(false);

    const notText = notificationsInfo[not.event];

    return (
        <div className='w-full flex gap-2 items-center h-auto min-h-32 p-4 bg-g_purple/10 rounded-md'>
            <div className='w-full flex gap-2 relative'>
                <div className='w-2 h-2 rounded-full bg-g_purple top-0 absolute'></div>
                <div className='ml-4 w-14 h-14 rounded-full flex items-center justify-center bg-g_purple/50'>
                    {notText.icon}
                </div>
                <div className='ml-2 flex flex-col gap-1'>
                    <p className='text-xs'>{timeSince(new Date(not.time))}</p>
                    <p>
                        <span className='font-semibold'>Você </span>
                        {notText.event} <span className='font-semibold'> {not.gym?.name}</span>.
                    </p>
                    <p className='text-muted-foreground text-sm'>{notText.description}</p>
                    {not.action && (
                        <div className='flex gap-2 mt-2'>
                            <Link
                                href={notText.action!.true(not.gym!.referral_code)}
                                target='_blank'
                            >
                                <Button variant={"highlight"} className='h-8'>
                                    {notText.action?.true_text}
                                </Button>
                            </Link>
                            <AlertDialog open={showAlert} onOpenChange={setShowAlert}>
                                <AlertDialogTrigger>
                                    <Button variant={"ghost"} className='h-8'>
                                        {notText.action?.false_text}
                                    </Button>
                                </AlertDialogTrigger>
                                <AlertDialogContent>
                                    <AlertDialogHeader>
                                        <AlertDialogTitle>
                                            {notText.action?.false_alert.title}
                                        </AlertDialogTitle>
                                        <AlertDialogDescription>
                                            {notText.action?.false_alert.description}
                                        </AlertDialogDescription>
                                    </AlertDialogHeader>
                                    <AlertDialogFooter>
                                        <AlertDialogCancel>Voltar</AlertDialogCancel>
                                        <Button variant={"destructive"}>
                                            {notText.action?.false_text}
                                        </Button>
                                    </AlertDialogFooter>
                                </AlertDialogContent>
                            </AlertDialog>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
