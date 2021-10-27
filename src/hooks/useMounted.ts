import { useEffect, useState } from "react"

export const useMounted = () => {
    const [isMounted, setIsMounted] = useState<boolean>(true);

    useEffect(() => {
        setIsMounted(true);

        return () => {
            setIsMounted(false);
        }
    }, []);

    return {isMounted};
}