import { useState, useEffect } from "react";

export function useGetScreenWidth() {
    const [screenWidth, setScreenWidth] = useState<number>(0);
    const [isClient, setIsClient] = useState<boolean>(false);

    function getCurrentDimension() {
        return window.innerWidth;
    }

    useEffect(() => {
        setIsClient(true);
        setScreenWidth(getCurrentDimension());

        const updateDimension = () => {
            setScreenWidth(getCurrentDimension());
        };
        window.addEventListener("resize", updateDimension);

        return () => {
            window.removeEventListener("resize", updateDimension);
        };
    }, []);

    return { screenWidth, isClient };
}
