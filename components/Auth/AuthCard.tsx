"use client";

import { createContext, useState, Dispatch, SetStateAction } from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "../ui/card";
import RegistrationFormProvider from "./Register/RegistrationFormProvider";
import LoginForm from "./Login/LoginForm";

export type AuthState = "login" | "register";

export type AuthCardContextType = {
    authState: AuthState;
    setAuthState: Dispatch<SetStateAction<AuthState>>;
};

//esse contexto é exportado aqui para ser utilizado no componente de registro, onde o redirect para login é feito através do authstate
//criar um contexto evita prop drilling e tem impactos positivos em perfomance
export const AuthCardContext = createContext<AuthCardContextType>({
    authState: "login",
    setAuthState: () => {},
});

export default function AuthCard() {
    const [authState, setAuthState] = useState<AuthState>("login");

    return (
        <AuthCardContext.Provider value={{ authState, setAuthState }}>
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
                            onClick={() =>
                                setAuthState(authState == "login" ? "register" : "login")
                            }
                        >
                            {authState == "login" ? "Registre-se" : "Entrar"}
                        </button>
                    </p>
                </CardFooter>
            </Card>
        </AuthCardContext.Provider>
    );
}
