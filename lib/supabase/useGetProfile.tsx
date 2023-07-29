import { Session, createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { Dispatch, SetStateAction, useCallback, useEffect, useState } from "react";

type useGetProfileProps = {
    session: Session | null;
};

export type UserProfile = {
    created_at: string;
    username: string;
    first_name: string;
    profile: string;
    email: string;
};

export function useGetProfile({ session }: useGetProfileProps) {
    const [loading, setLoading] = useState(false);
    const [displayUser, setDisplayUser] = useState<UserProfile | null>(null);

    const supabase = createClientComponentClient();
    const user = session?.user;

    const getProfile = useCallback(async () => {
        try {
            setLoading(true);

            let { data, error, status } = await supabase
                .from("users")
                .select("created_at, username, profile, first_name, email")
                .eq("id", user?.id)
                .single();
            if (error && status !== 406) {
                throw error;
            }

            if (data) {
                setDisplayUser({
                    created_at: data.created_at,
                    username: data.username,
                    first_name: data.first_name,
                    profile: data.profile,
                    email: data.email,
                });
            }
        } catch (error) {
            console.log("Error on getting user data", error);
        } finally {
            setLoading(false);
        }
    }, [user, supabase]);

    useEffect(() => {
        getProfile();
    }, [getProfile]);

    return { loading, displayUser };
}
