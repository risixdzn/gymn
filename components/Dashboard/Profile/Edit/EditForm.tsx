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
import { Loader2 } from "lucide-react";

export type UserCanEdit = {
    display_name: string | undefined;
    bio: string | undefined;
};
type EditProfileFormProps = {
    displayUser: UserProfile | null;
    setDrawerOpen: Dispatch<SetStateAction<boolean>>;
    refetchUser: () => void;
};

export function EditProfileForm({ displayUser, setDrawerOpen, refetchUser }: EditProfileFormProps) {
    const form = useForm<z.infer<typeof EditProfileFormSchema>>({
        resolver: zodResolver(EditProfileFormSchema),
        defaultValues: {
            display_name: displayUser?.display_name,
            bio: displayUser?.bio !== null ? displayUser?.bio : "",
        },
        mode: "all",
    });

    const [loading, setLoading] = useState(false);
    const { toast } = useToast();

    async function onSubmit(values: z.infer<typeof EditProfileFormSchema>) {
        const currentUser: UserCanEdit = {
            display_name: displayUser?.display_name,
            bio: displayUser?.bio,
        };
        const newUser: UserCanEdit = {
            display_name: values.display_name,
            bio: values.bio,
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
            userId: displayUser?.id as string,
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
            <ProfilePreview displayUser={displayUser} />
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className='flex flex-col gap-4'>
                    <FormField
                        control={form.control}
                        name={"display_name"}
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Nome de exibição</FormLabel>
                                <FormControl>
                                    <Input placeholder='John Doe' {...field}></Input>
                                </FormControl>
                                <FormDescription>
                                    Este é o seu nome de exibição público.
                                </FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name={"bio"}
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Bio</FormLabel>
                                <FormControl>
                                    <Textarea
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

                    <Button type='submit' disabled={!loading && false}>
                        {!loading ? (
                            "Salvar alterações"
                        ) : (
                            <Loader2 className='w-4 h-4 animate-spin' />
                        )}
                    </Button>
                </form>
            </Form>
        </>
    );
}
