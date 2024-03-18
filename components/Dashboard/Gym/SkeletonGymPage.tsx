import { Skeleton } from "@/components/ui/skeleton";

export const SkeletonGymPage = () => {
    return (
        <section className='space-y-6'>
            <Skeleton className='w-full rounded-md bg-accent h-28 lg:h-52'></Skeleton>
            <div className='flex items-center gap-6 lg:gap-8'>
                <Skeleton className='w-20 h-20 lg:w-36 lg:h-36 rounded-md' />
                <div className='lg:space-y-1'>
                    <Skeleton className='w-40 h-6 lg:w-80 lg:h-8 rounded-md'></Skeleton>
                    <Skeleton className='w-28 h-4 lg:w-56 lg:h-6 rounded-md'></Skeleton>
                    <div className='flex gap-2 items-center text-xs'>
                        <Skeleton className='w-8 h-8 rounded-md' />
                        <Skeleton className='w-20 h-4 lg:w-32 lg:h-6 rounded-md'></Skeleton>
                    </div>
                </div>
            </div>
        </section>
    );
};
