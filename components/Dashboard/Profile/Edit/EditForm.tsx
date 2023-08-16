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

type UserCanEdit = {
    displayName: string | undefined;
    email: string | undefined;
};

export function EditProfileForm({ displayUser }: { displayUser: UserProfile | null }) {
    const form = useForm<z.infer<typeof EditProfileFormSchema>>({
        resolver: zodResolver(EditProfileFormSchema),
        defaultValues: {
            displayName: displayUser?.display_name,
            email: displayUser?.email,
        },
        mode: "all",
    });

    function onSubmit(values: z.infer<typeof EditProfileFormSchema>) {
        const currentUser: UserCanEdit = {
            displayName: displayUser?.display_name,
            email: displayUser?.email,
        };
        const newUser: UserCanEdit = {
            displayName: values.displayName,
            email: values.email,
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
    }

    return (
        <>
            <ProfilePreview displayUser={displayUser} />
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className='flex flex-col gap-4'>
                    <FormField
                        control={form.control}
                        name={"displayName"}
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
                        name={"email"}
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Email</FormLabel>
                                <FormControl>
                                    <Input placeholder='example@email.com' {...field}></Input>
                                </FormControl>
                                <FormDescription>Este é o seu email de login.</FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <Button type='submit'>Confirmar</Button>
                </form>
            </Form>
        </>
    );
}
