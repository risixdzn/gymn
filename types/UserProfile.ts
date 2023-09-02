import type { StaticImageData } from "next/image";

export type UserProfile = {
    id: string;
    created_at: string;
    username: string;
    display_name: string;
    profile: string;
    email: string;
    avatar_url: string | StaticImageData;
    banner_url: string | StaticImageData | null;
    bio: string;
    location: string;
};
