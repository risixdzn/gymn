"use client";

import { Button } from "@/components/ui/button";
import { DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useState, Dispatch, SetStateAction } from "react";
import { Loader2 } from "lucide-react";
import { UserProfile } from "@/types/UserProfile";
import { uploadPicture } from "@/lib/supabase/uploadPicture";
import { DropArea } from "./Droparea";
import { ReviewPic } from "./ReviewPic";

export type UploadStages = "selectpic" | "reviewpic";

export default function UploadUI({
    user,
    setDialogOpen,
    refetchUser,
    uploadingTo,
}: {
    user: UserProfile | null;
    setDialogOpen: Dispatch<SetStateAction<boolean>>;
    refetchUser: Function;
    uploadingTo: "avatars" | "banners";
}) {
    const [uploadStage, setUploadStage] = useState<UploadStages>("selectpic");
    const [files, setFiles] = useState<File[]>([]);
    const [loading, setLoading] = useState(false);

    const renderDialogTitle = () => {
        return uploadStage == "selectpic"
            ? `Envie um${uploadingTo == "avatars" ? "a foto de perfil" : " banner"}`
            : "Gostou do resultado?";
    };
    const renderDialogDescription = () => {
        return uploadStage == "selectpic"
            ? `Altere ${
                  uploadingTo == "avatars" ? "a sua foto de perfil" : "o seu banner"
              } aqui. Clique em salvar alterações quando estiver pronto.`
            : "Se a prévia do perfil atingiu as suas expectativas, clique em salvar.";
    };

    const renderDialogFooter = () => {
        return (
            uploadStage == "reviewpic" && (
                <>
                    <Button variant={"ghost"} onClick={() => handleBackstage()}>
                        Escolher outra foto
                    </Button>
                    <Button
                        type='submit'
                        onClick={() =>
                            uploadPicture({
                                files: files,
                                username: user?.username,
                                userId: user?.id,
                                setFiles: setFiles,
                                setDialogOpen: setDialogOpen,
                                setLoading: setLoading,
                                refetchUser: refetchUser,
                                uploadingTo: uploadingTo,
                            })
                        }
                    >
                        Salvar alterações
                    </Button>
                </>
            )
        );
    };

    function handleBackstage() {
        setFiles([]);
        setUploadStage("selectpic");
    }

    return (
        <>
            <DialogHeader>
                <DialogTitle>{renderDialogTitle()}</DialogTitle>
                <DialogDescription>{renderDialogDescription()}</DialogDescription>
            </DialogHeader>
            {!loading ? (
                uploadStage == "selectpic" ? (
                    <DropArea setFiles={setFiles} setUploadStage={setUploadStage} />
                ) : (
                    <ReviewPic files={files} user={user} uploadingTo={uploadingTo} />
                )
            ) : (
                //loader ui
                <div className='w-full h-64 flex items-center justify-center border-border border-[1px] rounded-lg bg-gradient-to-b from-transparent to-border/20 flex-col gap-2'>
                    <Loader2 className='animate-spin w-10 h-10 text-muted-foreground' />
                    <p className='text-sm text-muted-foreground'>Enviando</p>
                </div>
            )}
            <DialogFooter>{renderDialogFooter()}</DialogFooter>
        </>
    );
}
