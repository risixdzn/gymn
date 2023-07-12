import { type RegisterMemberForm } from "@/components/Auth/Register/RegisterMemberForm";
//import { type RegisterGymOwnerForm } from "@/components/Auth/Register/RegisterGymOwnerForm";

import { supabase } from "../supabase";

export async function signUpMember(userData: RegisterMemberForm) {
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

    if (error?.message) {
        console.log(error, data);
    } else {
        console.log(data);
    }
}
