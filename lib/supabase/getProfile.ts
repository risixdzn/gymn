import { Session, createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useCallback, useEffect, useState } from "react";
import UserDefaultAvatar from "../../public/user.png";
import { downloadAvatar, downloadBanner } from "./downloadFromStorage";
import { UserProfile } from "@/types/UserProfile";

type useGetCurrentProfileProps = {
    session: Session | null;
};

type useGetForeignProfileProps = {
    username: string;
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
                    `id,
                    created_at,
                    username,
                    profile,
                    display_name,
                    email,
                    avatars!users_avatar_id_fkey(avatar_url),
                    banners!users_banner_id_fkey(banner_url),
                    bio,
                    location`
                )
                .eq("id", user?.id)
                .single();
            if (error && status !== 406) {
                throw error;
            }

            if (data) {
                // avatars ou banners pode ser um objeto, ou nulo => se nao possuir um avatar
                const avatars = data.avatars || null;
                const banners = data.banners || null;
                // se for um array, estamos lidando um uma resposta nao nula e então extraimos o indice 0, se nao, apenas retorno o objeto nulo
                const avatarData = Array.isArray(avatars) ? avatars[0] : avatars;
                const bannerData = Array.isArray(banners) ? banners[0] : banners;

                const defaultAvatar = UserDefaultAvatar;

                const avatar_url = avatarData ? await downloadAvatar(data.username) : defaultAvatar;
                const banner_url = bannerData ? await downloadBanner(data.username) : null;

                setDisplayUser({
                    id: data.id,
                    created_at: data.created_at,
                    username: data.username,
                    display_name: data.display_name,
                    profile: data.profile,
                    email: data.email,
                    avatar_url: avatar_url,
                    banner_url: banner_url,
                    bio: data.bio,
                    location: data.location,
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
                    `id,
                    created_at,
                    username,
                    profile,
                    display_name,
                    email,
                    avatars!users_avatar_id_fkey(avatar_url),
                    banners!users_banner_id_fkey(banner_url),
                    bio,
                    location`
                )
                .eq("username", username)
                .single();

            if (error && status !== 406) {
                throw error;
            } else if (error && status == 406) {
                setUnexistent(true);
            }

            if (data) {
                // avatars ou banners pode ser um objeto, ou nulo => se nao possuir um avatar
                const avatars = data.avatars || null;
                const banners = data.banners || null;
                // se for um array, estamos lidando um uma resposta nao nula e então extraimos o indice 0, se nao, apenas retorno o objeto nulo
                const avatarData = Array.isArray(avatars) ? avatars[0] : avatars;
                const bannerData = Array.isArray(banners) ? banners[0] : banners;

                const defaultAvatar = UserDefaultAvatar;

                const avatar_url = avatarData ? await downloadAvatar(data.username) : defaultAvatar;
                const banner_url = bannerData ? await downloadBanner(data.username) : null;

                setDisplayUser({
                    id: data.id,
                    created_at: data.created_at,
                    username: data.username,
                    display_name: data.display_name,
                    profile: data.profile,
                    email: data.email,
                    avatar_url: avatar_url,
                    banner_url: banner_url,
                    bio: data.bio,
                    location: data.location,
                });
            }
        } catch (error) {
            console.log("Error on getting user data", error);
        } finally {
            setLoading(false);
        }
    }, [username, supabase]);

    function refetchUser() {
        getProfile();
    }

    useEffect(() => {
        getProfile();
    }, [getProfile]);

    return { loading, displayUser, unexistent, refetchUser };
}
