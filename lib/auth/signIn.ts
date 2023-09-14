"use client";

import { LoginForm } from "@/components/Auth/Login/LoginForm";
import { Dispatch, SetStateAction } from "react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { toast } from "@/components/ui/use-toast";
import { Loader2 } from "lucide-react";

type LoginProps = {
    userData: LoginForm;
    setLoading: Dispatch<SetStateAction<boolean>>;
    router: any;
};
export async function LogIn({ userData, setLoading, router }: LoginProps) {
    setLoading(true);

    const supabase = createClientComponentClient();

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

        router.push("/dashboard/profile");
    }

    setLoading(false);
}
