"use client";

import { Button } from "@/components/ui/button";
import { DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useState, Dispatch, SetStateAction } from "react";
import { useDropzone } from "react-dropzone";
import { Loader2, PlusCircle, UploadCloud } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import Image from "next/image";
import { UserProfile } from "@/lib/supabase/getProfile";
import { Badge } from "@/components/ui/badge";
import { LogOut } from "lucide-react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { uploadPicture } from "@/lib/supabase/uploadPicture";

type UploadStages = "selectpic" | "reviewpic";

type UploadUiProps = {
    setFiles: Dispatch<SetStateAction<any>>;
    files: File[];
    setUploadStage: Dispatch<SetStateAction<UploadStages>>;
    displayUser: UserProfile | null;
};

function DropArea({ setFiles, setUploadStage }: UploadUiProps) {
    const { toast } = useToast();

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        accept: {
            "image/*": [".png", ".jpg", ".jpeg"],
        },
        maxSize: 10485760,
        maxFiles: 1,
        onDropAccepted: (acceptedFiles) => acceptedFile(acceptedFiles),
        onDropRejected: () => rejectedFile(),
    });

    function acceptedFile(acceptedFiles: any) {
        setFiles(
            acceptedFiles.map((file: any) => ({
                url: URL.createObjectURL(file),
                file: file,
            }))
        );
        setUploadStage("reviewpic");
    }

    function rejectedFile() {
        toast({
            title: "Arquivo rejeitado",
            description: "Você só pode enviar imagens png ou jpg de até 3MB.",
            variant: "destructive",
        });
    }

    return (
        <div
            className='flex items-center justify-center w-full'
            {...getRootProps({ onClick: (event) => event.stopPropagation() })}
        >
            <label
                htmlFor='dropzone-file'
                className='flex flex-col items-center justify-center w-full h-64 
                border-2 border-border border-dashed 
                rounded-lg cursor-pointer bg-accent/50 dark:hover:bg-bray-800 hover:bg-accent'
            >
                <div className='flex flex-col items-center justify-center pt-5 pb-6'>
                    {!isDragActive ? (
                        <>
                            <UploadCloud className='scale-125 mb-2' />
                            <p className='mb-2 text-sm text-gray-500 dark:text-gray-400'>
                                <span className='font-semibold'>Clique para enviar</span> ou arraste
                                e solte
                            </p>
                            <p className='text-xs text-gray-500 dark:text-gray-400'>
                                PNG ou JPG (Tamanho máximo: 10mb)
                            </p>
                        </>
                    ) : (
                        <>
                            <PlusCircle className='scale-125 mb-2' />
                            <p className='mb-2 text-sm text-gray-500 dark:text-gray-400'>
                                <span className='font-semibold'>Solte o arquivo aqui.</span>
                            </p>
                        </>
                    )}
                </div>
                <input id='dropzone-file' type='file' className='hidden' {...getInputProps()} />
            </label>
        </div>
    );
}

function ReviewPic({ files, displayUser }: UploadUiProps) {
    return (
        <>
            <div className='relative p-4 border-border border-[1px] rounded-lg bg-gradient-to-b from-transparent to-border/20'>
                <div id='banner' className='w-full h-32 bg-accent rounded-t-2xl'></div>
                <div
                    id='pfp'
                    className='z-[1] absolute w-28 h-28 rounded-full bg-card 
                -translate-y-[50%] ml-0 border-background border-[5px] overflow-hidden object-cover'
                >
                    {files.map((file: any, index: number) => (
                        <Image
                            width={300}
                            height={300}
                            src={file.url}
                            alt=''
                            key={index}
                            className='w-full h-full object-cover'
                        />
                    ))}
                </div>
                <div
                    id='actions'
                    className='absolute w-[calc(100%-1rem*2)] mt-3 lg:mt-7 h-10 flex gap-2 justify-end'
                >
                    <Button variant={"outline"}>Editar perfil</Button>
                    <Button size={"icon"} variant={"outline"}>
                        <LogOut className='scale-75' />
                    </Button>
                </div>
                <div id='topinfo' className='w-full h-auto flex flex-col pl-2 mt-12 py-5  gap-1'>
                    <h1 className='text-2xl tracking-tight font-semibold flex items-center'>
                        {displayUser?.first_name}
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
        </>
    );
}

export default function UploadUI({
    displayUser,
    setDialogOpen,
}: {
    displayUser: UserProfile | null;
    setDialogOpen: Dispatch<SetStateAction<boolean>>;
}) {
    const [uploadStage, setUploadStage] = useState<UploadStages>("selectpic");
    const [files, setFiles] = useState<File[]>([]);
    const [loading, setLoading] = useState(false);
    const supabase = createClientComponentClient();

    function handleBackstage() {
        setFiles([]);
        setUploadStage("selectpic");
    }

    return (
        <>
            <DialogHeader>
                <DialogTitle>
                    {uploadStage == "selectpic"
                        ? "Envie uma foto de perfil"
                        : "Gostou do resultado?"}
                </DialogTitle>
                <DialogDescription>
                    {uploadStage == "selectpic"
                        ? "Altere a sua foto de perfil aqui. Clique em salvar alterações quando estiver pronto."
                        : "Se a prévia do perfil atingiu as suas expectativas, clique em salvar."}
                </DialogDescription>
            </DialogHeader>
            {!loading ? (
                uploadStage == "selectpic" ? (
                    <DropArea
                        setFiles={setFiles}
                        files={files}
                        setUploadStage={setUploadStage}
                        displayUser={displayUser}
                    />
                ) : (
                    <ReviewPic
                        setFiles={setFiles}
                        files={files}
                        setUploadStage={setUploadStage}
                        displayUser={displayUser}
                    />
                )
            ) : (
                <div className='w-full h-64 flex items-center justify-center border-border border-[1px] rounded-lg bg-gradient-to-b from-transparent to-border/20'>
                    <Loader2 className='animate-spin w-10 h-10' />
                </div>
            )}
            <DialogFooter>
                {uploadStage == "reviewpic" && (
                    <>
                        <Button variant={"ghost"} onClick={() => handleBackstage()}>
                            Escolher outra foto
                        </Button>
                        <Button
                            type='submit'
                            onClick={() =>
                                uploadPicture(
                                    files,
                                    displayUser?.username,
                                    setFiles,
                                    setDialogOpen,
                                    setLoading
                                )
                            }
                        >
                            Salvar alterações
                        </Button>
                    </>
                )}
            </DialogFooter>
        </>
    );
}
