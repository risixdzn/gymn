export default function UnexistentProfile({ username }: { username: string }) {
    return (
        <div>
            <div
                id='banner'
                className={`w-full h-32 bg-accent rounded-t-2xl xl:h-60 relative overflow-hidden`}
            ></div>
            <div
                id='actions'
                className='shadow-lg w-full h-16 xl:h-20 rounded-b-2xl border-border 
                border-b-0 border-x-0 bg-transparent
                xl:border-b-[1px] xl:border-x-[1px] xl:bg-card
                flex items-center justify-end px-0 xl:px-6 gap-2'
            ></div>
            <div
                id='pfp'
                className={`-translate-y-[calc(4rem+50%)] xl:-translate-y-[calc(5rem+50%)]
                xl:w-80 xl:h-80 xl:ml-10 xl:border-card shadow-lg z-[1] absolute w-28 h-28 rounded-full bg-accent
                border-background border-[5px] xl:border-[7.5px] overflow-hidden object-cover`}
            ></div>
            <div
                id='content'
                className='
                        xl:mt-6 xl:grid xl:grid-cols-[20rem_auto] xl:gap-6 xl:pl-10'
            >
                <div className='xl:w-80 xl:pt-20'>
                    <h1 className='lg:mt-4 text-xl lg:text-3xl tracking-tight font-bold'>
                        O usuário{" "}
                        <span className='inline-block font-normal text-muted-foreground'>
                            @{username}
                        </span>{" "}
                        não existe.
                    </h1>
                    <span className='text-sm text-muted-foreground'>Tente buscar outro (a).</span>
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
