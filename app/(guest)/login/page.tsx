'use client'

import { Button } from "@/components/ui/button";
import { supabase } from "@/lib/supabase";
import { useState } from "react";

export default function Login(){
    const [formEmail, setFormEmail] = useState<string>()
    const [formPassword, setFormPassword] = useState<string>()
    const [resetPasswordEmail, setResetPasswordEmail] = useState<string>()

    async function signUp() {
        const { data, error } = await supabase.auth.signUp({
            email: formEmail as string,
            password: formPassword as string,
        })
        console.log(data)
    }

    async function resetPassword() {
        const { data, error } = await supabase.auth.resetPasswordForEmail('contatorisix@gmail.com')
    }

    return(
        <main className="flex min-h-screen flex-col items-center p-24 gap-4">
            <h1>Login</h1>
            <input type='email' placeholder="email" onChange={(e)=> setFormEmail(e.target.value)}></input>
            <input type='password' placeholder="password" onChange={(e)=> setFormPassword(e.target.value)}></input>
            <Button onClick={signUp} variant={"highlight"}>Sign up</Button>
            <button onClick={()=> resetPassword()}>Reset</button>
        </main>
    )
}