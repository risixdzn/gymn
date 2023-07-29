import { Session } from "@supabase/auth-helpers-nextjs";
import { ModeToggle } from "@/components/ModeToggle";
import { UserProfile } from "@/lib/supabase/useGetProfile";

export default function UserProfileCard({ displayUser }: { displayUser: UserProfile | null }) {
    return (
        <>
            <div className='flex flex-row items-center gap-4'>
                <div className='w-11 h-11 bg-card rounded-md'></div>
                <div>
                    <h3 className='text-sm'>{displayUser?.username}</h3>
                    <h3 className='text-sm text-muted-foreground'>{displayUser?.email}</h3>
                </div>
            </div>
            <ModeToggle />
        </>
    );
}
