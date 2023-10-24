"use client";
import Link from "next/link";
import GProgress from "../ui/GProgress";
import { useState } from "react";

export default function Hero() {
    const [currentStep, setCurrentStep] = useState<number>(1);

    return (
        <section
            className='
            w-full h-screen  flex items-center justify-center
            bg-heroBGWhite bg-center bg-cover
            dark:bg-heroBGDark
            relative
        '
        >
            <div
                id='fading_gradient'
                className='absolute w-full h-full bg-gradient-to-b from-transparent via-transparent to-background'
            ></div>
            <div className='z-10 flex items-center justify-center flex-col'>
                <h1
                    className='
                    text-[2.5rem] leading-none text-center font-bold tracking-tighter drop-shadow-xl
                    lg:text-[4.5rem]
                '
                >
                    Um aplicativo,<br></br>
                    <span className='bg-gradient-to-b drop-shadow-xl from-g_purple to-g_darkpurple bg-clip-text text-transparent'>
                        duas perspectivas.
                    </span>
                </h1>
                <p
                    className='
                    text-center max-w-[25rem] mt-3
                    lg:text-[1.2rem] lg:max-w-xl lg:mt-6
                '
                >
                    A ferramenta completa para <b>proprietários</b> de academias e{" "}
                    <b>entusiastas</b> do mundo fitness.
                </p>
                <Link href='/auth'>
                    <button className='mt-3 g_xlPrimaryBtn'>Começar</button>
                </Link>
            </div>
            <div
                id='blurrycircle'
                className='absolute w-56 aspect-square bg-violet-600/70 blur-3xl'
            ></div>
            <div
                id='blurrycirclebg'
                className='absolute w-56 aspect-square dark:bg-black/50 blur-3xl'
            ></div>
        </section>
    );
}
