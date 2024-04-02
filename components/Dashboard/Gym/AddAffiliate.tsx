import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2, Plus } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { supabase } from "@/lib/supabase";
import { toast } from "@/components/ui/use-toast";
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
import { useSession } from "@/lib/supabase/useSession";
import axios from "axios";
import { useQueryClient } from "@tanstack/react-query";

const addAffiliateFormSchema = z.object({
    display_name: z
        .string()
        .min(2, { message: "O nome não pode ser tão curto" })
        .max(25, { message: "O nome não pode ser tão longo" })
        .refine((x) => /^[a-zA-Z0-9_ äëiöüÄËÏÖÜáéíóúÁÉÍÓÚãõñÃÕÑâêîôûÂÊÎÔÛ]*$/.test(x), {
            message: "O nome não pode conter caracteres especiais.",
        }),
    email: z.string().email({ message: "Insira um email válido" }),
});

export default function AddAffiliate() {
    const [loading, setLoading] = useState<boolean>(false);
    const [open, setOpen] = useState<boolean>(false);

    const form = useForm<z.infer<typeof addAffiliateFormSchema>>({
        resolver: zodResolver(addAffiliateFormSchema),
        defaultValues: {
            display_name: "",
            email: "",
        },
        mode: "all",
    });

    const { formState } = form;

    const session = useSession();
    const queryClient = useQueryClient();

    async function onSubmit(values: z.infer<typeof addAffiliateFormSchema>) {
        setLoading(true);
        const { data } = await supabase.rpc("check_email_exists", {
            email_param: values.email.toLowerCase(),
        });

        if (data === false) {
            const gym = await axios.get(`/api/gym`);
            const metadata = {
                gym_id: gym.data.data.id,
                gym_name: gym.data.data.name,
                inviter: session?.user.user_metadata.username,
                display_name: values.display_name,
                email: values.email,
                profile: "Member",
            };

            const invite = await axios.post(`/api/affiliates/invite`, metadata);

            if (invite.status !== 200) {
                toast({
                    title: "Erro ao convidar usuário",
                    description: "Algo inesperado aconteceu.",
                    variant: "destructive",
                });
            } else {
                toast({
                    title: "Usuário cadastrado",
                    description: `Um convite foi enviado para ${values.email}`,
                    variant: "success",
                });
                setOpen(false);
                setLoading(false);
                queryClient.refetchQueries(["affiliates"]);
            }
        } else {
            toast({
                title: "Este usuário ja existe.",
                description: "Tente utilizar outro email, ou entre na página de login.",
                variant: "destructive",
            });
            setLoading(false);
        }
        setLoading(false);
    }
    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button className='whitespace-nowrap w-full md:w-auto'>
                    <Plus className='w-4 h-4 inline-block mr-1' /> Cadastrar aluno
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Cadastrar aluno</DialogTitle>
                    <DialogDescription>
                        Preencha as informações abaixo para <b>cadastrar</b> um aluno no Gymn e{" "}
                        <b>afiliá-lo</b> a sua academia.
                    </DialogDescription>
                </DialogHeader>
                <Form {...form}>
                    <form
                        id='addaffiliate'
                        onSubmit={form.handleSubmit(onSubmit)}
                        className='space-y-4'
                    >
                        <FormField
                            control={form.control}
                            name='email'
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Email</FormLabel>
                                    <FormControl>
                                        <Input placeholder='email@exemplo.com' {...field} />
                                    </FormControl>
                                    <FormDescription>Email do aluno afiliado</FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name='display_name'
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Nome</FormLabel>
                                    <FormControl>
                                        <Input placeholder='João da Silva' {...field} />
                                    </FormControl>
                                    <FormDescription>
                                        Insira o nome do aluno a ser cadastrado.
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </form>
                </Form>

                <DialogFooter className='gap-4 items-center'>
                    {loading && (
                        <span className='text-xs text-muted-foreground/50 text-right max-w-[15rem]'>
                            Psst... Adicionar um usuário pode demorar um pouco, mas nada demais.
                        </span>
                    )}
                    <Button
                        disabled={loading || !formState.isValid}
                        type='submit'
                        form='addaffiliate'
                    >
                        {loading && <Loader2 className='w-4 h-4 animate-spin inline-block mr-1' />}
                        Cadastrar
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
