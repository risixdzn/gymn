import { type RegisterMemberForm } from "@/components/Auth/Register/RegisterMemberForm";
//import { type RegisterGymOwnerForm } from "@/components/Auth/Register/RegisterGymOwnerForm";
import { Dispatch, SetStateAction } from "react";

import { supabase } from "../supabase";

type MemberSignUpProps = {
    userData: RegisterMemberForm;
    setLoading: Dispatch<SetStateAction<boolean>>;
};

export async function memberSignUp({ userData, setLoading }: MemberSignUpProps) {
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
        console.log(error, data);
    } else {
        console.log(data);
    }
}
