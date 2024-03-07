"use client";

import Profile from "@/components/Dashboard/Profile/Profile";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import SkeletonProfile from "@/components/Dashboard/Profile/SkeletonProfile";
import UnexistentProfile from "@/components/Dashboard/Profile/UnexistentProfile";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useSession } from "@/lib/supabase/useSession";
import { useEffect } from "react";

type ProfilePageProps = {
    params: {
        slug: string;
    };
};

export default function ProfilePage({ params }: ProfilePageProps) {
    const session = useSession();

    const { data, isLoading, refetch } = useQuery({
        queryKey: ["profile"], //key and params to define the query
        queryFn: () => {
            return axios.get(`/api/users/${params.slug}`).then((res) => res.data);
        },
        retry: false,
        refetchOnWindowFocus: false,
    });

    if (!isLoading) {
        if (!data) {
            return <UnexistentProfile username={params.slug} />;
        }
        return <Profile user={data} session={session} refetch={refetch} />;
    }
    return <SkeletonProfile />;
}
