import Image from "next/image";
import RoundLogo from "../../public/g_Icon.png";
import GymnLogo from "../ui/Icons/GymnLogo";
import { GithubIcon, TwitterIcon } from "lucide-react";
import Link from "next/link";

export default function Footer() {
    return (
        <footer className='bg-background relative'>
            <div className='mx-auto w-full max-w-screen-xl p-4 py-6 lg:py-8'>
                <div id='topinfo' className='md:flex md:justify-between'>
                    <div className='mb-6 md:mb-0'>
                        <a href='/' className='flex items-center'>
                            <Image src={RoundLogo} alt='' width={45} height={45} />
                            <GymnLogo
                                width={75}
                                className=' ml-3 fill-slate-950 dark:fill-white '
                            />
                        </a>
                    </div>
                    <div className='grid grid-cols-2 gap-8 sm:gap-6 sm:grid-cols-2'>
                        <div>
                            <h2 className='mb-6 text-sm font-semibold uppercase'>Construído com</h2>
                            <ul className='text-muted-foreground font-base text-sm'>
                                <li className='mb-4'>
                                    <a href='https://nextjs.org/' className='hover:underline'>
                                        NextJS
                                    </a>
                                </li>
                                <li>
                                    <a href='https://supabase.com/' className='hover:underline'>
                                        Supabase
                                    </a>
                                </li>
                            </ul>
                        </div>
                        <div>
                            <h2 className='mb-6 text-sm font-semibold uppercase'>Legal</h2>
                            <ul className='text-muted-foreground font-base text-sm'>
                                <li className='mb-4'>
                                    <Link
                                        href={"/legal/privacy-policy"}
                                        className='hover:underline'
                                    >
                                        Política de privacidade
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        href={"/legal/terms-and-conditions"}
                                        className='hover:underline'
                                    >
                                        Termos e condições
                                    </Link>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
                <hr className='my-6 border-border sm:mx-auto lg:my-8' />
                <div className='sm:flex sm:items-center sm:justify-between'>
                    <span className='text-sm text-muted-foreground sm:text-center '>
                        © 2023{" "}
                        <a href='https://github.com/risixdzn' className='hover:underline'>
                            Ricardo Amorim
                        </a>
                        . All Rights Reserved.
                    </span>
                    <div className='flex mt-4 space-x-5 sm:justify-center sm:mt-0'>
                        <a
                            href='#'
                            className='text-gray-500 hover:text-gray-900 dark:hover:text-white'
                        >
                            <TwitterIcon className='lg:scale-90 scale-75' />
                            <span className='sr-only'>Twitter page</span>
                        </a>
                        <a
                            href='#'
                            className='text-gray-500 hover:text-gray-900 dark:hover:text-white'
                        >
                            <GithubIcon className='lg:scale-90 scale-75' />
                            <span className='sr-only'>GitHub account</span>
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    );
}
