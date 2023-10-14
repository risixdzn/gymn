import { Skeleton } from "../ui/skeleton";

export default function Preview() {
    return (
        <section
            id='preview'
            className='
            w-full h-screen flex justify-center border-2 '
        >
            <div
                className='w-full h-[calc(100%-12rem)] max-w-[1300px] mx-4 lg:mx-20 aspect-auto bg-secondary rounded-lg
             -translate-y-40'
            >
                <Skeleton className='w-full h-full' />
            </div>
        </section>
    );
}
