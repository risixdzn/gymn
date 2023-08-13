import { Session, createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { Dispatch, SetStateAction, useCallback, useEffect, useState } from "react";
import UserDefaultAvatar from "../../public/user.png";
import { StaticImageData } from "next/image";

type useGetCurrentProfileProps = {
    session: Session | null;
};

type useGetForeignProfileProps = {
    username: string;
};

export type UserProfile = {
    created_at: string;
    username: string;
    first_name: string;
    profile: string;
    email: string;
    avatar_url: string | StaticImageData;
};

export function useGetCurrentProfile({ session }: useGetCurrentProfileProps) {
    const [loading, setLoading] = useState(false);
    const [displayUser, setDisplayUser] = useState<UserProfile | null>(null);

    const supabase = createClientComponentClient();
    const user = session?.user;

    const getProfile = useCallback(async () => {
        try {
            setLoading(true);

            let { data, error, status } = await supabase
                .from("users")
                .select(
                    "created_at, username, profile, first_name, email, avatars!users_avatar_id_fkey(avatar_url)"
                )
                .eq("id", user?.id)
                .single();
            if (error && status !== 406) {
                throw error;
            }

            if (data) {
                const avatars = data.avatars || null; // avatars pode ser um objeto, ou nada, se nao possuir um avatar
                const avatarData = Array.isArray(avatars) ? avatars[0] : avatars; // se for um array, estamos lidando um uma resposta e então extraimos o indice 0, se nao, apenas coloco o objeto

                const defaultAvatar = UserDefaultAvatar;
                const avatar_url = avatarData
                    ? `${avatarData.avatar_url}?v=${Date.now()}`
                    : defaultAvatar;

                setDisplayUser({
                    created_at: data.created_at,
                    username: data.username,
                    first_name: data.first_name,
                    profile: data.profile,
                    email: data.email,
                    avatar_url: avatar_url,
                });
            }
        } catch (error) {
            console.log("Error on getting user data", error);
        } finally {
            setLoading(false);
        }
    }, [user, supabase]);

    function refetchUser() {
        getProfile();
    }

    useEffect(() => {
        getProfile();
    }, [getProfile]);

    return { loading, displayUser, refetchUser };
}

export function useGetProfile({ username }: useGetForeignProfileProps) {
    const [loading, setLoading] = useState(false);
    const [displayUser, setDisplayUser] = useState<UserProfile | null>(null);
    const [unexistent, setUnexistent] = useState(false);

    const supabase = createClientComponentClient();

    const getProfile = useCallback(async () => {
        try {
            setLoading(true);

            let { data, error, status } = await supabase
                .from("users")
                .select(
                    "created_at, username, profile, first_name, email, avatars!users_avatar_id_fkey(avatar_url)"
                )
                .eq("username", username)
                .single();

            if (error && status !== 406) {
                throw error;
            } else if (error && status == 406) {
                setUnexistent(true);
            }

            if (data) {
                const avatars = data.avatars || null; // avatars pode ser um objeto, ou nada, se nao possuir um avatar
                const avatarData = Array.isArray(avatars) ? avatars[0] : avatars; // se for um array, estamos lidando um uma resposta e então extraimos o indice 0, se nao, apenas coloco o objeto

                const defaultAvatar = UserDefaultAvatar;
                const avatar_url = avatarData
                    ? `${avatarData.avatar_url}?v=${Date.now()}`
                    : defaultAvatar;

                setDisplayUser({
                    created_at: data.created_at,
                    username: data.username,
                    first_name: data.first_name,
                    profile: data.profile,
                    email: data.email,
                    avatar_url: avatar_url,
                });
            }
        } catch (error) {
            console.log("Error on getting user data", error);
        } finally {
            setLoading(false);
        }
    }, [username, supabase]);

    useEffect(() => {
        getProfile();
    }, [getProfile]);

    return { loading, displayUser, unexistent };
}
