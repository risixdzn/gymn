"use client";
import { EditProfileFormSchema } from "./EditProfileSchema";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import z from "zod";
import { UserProfile } from "@/types/UserProfile";

import { Button } from "@/components/ui/button";
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
import { ProfilePreview } from "../ProfilePreview";
import { Textarea } from "@/components/ui/textarea";
import { editProfile } from "@/lib/supabase/editProfile";
import { Dispatch, SetStateAction, useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import { ArrowLeft, Fingerprint, Loader2, MapPin, User } from "lucide-react";
import { SheetClose } from "@/components/ui/sheet";

export type UserCanEdit = {
    display_name: string | undefined;
    bio: string | undefined;
    location: string | undefined;
};
type EditProfileFormProps = {
    user: UserProfile | null;
    setDrawerOpen: Dispatch<SetStateAction<boolean>>;
    refetchUser: () => void;
};

export function EditProfileForm({ user, setDrawerOpen, refetchUser }: EditProfileFormProps) {
    const form = useForm<z.infer<typeof EditProfileFormSchema>>({
        resolver: zodResolver(EditProfileFormSchema),
        defaultValues: {
            display_name: user?.display_name,
            bio: user?.bio !== null ? user?.bio : "",
            location: user?.location !== null ? user?.location : "",
        },
        mode: "all",
    });

    const [loading, setLoading] = useState(false);
    const { toast } = useToast();

    async function onSubmit(values: z.infer<typeof EditProfileFormSchema>) {
        const currentUser: UserCanEdit = {
            display_name: user?.display_name,
            bio: user?.bio,
            location: user?.location,
        };
        const newUser: UserCanEdit = {
            display_name: values.display_name,
            bio: values.bio,
            location: values.location,
        };

        function compareUsers(currentUser: UserCanEdit, newUser: UserCanEdit) {
            const changes: Partial<UserCanEdit> = {};

            for (const key in currentUser) {
                if (currentUser.hasOwnProperty(key) && newUser.hasOwnProperty(key)) {
                    const currentUserValue = currentUser[key as keyof UserCanEdit];
                    const newUserValue = newUser[key as keyof UserCanEdit];

                    if (currentUserValue !== newUserValue) {
                        changes[key as keyof UserCanEdit] = newUserValue;
                    }
                }
            }

            return changes;
        }

        const editedValues = compareUsers(currentUser, newUser);
        console.log("Valores editados", editedValues);
        await editProfile({
            editedData: editedValues,
            userId: user?.id as string,
            setLoading: setLoading,
            toast: toast,
        });
        setDrawerOpen(false);
        setTimeout(() => {
            refetchUser();
        }, 300);
    }

    return (
        <>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className='flex flex-col gap-4 h-full'>
                    {/* the top section with go back button */}
                    <div className='w-full h-10 flex items-center justify-between'>
                        <span>
                            <SheetClose>
                                <ArrowLeft className='scale-75 inline-block' />
                            </SheetClose>
                            <h1 className='text-lg font-semibold inline-block ml-4'>
                                Editar perfil
                            </h1>
                        </span>
                        <Button type='submit' variant={"ghost"} disabled={!loading && false}>
                            {!loading ? "Salvar" : <Loader2 className='w-4 h-4 animate-spin' />}
                        </Button>
                    </div>
                    {/* actual form with profile preview */}
                    <div className='max-h-full h-auto overflow-y-scrol'>
                        <ProfilePreview user={user} />
                        <div className='mt-12'>
                            <FormField
                                control={form.control}
                                name={"display_name"}
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className='flex items-center gap-1'>
                                            <User className='inline-block scale-75 text-muted-foreground' />
                                            Nome de exibição
                                        </FormLabel>
                                        <FormControl>
                                            <Input placeholder='John Doe' {...field}></Input>
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name={"bio"}
                                render={({ field }) => (
                                    <FormItem className='mt-2'>
                                        <FormLabel className='flex items-center gap-1'>
                                            <Fingerprint className='inline-block scale-75 text-muted-foreground' />
                                            Bio
                                        </FormLabel>
                                        <FormControl>
                                            <Textarea
                                                cols={30}
                                                rows={4}
                                                wrap='hard'
                                                maxLength={160}
                                                placeholder='Escreva sua bio aqui.'
                                                className='resize-none'
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormDescription>
                                            Esta será a sua biografia mostrada no perfil.
                                        </FormDescription>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name={"location"}
                                render={({ field }) => (
                                    <FormItem className='mt-2'>
                                        <FormLabel className='flex items-center gap-1'>
                                            <MapPin className='inline-block scale-75 text-muted-foreground' />
                                            Local
                                        </FormLabel>
                                        <FormControl>
                                            <Input
                                                placeholder='Av Paulista, 735'
                                                {...field}
                                            ></Input>
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                    </div>
                </form>
            </Form>
        </>
    );
}
