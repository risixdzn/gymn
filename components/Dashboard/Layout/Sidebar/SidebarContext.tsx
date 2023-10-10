"use client";

import { usePathname } from "next/navigation";
import { Dispatch, ReactNode, SetStateAction, createContext, useEffect, useState } from "react";

interface SidebarContextType {
    sidebarOpen: boolean;
    setSidebarOpen: Dispatch<SetStateAction<boolean>>;
    isClient: boolean;
    screenWidth: number;
    pathname: string;
}

export const SidebarData = createContext<SidebarContextType>({
    sidebarOpen: false,
    setSidebarOpen: () => {}, // Provide a no-op function as default
    isClient: false,
    screenWidth: 0,
    pathname: "",
});

export default function SidebarContext({ children }: { children: ReactNode }) {
    const [sidebarOpen, setSidebarOpen] = useState<boolean>(false);
    const [isClient, setIsClient] = useState(false);
    const [screenWidth, setScreenWidth] = useState<number>(0); // Inicializa com 0

    const pathname = usePathname();

    function getCurrentDimension() {
        return window.innerWidth;
    }

    //HANDLER Sidebar Size
    useEffect(() => {
        setIsClient(true);
        setScreenWidth(getCurrentDimension()); // Define a largura inicial quando o componente é montado

        // Adiciona o event listener apenas no lado do cliente
        const updateDimension = () => {
            setScreenWidth(getCurrentDimension());
        };
        window.addEventListener("resize", updateDimension);

        return () => {
            window.removeEventListener("resize", updateDimension); // Remove o event listener ao desmontar o componente
        };
    }, []);

    return (
        <SidebarData.Provider
            value={{ sidebarOpen, setSidebarOpen, isClient, screenWidth, pathname }}
        >
            {children}
        </SidebarData.Provider>
    );
}
