import { Skeleton } from "../ui/skeleton";

export default function Preview() {
    return (
        <section
            data-scroll-section
            id='preview'
            className='
            w-full h-screen snap-start flex justify-center '
        >
            <div
                className='w-full mt-20 h-[calc(100%-14rem)] max-w-[1300px] mx-4 lg:mx-20 aspect-auto bg-secondary rounded-lg
             '
            >
                <Skeleton className='w-full h-full' />
            </div>
        </section>
    );
}
