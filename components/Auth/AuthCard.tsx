"use client";

import { useState } from "react";
import {
    Card,
    CardHeader,
    CardTitle,
    CardDescription,
    CardContent,
    CardFooter,
} from "../ui/card";
import RegForm from "./Register/RegisterForm";

export type AuthState = "login" | "register";

export default function AuthCard() {
    const [authState, setAuthState] = useState<AuthState>("register");

    return (
        <Card>
            <CardHeader>
                <CardTitle>
                    {authState == "login" ? "Entrar" : "Registrar"}
                </CardTitle>
                <CardDescription>
                    {authState == "login"
                        ? "Preencha os campos abaixo para fazer login no aplicativo"
                        : "Preencha os campos abaixo para registrar-se no aplicativo"}
                </CardDescription>
            </CardHeader>
            <CardContent>
                {authState == "login" ? <></> : <RegForm />}
            </CardContent>
            <CardFooter>
                <p className="text-sm text-muted-foreground">
                    {authState == "login"
                        ? "Ainda não possui uma conta? "
                        : "Já possui uma conta? "}
                    <button
                        className="underline text-foreground"
                        onClick={() =>
                            setAuthState(
                                authState == "login" ? "register" : "login"
                            )
                        }
                    >
                        {authState == "login" ? "Registre-se" : "Entrar"}
                    </button>
                </p>
            </CardFooter>
        </Card>
    );
}
