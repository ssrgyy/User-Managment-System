import { useState } from "react";

export const useSelect = (initialIndex: number) => {
    const [index, setValue] = useState(initialIndex);

    const onChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setValue(event.target.selectedIndex);
    }

    return {index, onChange};
}