"use client";

import { LoginForm } from "@/components/Auth/Login/LoginForm";
import { Dispatch, SetStateAction } from "react";
import { supabase } from "../supabase";
import { toast } from "@/components/ui/use-toast";
import { Loader2 } from "lucide-react";

type LoginProps = {
    userData: LoginForm;
    setLoading: Dispatch<SetStateAction<boolean>>;
    router: any;
};
export async function LogIn({ userData, setLoading, router }: LoginProps) {
    setLoading(true);

    const { data, error } = await supabase.auth.signInWithPassword({
        email: userData.email,
        password: userData.password,
    });

    if (error) {
        toast({
            title: error.name,
            description: error.message,
            variant: "destructive",
        });
    } else {
        toast({
            title: "Você entrou com sucesso!",
            description: "Aguarde o redirecionamento.",
        });

        setTimeout(() => {
            router.push("/account");
        }, 1000);
    }

    setLoading(false);
}