import { useMounted } from "./useMounted";

export const useAsync = (asyncFunc: () => void) => {
    const {isMounted} = useMounted();

    return () => {
        if (isMounted)
            asyncFunc();
    }
}