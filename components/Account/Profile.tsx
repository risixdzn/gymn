"use client";

import { Session, createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useCallback, useState, useEffect } from "react";

type User = {
    created_at: string;
    username: string;
    first_name: string;
    profile: string;
};

export default function Profile({ session }: { session: Session | null }) {
    const supabase = createClientComponentClient();
    const [loading, setLoading] = useState<boolean>(false);
    const user = session?.user;

    const [displayUser, setDisplayUser] = useState<User>({
        created_at: "",
        username: "",
        first_name: "",
        profile: "",
    });

    const getProfile = useCallback(async () => {
        try {
            setLoading(true);

            let { data, error, status } = await supabase
                .from("users")
                .select("created_at, username, profile, first_name")
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
        console.log(user);
    }, [user, getProfile]);

    return (
        <>
            {!loading ? (
                <div>
                    <h1>{displayUser.username}</h1>
                    <h3>{displayUser.profile}</h3>
                    <p>{displayUser.created_at}</p>
                    <p>{displayUser.first_name}</p>
                </div>
            ) : (
                <span>Loading...</span>
            )}
        </>
    );
}
