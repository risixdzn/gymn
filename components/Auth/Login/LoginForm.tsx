"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { Label } from "@/components/ui/label";
import { Input, PasswordInput } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { LogIn } from "@/lib/auth/signIn";
import { useRouter } from "next/navigation";

export type LoginForm = {
    email: string;
    password: string;
};

export default function LoginForm() {
    const [loading, setLoading] = useState<boolean>(false);
    const router = useRouter();

    const {
        register,
        handleSubmit,
        formState: { errors, isValid },
    } = useForm<LoginForm>({
        mode: "all",
        defaultValues: {
            email: "",
            password: "",
        },
    });

    const submitData = (userData: LoginForm) => {
        LogIn({ userData, setLoading, router });
        console.log("This is the user data", userData);
    };

    const renderForm = () => {
        return (
            <>
                <Label htmlFor='email'>Email</Label>
                <Input
                    disabled={loading}
                    key={1}
                    placeholder='exemplo@email.com'
                    id='email'
                    type='email'
                    className='mt-2'
                    {...register("email", {
                        required: "Preencha este campo.",
                        pattern: {
                            value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                            message: "Este não é um email valido.",
                        },
                    })}
                ></Input>
                {errors.email && (
                    <p className='text-xs text-destructive mt-2'>{errors.email.message}</p>
                )}
                <div className='mt-2'>
                    <Label htmlFor='password'>Senha</Label>
                    <PasswordInput
                        disabled={loading}
                        key={2}
                        placeholder='••••••••'
                        id='password'
                        className='mt-2'
                        {...register("password", {
                            required: "Preencha este campo.",
                            maxLength: {
                                value: 40,
                                message: "A senha deve ser menor.",
                            },
                        })}
                    />
                </div>
            </>
        );
    };

    const renderButton = () => {
        return (
            <Button className='w-full mt-5' type='submit' disabled={!isValid || loading}>
                <Loader2 className={`${loading ? "block" : "hidden"} mr-2 h-4 w-4 animate-spin`} />
                Entrar
            </Button>
        );
    };

    return (
        <form className='-mt-4' onSubmit={handleSubmit(submitData)} noValidate>
            {renderForm()}
            {renderButton()}
        </form>
    );
}
