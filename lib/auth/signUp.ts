"use client";

import { type RegisterMemberForm } from "@/components/Auth/Register/RegisterMemberForm";
import { Dispatch, SetStateAction } from "react";

import { supabase } from "../supabase";
import { toast } from "@/components/ui/use-toast";
import { type RegisterGymOwnerForm } from "@/components/Auth/Register/RegisterGymOwnerForm";

type MemberSignUpProps = {
    userData: RegisterMemberForm;
    setLoading: Dispatch<SetStateAction<boolean>>;
    setSignUpSuccess: Dispatch<SetStateAction<boolean>>;
};

type GymOwnerSignUpProps = {
    userData: RegisterGymOwnerForm;
    setLoading: Dispatch<SetStateAction<boolean>>;
    setSignUpSuccess: Dispatch<SetStateAction<boolean>>;
};

export async function MemberSignUp({ userData, setLoading, setSignUpSuccess }: MemberSignUpProps) {
    setLoading(true);
    const { data, error } = await supabase.rpc("check_email_exists", {
        email_param: userData.email.toLowerCase(),
    });

    if (data === false) {
        const signUpResult = await supabase.auth.signUp({
            email: userData.email,
            password: userData.password,
            options: {
                data: {
                    username: userData.username,
                    display_name: userData.displayName,
                    profile: "Member",
                },
            },
        });

        if (signUpResult.error?.message) {
            toast({
                title: signUpResult.error.name,
                description: signUpResult.error.message,
                variant: "destructive",
            });
        } else {
            setSignUpSuccess(true);
            toast({
                title: "Parabéns! Você registrou o seguinte usuário:",
                description: signUpResult.data.user?.email,
                variant: "success",
            });
            console.log(signUpResult.data);
        }
    } else {
        toast({
            title: "Este usuário ja existe.",
            description: "Tente usar outro email, ou entre na página de login.",
            variant: "destructive",
        });
    }

    setLoading(false);
}

export async function GymOwnerSignUp({
    userData,
    setLoading,
    setSignUpSuccess,
}: GymOwnerSignUpProps) {
    setLoading(true);
    const { data, error } = await supabase.rpc("check_email_exists", {
        email_param: userData.email.toLowerCase(),
    });

    if (data === false) {
        const signUpResult = await supabase.auth.signUp({
            email: userData.email,
            password: userData.password,
            options: {
                data: {
                    username: userData.username,
                    display_name: userData.displayName,
                    gym_name: userData.gymName,
                    gym_address: userData.gymAddress,
                    profile: "GymOwner",
                },
            },
        });

        if (signUpResult.error?.message) {
            toast({
                title: signUpResult.error.name,
                description: signUpResult.error.message,
                variant: "destructive",
            });
        } else {
            setSignUpSuccess(true);
            toast({
                title: "Parabéns! Você registrou o seguinte usuário:",
                description: signUpResult.data.user?.email,
                variant: "success",
            });
            console.log(signUpResult.data);
        }
    } else {
        toast({
            title: "Este usuário ja existe.",
            description: "Tente usar outro email, ou entre na página de login.",
            variant: "destructive",
        });
    }

    setLoading(false);
}
