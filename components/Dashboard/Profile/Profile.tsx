"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { SignOut } from "@/lib/auth/signOut";
import { Session } from "@supabase/auth-helpers-nextjs";
import { useRouter } from "next/navigation";
import Image from "next/image";
import UserLogo from "../../../public/user.png";
import { Edit, Loader2, LogOut } from "lucide-react";
import { useTimestampConverter } from "@/lib/hooks/useTimestampConvert";
import { CalendarDays } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { useGetProfile } from "@/lib/supabase/getProfile";
import { useEffect } from "react";
import PersonalProfile from "./PersonalProfile";
import ForeignProfile from "./ForeignProfile";

type ProfileProps = {
    session: Session | null;
    username: string;
    type: "personal" | "foreign";
};

export default function Profile({ session, username, type }: ProfileProps) {
    const router = useRouter();
    const { loading, displayUser, unexistent } = useGetProfile({ username });
    const formattedJoinDate = useTimestampConverter(displayUser?.created_at);

    const renderProfile = () => {
        const profileTypes = {
            personal: <PersonalProfile session={session} router={router} />,
            foreign: <ForeignProfile router={router} username={username} session={session} />,
        };
        return profileTypes[type];
    };

    return <>{renderProfile()}</>;
}
