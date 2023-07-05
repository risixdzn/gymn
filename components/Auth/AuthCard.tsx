'use client'

import { useState } from "react"
import { Card, CardHeader, CardTitle, CardDescription, CardContent} from "../ui/card"
import AuthForm from "./AuthForm"

export type AuthState = 'login' | 'register'

export default function AuthCard(){
    const [ authState, setAuthState ] = useState<AuthState>('login')

    return(
        <Card>
            <CardHeader>
                <CardTitle>{authState == 'login' ? 'Entrar' : 'Registrar'}</CardTitle>
                <CardDescription>
                    {authState =='login'
                        ?'Preencha os campos abaixo para fazer login no aplicativo'
                        :'Preencha os campos abaixo para registrar-se no aplicativo'
                    }
                </CardDescription>
            </CardHeader>
            <CardContent>
                <AuthForm authState={authState} setAuthState={setAuthState}/>
            </CardContent>
        </Card>
    )
}