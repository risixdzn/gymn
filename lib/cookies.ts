"use server";

import { cookies } from "next/headers";

export async function getCookie(cookie: string) {
    const cookieStore = cookies();
    const requiredCookie = cookieStore.get(cookie);
    return requiredCookie;
}

export async function deleteCookie(cookie: string) {
    const cookieStore = cookies();
    cookieStore.delete(cookie);
    return;
}
