import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";
import { Dumbbell, MapPin, Users2 } from "lucide-react";

export default function SkeletonProfile() {
    return (
        <div>
            <div
                id='banner'
                className={`w-full h-32 bg-background  rounded-t-2xl xl:h-60 relative overflow-hidden`}
            >
                <Skeleton id='banner' className='w-full h-full' />
            </div>
            <div
                id='actions'
                className='shadow-lg w-full h-16 xl:h-20 rounded-b-2xl border-border 
                border-b-0 border-x-0 bg-transparent
                xl:border-b-[1px] xl:border-x-[1px] xl:bg-card
                flex items-center justify-end px-0 xl:px-6 gap-2'
            >
                <Skeleton id='buttonnormal' className='w-28 h-10' />
                <Skeleton id='buttonicon' className='w-10 h-10' />
            </div>
            <div
                id='pfp'
                className={`-translate-y-[calc(4rem+50%)] xl:-translate-y-[calc(5rem+50%)]
                xl:w-80 xl:h-80 xl:ml-10 xl:border-card shadow-lg z-[1] absolute w-28 h-28 rounded-full bg-background
                border-background border-[5px] xl:border-[7.5px] overflow-hidden object-cover`}
            >
                <Skeleton id='pfp' className='w-full h-full' />
            </div>
            <div
                id='content'
                className='
                        xl:mt-6 xl:grid xl:grid-cols-[20rem_auto] xl:gap-6 xl:pl-10'
            >
                <div id='profiledata' className='xl:w-80 xl:pt-20'>
                    <h1
                        id='display_name'
                        className='text-2xl xl:text-3xl tracking-tight font-semibold'
                    >
                        <Skeleton id='display_name' className='w-[185px] h-[32px] mb-3' />
                    </h1>
                    <h3 id='username' className='text-muted-foreground flex items-center'>
                        <Skeleton id='username' className='w-[74px] h-[25px] my-1 inline-block' />
                        <Skeleton
                            id='badge'
                            className='w-[70px] h-[20px] ml-3 my-1 inline-block rounded-full'
                        />
                    </h3>

                    <p
                        id='bio'
                        className='text-sm text-foreground my-4 mt-2 leading-5 max-h-[80px] overflow-clip whitespace-pre-line'
                    >
                        <Skeleton id='bio1' className='w-[64px] h-[20px] my-1' />
                        <Skeleton id='bio2' className='w-[120px] h-[20px] my-1' />
                        <Skeleton id='bio3' className='w-[92px] h-[20px] my-1' />
                    </p>
                    <Skeleton id='button' className='w-full h-9 xl:block hidden' />
                    <div className='text-muted-foreground flex items-center gap-2 my-4 xl:mt-4 '>
                        <Skeleton id='icon' className='w-[24px] h-[24px]' />
                        <Skeleton id='followers' className='w-[115px] h-[30px]' />
                        <Skeleton id='bull' className='w-[4px] h-[4px] rounded-full' />
                        <Skeleton id='following' className='w-[115px] h-[30px]' />
                    </div>
                    <div className='flex flex-col gap-1'>
                        <span className=' text-muted-foreground text-sm flex gap-2 items-center '>
                            <Skeleton id='icon2' className='w-[18px] h-[18px]' />
                            <Skeleton id='gym' className='w-[80px] h-[14px]' />
                        </span>
                        <span className=' text-muted-foreground text-sm flex gap-2  mt-2 items-center '>
                            <Skeleton id='icon3' className='w-[18px] h-[18px]' />
                            <Skeleton id='location' className='w-[130px] h-[14px]' />
                        </span>
                        <span className='text-muted-foreground text-xs flex gap-2 items-center mt-4'>
                            <Skeleton id='joindate' className='w-[200px] h-[10px]' />
                        </span>
                    </div>
                </div>
                <hr className='xl:hidden my-7 xl:my-0'></hr>
                <div
                    id='posts'
                    className='w-full xl:bg-card h-[30rem] rounded-2xl xl:border-border xl:border-[1px]'
                ></div>
            </div>
            <div
                id='topinfo'
                className='w-full h-auto flex flex-col pl-2 lg:mt-0 mt-10 lg:pl-[calc(12rem+(2.5rem*2))] py-5 lg:py-7 gap-1'
            ></div>
        </div>
    );
}
