import { Badge } from "@/components/ui/badge";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function MdxLayout({ children }: { children: React.ReactNode }) {
    return (
        <>
            <div
                id='gradient'
                className='mt-20 absolute bg-gradient-to-r from-g_purple/40 to-g_darkpurple/40 w-full h-[30rem] z-0'
            >
                <div
                    id='blackoverlay'
                    className='w-full h-full bg-gradient-to-b from-transparent to-background'
                ></div>
            </div>
            <main className='max-w-7xl mx-auto mt-24 z-10 relative px-6'>
                <Link href={"/"} className='text-muted-foreground text-sm'>
                    <ArrowLeft className='scale-75 inline-block' /> Voltar para o início
                </Link>
                <div className='flex gap-4 items-center mt-16 flex-wrap'>
                    <a
                        id='badge'
                        className='px-6 py-2 text-xs bg-gradient-to-br rounded-full  from-g_purple/90 to-g_darkpurple/90 text-white'
                    >
                        Termos legais
                    </a>
                    <p className='text-muted-foreground text-sm'>
                        Atualizado por último em: 24/10/2023
                    </p>
                </div>
                <article className='mt-4 max-w-3xl'>{children}</article>
            </main>
        </>
    );
}
