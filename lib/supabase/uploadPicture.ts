import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { Dispatch, SetStateAction } from "react";

export const uploadPicture = async (
    files: any, //arqvuios
    username: string | undefined, //para fazer o select com o username
    setFiles: Dispatch<SetStateAction<any>>, //para resetar os arquivos ao terminar
    setDialogOpen: Dispatch<SetStateAction<boolean>>, //para fechar o dialog no sucesso
    setLoading: Dispatch<SetStateAction<boolean>>
) => {
    const picture = files[0];
    const supabase = createClientComponentClient();

    try {
        setLoading(true);

        //tentar baixar a foto com o username
        const { data, error } = await supabase.storage.from("avatars").download(`${username}.png`);
        //se ocorrer um erro (foto nao existe)
        if (error) {
            //crie uma foto nova
            const { data, error } = await supabase.storage
                .from("avatars")
                .upload(`${username}.png`, picture.file);
            if (error) {
                console.log(error);
            } else {
                console.log("Foto nova criada, sem nenhuma pré-existente", data);
                setDialogOpen(false);
            }
            setFiles([]);
        } else {
            //atualize a foto existente
            const { data, error } = await supabase.storage
                .from("avatars")
                .update(`${username}.png`, picture.file);
            if (error) {
                console.log(error);
            } else {
                console.log("Foto atualizada", data);
                setDialogOpen(false);
            }
            setFiles([]);
        }
    } finally {
        setLoading(false);
    }
};
