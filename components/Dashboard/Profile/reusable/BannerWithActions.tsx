import { cn } from "@/lib/utils";
import Image from "next/image";
import { UserProfile } from "@/types/UserProfile";
import { ReactNode } from "react";
import nullimg from "@/public/null.png";

export function Banner({ children }: { children: ReactNode }) {
    return <div id='banner'>{children}</div>;
}

const BannerImage = ({
    user,
    children,
    className,
}: {
    className?: string;
    user: UserProfile;
    children?: ReactNode;
}) => {
    return (
        <div
            id='banner'
            className={cn(
                `w-full h-32 bg-accent rounded-t-2xl xl:h-60 relative overflow-hidden`,
                className
            )}
        >
            {children}

            <Image
                unoptimized
                width={1500}
                height={1000}
                src={user?.banner_id ? `/api/users/${user.username}/banner` : nullimg}
                alt=''
                key={1}
                className='w-full h-full object-cover rounded-t-2xl'
            />
        </div>
    );
};

Banner.BannerImage = BannerImage;

const Content = ({ children }: { children?: ReactNode }) => {
    return (
        <div className='hover:opacity-100 opacity-0 w-full h-full bg-black/50 transition-all absolute flex flex-row gap-2 items-center justify-center'>
            {children}
        </div>
    );
};

Banner.Content = Content;

const Actions = ({ children }: { children?: ReactNode }) => {
    return (
        <div
            id='actions'
            className='xl:shadow-lg w-full h-16 xl:h-20 rounded-b-2xl border-border 
    border-b-0 border-x-0 bg-transparent
    xl:border-b-[1px] xl:border-x-[1px] xl:bg-card
    flex items-center justify-end px-0 xl:px-6 gap-2'
        >
            {children}
        </div>
    );
};

Banner.Actions = Actions;
