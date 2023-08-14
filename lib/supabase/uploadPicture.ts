import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context";
import { Dispatch, SetStateAction } from "react";
import imageCompression from "browser-image-compression";

export const uploadPicture = async (
    files: any, //arqvuios
    username: string | undefined, //para fazer o select com o username
    setFiles: Dispatch<SetStateAction<any>>, //para resetar os arquivos ao terminar
    setDialogOpen: Dispatch<SetStateAction<boolean>>, //para fechar o dialog no sucesso
    setLoading: Dispatch<SetStateAction<boolean>>,
    router: AppRouterInstance,
    refetchUser: Function
) => {
    const picture = files[0];
    const supabase = createClientComponentClient();

    try {
        setLoading(true);
        const compressedImage = await imageCompression(picture.file, {
            maxSizeMB: 1,
            maxWidthOrHeight: 1920,
            fileType: "image/webp",
        });
        //tentar baixar a foto com o username
        const { data, error } = await supabase.storage.from("avatars").download(`${username}`);
        //se ocorrer um erro (foto nao existe)
        if (error) {
            //crie uma foto nova
            const { data, error } = await supabase.storage
                .from("avatars")
                .upload(`${username}`, compressedImage);
            if (error) {
                console.log(error);
            } else {
                console.log("Foto nova criada, sem nenhuma pré-existente", data);
                setDialogOpen(false);
            }
            setFiles([]);
            refetchUser();
        } else {
            //atualize a foto existente
            const { data, error } = await supabase.storage
                .from("avatars")
                .update(`${username}`, compressedImage);
            if (error) {
                console.log(error);
            } else {
                console.log("Foto atualizada", data);
                setDialogOpen(false);
            }
            setFiles([]);
            refetchUser();
        }
    } finally {
        setLoading(false);
    }
};
