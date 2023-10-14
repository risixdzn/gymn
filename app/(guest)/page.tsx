import Hero from "@/components/Home/Hero";
import Preview from "@/components/Home/Preview";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
    return (
        <main className='flex min-h-screen flex-col items-center justify-between '>
            <Hero />
            <Preview />
            <div id='banner' className='w-full max-w-screen-xl h-32 px-4 lg:px-0'>
                <div className='border-border dark:border-border/0 border-[1px] px-8 relative bg-footerBGWhite dark:bg-footerBGDark bg-no-repeat bg-center bg-cover flex items-center justify-center from-g_purple to-g_darkpurple  w-full h-full rounded-lg overflow-hidden gap-6'>
                    <h4 className='text-lg lg:text-2xl font-medium tracking-tight'>
                        Começe a sua jornada fitness{" "}
                        <span className='bg-clip-text bg-gradient-to-r from-g_purple to-g_darkpurple text-transparent font-bold'>
                            agora
                        </span>
                    </h4>
                    <Link href='/auth'>
                        <Button className='lg:rounded-full'>Começar</Button>
                    </Link>
                </div>
            </div>
        </main>
    );
}
