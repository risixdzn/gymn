"use client";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function DashboardNotFound() {
    const router = useRouter();
    return (
        <div className='w-full h-[calc(100vh-10rem)] lg:h-[calc(100vh-5rem)] flex items-center justify-center flex-col'>
            <Image src={"/g_Icon.png"} alt='' width={60} height={60} />
            <h1 className='text-3xl lg:text-5xl font-semibold tracking-tighter mt-5'>
                Página não encontrada
            </h1>
            <p className='text-muted-foreground text-sm mt-3'>
                Não encontramos a página que você queria
            </p>
            <Button className='mt-4' onClick={() => router.back()}>
                <ArrowLeft className='scale-75' /> Voltar
            </Button>
        </div>
    );
}
