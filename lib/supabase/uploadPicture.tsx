import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { Dispatch, SetStateAction } from "react";
import imageCompression from "browser-image-compression";
import { toast } from "@/components/ui/use-toast";
import { ToastAction } from "@/components/ui/toast";
import { useRouter } from "next/navigation";

type uploadPictureProps = {
    files: any; //arqvuios
    username: string | undefined; //para fazer o select com o username
    userId: string | undefined;
    setFiles: Dispatch<SetStateAction<any>>; //para resetar os arquivos ao terminar
    setDialogOpen: Dispatch<SetStateAction<boolean>>; //para fechar o dialog no sucesso
    setLoading: Dispatch<SetStateAction<boolean>>;
    refetchUser: Function;
    uploadingTo: "avatars" | "banners";
};

export const uploadPicture = async ({
    files,
    username,
    userId,
    setFiles,
    setDialogOpen,
    setLoading,
    refetchUser,
    uploadingTo,
}: uploadPictureProps) => {
    const picture = files[0];
    const supabase = createClientComponentClient();

    try {
        setLoading(true);
        const compressedImage = await imageCompression(picture.file, {
            maxSizeMB: uploadingTo == "avatars" ? 1 : 2,
            maxWidthOrHeight: uploadingTo == "avatars" ? 1920 : 2580,
            fileType: "image/webp",
        });
        //verificar se o usuário tem um avatar ou banner
        const { data } = await supabase.from(uploadingTo).select("*").eq("owner_id", userId);
        console.log("Fetched", typeof data, data);
        //se data lenght = 0 (foto nao existe)
        if (data?.length == 0) {
            console.clear();
            console.log("Foto nao encontrada, enviando uma nova foto.");
            //crie uma foto nova
            const { data, error } = await supabase.storage
                .from(uploadingTo)
                .upload(`${username}`, compressedImage);
            if (error) {
                console.log(error);
            } else {
                console.log("Foto nova criada, sem nenhuma pré-existente", data);
                setDialogOpen(false);
                toast({
                    variant: "success",
                    title: "Imagem atualizada",
                    description: "Atualize a pagina para exibir as alterações.",
                    action: (
                        <ToastAction onClick={() => window.location.reload()} altText='Atualizar'>
                            Atualizar
                        </ToastAction>
                    ),
                });
            }
            setFiles([]);
            refetchUser();
        } else {
            console.clear();
            //atualize a foto existente
            const { data, error } = await supabase.storage
                .from(uploadingTo)
                .update(`${username}`, compressedImage);
            if (error) {
                console.log(error);
            } else {
                console.log("Foto atualizada", data);
                setDialogOpen(false);
                toast({
                    variant: "success",
                    title: "Imagem atualizada",
                    description: "Atualize a pagina para exibir as alterações.",
                    action: (
                        <ToastAction onClick={() => window.location.reload()} altText='Atualizar'>
                            Atualizar
                        </ToastAction>
                    ),
                });
            }
            setFiles([]);
            refetchUser();
        }
    } finally {
        setLoading(false);
    }
};
