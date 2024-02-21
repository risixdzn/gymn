import { NextResponse } from "next/server";
import { supabase } from "../supabase";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

export async function downloadAvatar(username: string) {
    const supabase = createClientComponentClient();

    const { data, error } = await supabase.storage.from("avatars").download(username, {});
    if (error) {
        throw error;
    }

    const url = URL.createObjectURL(data);
    const timestamp = Date.now();
    const timestampedUrl = `${url}#t=${timestamp}`;
    console.log(timestampedUrl);

    return timestampedUrl;
}

export async function downloadBanner(username: string) {
    const supabase = createClientComponentClient();

    const { data, error } = await supabase.storage.from("banners").download(username, {});
    if (error) {
        throw error;
    }

    const url = URL.createObjectURL(data);
    const timestamp = Date.now();
    const timestampedUrl = `${url}#t=${timestamp}`;
    console.log(timestampedUrl);

    return timestampedUrl;
}

export async function downloadBannerRAW(username: string) {
    const supabase = createClientComponentClient();

    const { data, error } = await supabase.storage.from("banners").download(username, {});
    if (error) {
        throw error;
    }

    return data;
}

export async function downloadAvatarRAW(username: string) {
    const supabase = createClientComponentClient();

    const { data, error } = await supabase.storage.from("avatars").download(username, {});
    if (error) {
        throw error;
    }

    return data;
}
