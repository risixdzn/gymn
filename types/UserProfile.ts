import type { StaticImageData } from "next/image";

export type UserProfile = {
    id: string;
    created_at: string;
    username: string;
    display_name: string;
    profile: string;
    email: string;
    avatar_id: string;
    banner_id: string;
    bio: string;
    location: string;
};

export type UserNonSensitive = {
    id: string;
    created_at: string;
    username: string;
    display_name: string;
    profile: string;
    avatar_id: string;
    banner_id: string;
    bio: string;
    location: string;
};
