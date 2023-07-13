"use client";

import { type RegisterMemberForm } from "@/components/Auth/Register/RegisterMemberForm";
import { Dispatch, SetStateAction } from "react";
import { useToast } from "@/components/ui/use-toast";

import { supabase } from "../supabase";

type MemberSignUpProps = {
    userData: RegisterMemberForm;
    setLoading: Dispatch<SetStateAction<boolean>>;
    toast: any; //i gave up trying to type this, if you wa
};

export async function MemberSignUp({ userData, setLoading, toast }: MemberSignUpProps) {
    setLoading(true);
    const { data, error } = await supabase.auth.signUp({
        email: userData.email,
        password: userData.password,
        options: {
            data: {
                username: userData.username,
                first_name: userData.firstName,
                profile: "Member",
            },
        },
    });

    setLoading(false);

    if (error?.message) {
        toast({
            variant: "destructive",
            title: error.name,
            description: error.message,
        });
    } else {
        console.log(data);
    }
}
