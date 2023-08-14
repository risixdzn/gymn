import { Skeleton } from "@/components/ui/skeleton";

export default function SkeletonProfile() {
    return (
        <div>
            <div id='banner' className='w-full h-36 bg-accent rounded-t-2xl lg:h-72'>
                <Skeleton className='w-full h-full' />
            </div>
            <div
                id='pfp'
                className='z-[1] absolute w-28 lg:w-48 h-28 lg:h-48 rounded-full lg:rounded-3xl bg-card 
                   -translate-y-[50%] lg:-translate-y-[15%] ml-0 lg:ml-10 border-background border-[5px] lg:border-[7.5px] overflow-hidden'
            >
                <Skeleton className='w-full h-full' />
            </div>
            <div
                id='actions'
                className='absolute w-[calc(100%-2.5rem)] lg:w-[calc(100%-5rem)] mt-3 lg:mt-7 h-10 flex gap-2 justify-end'
            >
                <Skeleton className='w-[119.87px] h-[40px]' />
                <Skeleton className='w-[40px] h-[40px]' />
            </div>
            <div
                id='topinfo'
                className='w-full h-auto flex flex-col pl-2 lg:mt-0 mt-10 lg:pl-[calc(12rem+(2.5rem*2))] py-5 lg:py-7 gap-1'
            >
                <h1 className='text-2xl lg:text-3xl tracking-tight font-semibold flex items-center mb-2'>
                    <Skeleton className='w-[85px] h-[25px] lg:w-[106px] lg:h-[26px]' />
                    <span className='lg:text-base text-muted-foreground inline-block pl-2 text-sm'>
                        <Skeleton className='w-[70px] h-[18px] lg:w-[78px] lg:h-[20px]' />
                    </span>
                </h1>
                <span>
                    <Skeleton className='w-[70px] h-[22px] rounded-full' />
                </span>
            </div>
        </div>
    );
}
