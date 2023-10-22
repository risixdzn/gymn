import { ArrowRight, X } from "lucide-react";
import { Button } from "../ui/button";
import Link from "next/link";

export default function CTABanner({
    text,
    cta,
    href,
    boldPhrase,
}: {
    text: string;
    cta: string;
    href: string;
    boldPhrase?: string;
}) {
    return (
        <div id='wrapper' className='w-full absolute bottom-0 h-auto p-3'>
            <div
                id='banner'
                className='w-full rounded-lg z-50 isolate flex items-center gap-x-6 overflow-hidden bg-gradient-to-br from-g_purple to-g_darkpurple px-6 py-2.5 sm:px-3.5 sm:before:flex-1'
            >
                <div className='flex flex-wrap items-center gap-x-4 gap-y-2 text-white'>
                    <p className='text-sm leading-6 '>
                        {boldPhrase && (
                            <>
                                <strong className='font-semibold'>{boldPhrase}</strong>
                                <svg
                                    viewBox='0 0 2 2'
                                    className='mx-2 inline h-0.5 w-0.5 fill-current'
                                    aria-hidden='true'
                                >
                                    <circle cx='1' cy='1' r='1' />
                                </svg>
                            </>
                        )}
                        {text}
                    </p>
                    <Link href={href}>
                        <Button className='px-3.5 py-1 h-auto rounded-full' variant={"secondary"}>
                            {cta}
                            <ArrowRight className='scale-75 ml-1' />
                        </Button>
                    </Link>
                </div>
                <div className='flex flex-1 justify-end'>
                    <Button
                        size={"icon"}
                        variant={"ghost"}
                        className='hover:bg-transparent p-0 w-auto h-auto'
                    >
                        <X className='scale-75 text-white' />
                    </Button>
                </div>
            </div>
        </div>
    );
}
