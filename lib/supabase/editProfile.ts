import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { UserCanEdit } from "@/components/Dashboard/Profile/Edit/EditForm";
import { Dispatch, SetStateAction } from "react";
import errorMap from "zod/lib/locales/en";

type useEditProfileProps = {
    editedData: Partial<UserCanEdit>;
    userId: string;
    setLoading: Dispatch<SetStateAction<boolean>>;
    toast: any;
};

export async function editProfile({ editedData, userId, setLoading, toast }: useEditProfileProps) {
    const supabase = createClientComponentClient();

    try {
        setLoading(true);
        let { data, error } = await supabase
            .from("users")
            .update(editedData)
            .eq("id", userId)
            .select();
        if (error) {
            console.log(error);
            toast({
                title: error.message,
                description: error.details,
            });
        }
        if (data) {
            console.log(data);
            toast({
                title: "Alterações salvas.",
                description: "Você pode observar as novas informações na pagina de perfil.",
                variant: "success",
            });
        }
    } catch (error) {
        throw error;
    } finally {
        setLoading(false);
    }
}
