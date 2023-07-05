"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

export default function RegForm() {
    const schema = z
        .object({
            email: z.string().email("Este não é um email valido."),
            username: z
                .string()
                .min(2, { message: "O nome de usuário deve ser maior." })
                .max(30, { message: "O nome de usuário deve ser menor." }),
            password: z
                .string()
                .min(6, { message: "A senha deve conter 6 ou mais caracteres." })
                .max(35, { message: "A senha deve ser menor." })
                .refine(
                    (value) => /^(?=.*[a-z])/.test(value),
                    "A senha deve conter uma letra minuscula."
                )
                .refine(
                    (value) => /^(?=.*[A-Z])/.test(value),
                    "A senha deve conter uma letra maiúscula."
                )
                .refine((value) => /^(?=.*[0-9])/.test(value), "A senha deve conter um número."),
            confirmPassword: z.string(),
            gymName: z
                .string()
                .min(2, { message: "O nome da academia deve ser maior" })
                .max(35, { message: "O nome da academia deve ser menor" }),
            gymAddress: z.string().min(2).max(65),
        })
        .refine((data) => data.password == data.confirmPassword, {
            message: "As senhas não sao iguais.",
            path: ["confirmPassword"],
        });

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<z.infer<typeof schema>>({ resolver: zodResolver(schema), mode: "all" });

    const submitData = (data: z.infer<typeof schema>) => {
        console.log("This is the user data", data);
    };

    return (
        <form onSubmit={handleSubmit(submitData)} noValidate>
            <Label htmlFor='email'>Email</Label>
            <Input
                placeholder='exemplo@email.com'
                id='email'
                type='email'
                className='mt-2'
                {...register("email")}
            ></Input>
            {errors.email && (
                <p className='text-xs text-destructive mt-2'>{errors.email.message}</p>
            )}

            <Label htmlFor='username'>Nome de usuário</Label>
            <Input
                placeholder='John Doe'
                id='username'
                type='text'
                className='mt-2'
                {...register("username")}
            ></Input>
            <p className='text-xs text-muted-foreground mt-2'>Este será seu nome de exibição</p>
            {errors.username && (
                <p className='text-xs text-destructive mt-2'>{errors.username.message}</p>
            )}

            <Label htmlFor='password'>Senha</Label>
            <Input
                placeholder='••••••••'
                id='password'
                type='password'
                className='mt-2'
                {...register("password")}
            ></Input>
            {errors.password && (
                <p className='text-xs text-destructive mt-2'>{errors.password.message}</p>
            )}

            <Label htmlFor='confirmPassword'>Confirme a senha</Label>
            <Input
                placeholder='••••••••'
                id='confirmPassword'
                type='password'
                className='mt-2'
                {...register("confirmPassword")}
            ></Input>
            {errors.confirmPassword && (
                <p className='text-xs text-destructive mt-2'>{errors.confirmPassword.message}</p>
            )}

            <Label htmlFor='gymName'>Nome da academia</Label>
            <Input
                placeholder='Example Fitness'
                id='gymName'
                type='text'
                className='mt-2'
                {...register("gymName")}
            ></Input>
            {errors.gymName && (
                <p className='text-xs text-destructive mt-2'>{errors.gymName.message}</p>
            )}

            <Label htmlFor='gymAddress'>Endereço da academia</Label>
            <Input
                placeholder='Av. Paulista, 735'
                id='gymAddress'
                type='text'
                className='mt-2'
                {...register("gymAddress")}
            ></Input>
            {errors.gymAddress && (
                <p className='text-xs text-destructive mt-2'>{errors.gymAddress.message}</p>
            )}

            <Button className='w-full mt-5' type='submit'>
                Próximo
            </Button>
        </form>
    );
}
