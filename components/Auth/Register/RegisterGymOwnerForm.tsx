"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { schema } from "./gymOwnerFormSchema";

export default function RegisterGymOwnerForm() {
    const {
        register,
        handleSubmit,
        formState: { errors, isValid },
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

            <Label htmlFor='firstName'>Primeiro nome</Label>
            <Input
                placeholder='John'
                id='firstName'
                type='text'
                className='mt-2'
                {...register("firstName")}
            ></Input>
            <p className='text-xs text-muted-foreground mt-2'>Este nome não será publico</p>
            {errors.firstName && (
                <p className='text-xs text-destructive mt-2'>{errors.firstName.message}</p>
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

            <Button className='w-full mt-5' type='submit' disabled={!isValid}>
                Próximo
            </Button>
        </form>
    );
}
