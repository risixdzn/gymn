"use client";

import { Button } from "@/components/ui/button";
import {
    Card,
    CardDescription,
    CardContent,
    CardHeader,
    CardTitle,
    CardFooter,
} from "@/components/ui/card";
import { z } from "zod";
import { useState, useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { ArrowRight, Loader2 } from "lucide-react";
import axios from "axios";
import { toast } from "@/components/ui/use-toast";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";

const verifyInviteSchema = z.object({
    username: z
        .string()
        .min(3, { message: "O nome de usuário não pode ser tão curto" })
        .max(30, { message: "O nome de usuário não pode ser tão longo" })
        .refine((x) => /^[a-zA-Z0-9]*$/.test(x), {
            message: "O nome de usuário não pode conter caracteres especiais.",
        }),
    password: z
        .string()
        .min(6, { message: "A senha deve ter no mínimo 6 caracteres" })
        .max(40, { message: "A senha deve ser menor." })
        .refine((x) => /^(?=.*[a-z])/.test(x) || "A senha deve conter uma letra minúscula.")
        .refine((x) => /^(?=.*[A-Z])/.test(x) || "A senha deve conter uma letra maiúscula.")
        .refine((x) => /^(?=.*[0-9])/.test(x) || "A senha deve conter um número."),
});

export default function VerifyInvite() {
    const [loading, setLoading] = useState<boolean>(false);
    const access_token = useRef<string | null>(null);

    const form = useForm<z.infer<typeof verifyInviteSchema>>({
        resolver: zodResolver(verifyInviteSchema),
        defaultValues: {
            username: "",
            password: "",
        },
        mode: "all",
    });

    const { formState } = form;
    const searchParams = useSearchParams();

    const router = useRouter();

    const onSubmit = async (values: z.infer<typeof verifyInviteSchema>) => {
        setLoading(true);
        const body = {
            ...values,
            access_token: access_token.current,
            email: searchParams.get("email"),
        };
        try {
            const update = await axios.post(`/api/affiliates/verify`, body);
            if (update.status !== 200) {
                toast({
                    title: "Erro ao atualizar dados",
                    description: "Algo inesperado aconteceu.",
                    variant: "destructive",
                });
                console.log(update);
            } else {
                toast({
                    title: "Dados atualizados",
                    description: `Você será redirecionado em alguns segundos!`,
                    variant: "success",
                });
            }
            setLoading(false);
            router.push("/dashboard/profile");
        } catch (error) {
            console.log(error);
            setLoading(false);
        }
        console.log(values);
        setLoading(false);
    };

    useEffect(() => {
        const fragment = Object.fromEntries(new URLSearchParams(window.location.hash.slice(1)));
        const accessToken = fragment.access_token;
        access_token.current = accessToken;
    }, []);

    return (
        <main className='flex min-h-screen flex-col justify-center items-center bg-loginBGWhite dark:bg-loginBGDark bg-cover bg-center'>
            <Card className='max-w-md'>
                <CardHeader>
                    <CardTitle>Você está dentro!</CardTitle>
                    <CardDescription>
                        Você agora pode utilizar o Gymn. Mas antes, complete o seu cadastro
                        preenchendo as informações abaixo.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <Form {...form}>
                        <form
                            id='verifyinfo'
                            onSubmit={form.handleSubmit(onSubmit)}
                            className='space-y-4'
                        >
                            <FormField
                                control={form.control}
                                name='username'
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Nome de usuário</FormLabel>
                                        <FormControl>
                                            <Input placeholder='risixdzn' {...field} />
                                        </FormControl>
                                        <FormDescription>
                                            Username, assim como o do seu Instagram.
                                        </FormDescription>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name='password'
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Senha</FormLabel>
                                        <FormControl>
                                            <Input
                                                type='password'
                                                placeholder='••••••••'
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormDescription>
                                            A sua senha para entrar no app.
                                        </FormDescription>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </form>
                    </Form>
                </CardContent>

                <CardFooter>
                    <Button
                        disabled={loading || !formState.isValid}
                        type='submit'
                        form='verifyinfo'
                        className='w-full'
                    >
                        {loading && <Loader2 className='w-4 h-4 animate-spin inline-block mr-1' />}
                        Finalizar
                        {!loading && <ArrowRight className='w-4 h-4  inline-block ml-1' />}
                    </Button>
                </CardFooter>
            </Card>
        </main>
    );
}
