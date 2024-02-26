"use client";

import { ReactNode, useState, useEffect } from "react";
import { motion } from "framer-motion";

export default function PagesContainer({ children }: { children: ReactNode }) {
    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
        setIsClient(true);
    }, []);

    if (!isClient) {
        return;
    }

    return (
        <section
            className='w-full lg:w-[calc(100%-20rem)] h-auto
            ml-0 lg:ml-80
            mt-16 lg:mt-14
            lg:flex lg:flex-col absolute
            px-5 lg:px-10 py-3 lg:py-7'
        >
            {children}
        </section>
    );
}
