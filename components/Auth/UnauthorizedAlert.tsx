"use client";

import { useEffect } from "react";
import { useToast } from "../ui/use-toast";

export default function UnauthorizedAlert() {
    const { toast } = useToast();
    useEffect(() => {
        //extrai os cookies, separando-os
        const cookies = document.cookie.split("; ");
        const unauthorizedAction = cookies.find(
            (cookie) => cookie.startsWith("UnauthorizedAction=") // acha o cookie de alerta de verificação
        );

        if (unauthorizedAction?.split("=")[1] === "true") {
            toast({
                variant: "destructive",
                title: "Acesso negado.",
                description: "Crie uma conta ou faça login para acessar esta página.",
            });
        }

        //deleta o cookie nao usado
        document.cookie = "UnauthorizedAction=false; Max-Age=0";
    }, [toast]);
    return true;
}
