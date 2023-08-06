export default function UnexistentProfile({ username }: { username: string }) {
    return (
        <div>
            <div id='banner' className='w-full h-36 bg-accent rounded-t-2xl lg:h-72'></div>
            <div
                id='pfp'
                className='absolute w-28 lg:w-48 h-28 lg:h-48 rounded-full lg:rounded-3xl bg-accent
            -translate-y-[50%] lg:-translate-y-[15%] ml-0 lg:ml-10 border-background border-[5px] lg:border-[7.5px] overflow-hidden'
            ></div>
            <div
                id='topinfo'
                className='w-full h-auto flex flex-col pl-2 lg:mt-0 mt-10 lg:pl-[calc(12rem+(2.5rem*2))] py-5 lg:py-7 gap-1'
            >
                <h1 className='lg:mt-4 text-xl lg:text-3xl tracking-tight font-bold'>
                    O usuário{" "}
                    <span className='inline-block font-normal text-muted-foreground'>
                        @{username}
                    </span>{" "}
                    não existe.
                </h1>
                <span className='text-sm text-muted-foreground'>Tente buscar outro (a).</span>
            </div>
        </div>
    );
}
