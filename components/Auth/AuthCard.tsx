"use client";

import { useState } from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "../ui/card";
import RegisterGymOwnerForm from "./Register/RegisterGymOwnerForm";
import RegistrationFormProvider from "./Register/RegistrationFormProvider";
import LoginForm from "./Login/LoginForm";

export type AuthState = "login" | "register";

export default function AuthCard() {
    const [authState, setAuthState] = useState<AuthState>("login");

    return (
        <Card>
            <CardHeader>
                <CardTitle>{authState == "login" ? "Entrar" : "Registrar"}</CardTitle>
                <CardDescription>
                    {authState == "login"
                        ? "Preencha os campos abaixo para fazer login no aplicativo"
                        : "Preencha os campos abaixo para registrar-se no aplicativo"}
                </CardDescription>
                <div className='w-full h-[1px] bg-muted-foreground/20'></div>
            </CardHeader>
            <CardContent>
                {authState == "login" ? <LoginForm /> : <RegistrationFormProvider />}
            </CardContent>
            <CardFooter>
                <p className='text-sm text-muted-foreground'>
                    {authState == "login"
                        ? "Ainda não possui uma conta? "
                        : "Já possui uma conta? "}
                    <button
                        className='underline text-foreground'
                        onClick={() => setAuthState(authState == "login" ? "register" : "login")}
                    >
                        {authState == "login" ? "Registre-se" : "Entrar"}
                    </button>
                </p>
            </CardFooter>
        </Card>
    );
}
