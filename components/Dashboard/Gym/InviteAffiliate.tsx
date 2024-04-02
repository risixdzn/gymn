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
import { Merge } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
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
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "@/components/ui/use-toast";
import { AxiosError } from "axios";
import { Dispatch, SetStateAction } from "react";

export default function InviteAffiliate() {
    const [open, setOpen] = useState<boolean>(false);
    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button className='whitespace-nowrap w-full md:w-auto' variant={"outline"}>
                    <Merge className='w-4 h-4 inline-block mr-1' /> Convidar aluno
                </Button>
            </DialogTrigger>
            <DialogContent className='max-w-md'>
                <DialogHeader>
                    <DialogTitle>Convidar aluno</DialogTitle>
                    <DialogDescription>
                        Convide um aluno que <b>ja possui</b> uma conta no Gymn.
                    </DialogDescription>
                </DialogHeader>
                <Tabs className='w-full' defaultValue='email'>
                    <TabsList className='grid w-full grid-cols-2'>
                        <TabsTrigger value='email' className='w-full'>
                            Por email
                        </TabsTrigger>
                        <TabsTrigger value='username' className='w-full'>
                            Por nome de usuário
                        </TabsTrigger>
                    </TabsList>
                    <TabsContent value='email'>
                        <InviteAffiliateByEmail setOpen={setOpen} />
                    </TabsContent>
                    <TabsContent value='username'>
                        <InviteAffiliateByUsername setOpen={setOpen} />
                    </TabsContent>
                </Tabs>
            </DialogContent>
        </Dialog>
    );
}

const InviteAffiliateByEmail = ({ setOpen }: { setOpen: Dispatch<SetStateAction<boolean>> }) => {
    const [loading, setLoading] = useState<boolean>(false);

    const inviteByEmailFormSchema = z.object({
        email: z.string().email({ message: "Insira um email válido" }),
    });
    const form = useForm<z.infer<typeof inviteByEmailFormSchema>>({
        resolver: zodResolver(inviteByEmailFormSchema),
        defaultValues: {
            email: "",
        },
        mode: "all",
    });

    const { formState } = form;

    const queryClient = useQueryClient();

    async function onSubmit(values: z.infer<typeof inviteByEmailFormSchema>) {
        setLoading(true);
        try {
            const invite = await axios.post(`/api/affiliates/invite/existing`, {
                email: values.email,
            });

            if (invite.data.success == false) {
                return toast({
                    title: "Um erro inesperado ocorreu.",
                    description: "Tente novamente em instantes.",
                    variant: "destructive",
                });
            }
            setLoading(false);
            setOpen(false);
            toast({
                variant: "success",
                title: `O usuário ${values.email} foi convidado.`,
                description: (
                    <span>
                        Ele poderá aceitar o convite através das <b>notificações</b>.
                    </span>
                ),
            });
            queryClient.refetchQueries(["affiliates"]);
        } catch (error) {
            if (error instanceof AxiosError) {
                if (error.response?.data) {
                    setLoading(false);

                    return toast({
                        variant: "destructive",
                        title: error.response.data.error.title,
                        description: error.response.data.error.description,
                    });
                }
            }
        } finally {
            setLoading(false);
        }
    }
    return (
        <>
            <Form {...form}>
                <form
                    id='invitebyemail'
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
                                    <Input placeholder='exemplo@dominio.com' {...field} />
                                </FormControl>
                                <FormDescription>
                                    O usuário com este email será convidado a sua academia.
                                </FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <DialogFooter>
                        <Button
                            type='submit'
                            className='w-full'
                            disabled={loading || !formState.isValid}
                        >
                            Convidar
                        </Button>
                    </DialogFooter>
                </form>
            </Form>
        </>
    );
};

const InviteAffiliateByUsername = ({ setOpen }: { setOpen: Dispatch<SetStateAction<boolean>> }) => {
    const [loading, setLoading] = useState<boolean>(false);
    const inviteByUsernameFormSchema = z.object({
        username: z
            .string()
            .min(3, { message: "O nome de usuário não pode ser tão curto" })
            .max(30, { message: "O nome de usuário não pode ser tão longo" })
            .refine((x) => /^[a-zA-Z0-9]*$/.test(x), {
                message: "O nome de usuário não pode conter caracteres especiais.",
            }),
    });
    const form = useForm<z.infer<typeof inviteByUsernameFormSchema>>({
        resolver: zodResolver(inviteByUsernameFormSchema),
        defaultValues: {
            username: "",
        },
        mode: "all",
    });
    const { formState } = form;

    const queryClient = useQueryClient();

    async function onSubmit(values: z.infer<typeof inviteByUsernameFormSchema>) {
        setLoading(true);
        try {
            const invite = await axios.post(`/api/affiliates/invite/existing`, {
                username: values.username,
            });

            if (invite.data.success == false) {
                return toast({
                    title: "Um erro inesperado ocorreu.",
                    description: "Tente novamente em instantes.",
                    variant: "destructive",
                });
            }
            setLoading(false);
            setOpen(false);
            toast({
                variant: "success",
                title: `O usuário ${values.username} foi convidado.`,
                description: (
                    <span>
                        Ele poderá aceitar o convite através das <b>notificações</b>.
                    </span>
                ),
            });
            queryClient.refetchQueries(["affiliates"]);
        } catch (error) {
            if (error instanceof AxiosError) {
                if (error.response?.data) {
                    setLoading(false);

                    return toast({
                        variant: "destructive",
                        title: error.response.data.error.title,
                        description: error.response.data.error.description,
                    });
                }
            }
        } finally {
            setLoading(false);
        }
    }

    return (
        <>
            <Form {...form}>
                <form
                    id='invitebyusername'
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
                                    Este usuário será convidado a sua academia.
                                </FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <DialogFooter>
                        <Button
                            type='submit'
                            className='w-full'
                            disabled={loading || !formState.isValid}
                        >
                            Convidar
                        </Button>
                    </DialogFooter>
                </form>
            </Form>
        </>
    );
};
