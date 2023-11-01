"use client";

import { LoginForm } from "@/components/Auth/Login/LoginForm";
import { Dispatch, SetStateAction } from "react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { toast } from "@/components/ui/use-toast";
import { translatedErrors } from "../supabase/errors";

type LoginProps = {
    userData: LoginForm;
    setLoading: Dispatch<SetStateAction<boolean>>;
    router: any;
    callbackUrl: string | null;
};
export async function LogIn({ userData, setLoading, router, callbackUrl }: LoginProps) {
    setLoading(true);

    const supabase = createClientComponentClient();

    const { data, error } = await supabase.auth.signInWithPassword({
        email: userData.email,
        password: userData.password,
    });

    if (error) {
        const errorStatus = error.status || 0;
        const translatedError = translatedErrors[errorStatus];

        const errTitle = translatedError ? translatedError.title : error.name;
        const errDescription = translatedError ? translatedError.description : error.message;

        toast({
            title: `${errTitle}`,
            description: errDescription,
            variant: "destructive",
        });
    } else {
        toast({
            title: "Você entrou com sucesso!",
            description: "Aguarde o redirecionamento.",
            variant: "success",
        });
        if (callbackUrl) {
            router.push(callbackUrl);
        } else {
            router.push("/dashboard/profile");
        }
    }

    setLoading(false);
}
