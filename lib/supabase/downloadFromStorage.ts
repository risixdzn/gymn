import { supabase } from "../supabase";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

export async function downloadAvatar(username: string) {
    const supabase = createClientComponentClient();

    const { data, error } = await supabase.storage.from("avatars").download(username);
    if (error) {
        throw error;
    }

    const url = URL.createObjectURL(data);
    console.log(url);

    return url;
}

export async function downloadBanner(username: string) {
    const supabase = createClientComponentClient();

    const { data, error } = await supabase.storage.from("banners").download(username);
    if (error) {
        throw error;
    }

    const url = URL.createObjectURL(data);
    console.log(url);

    return url;
}
