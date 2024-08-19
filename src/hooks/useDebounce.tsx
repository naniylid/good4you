import {useEffect, useState} from 'react';

function useDebounce(value: string, delay = 500) {
    const [debouncedValue, setDebouncedValue] = useState(value);

    useEffect(() => {
        const time = setTimeout(() => {
            setDebouncedValue(value);
        }, delay);

        return () => {
            clearTimeout(time);
        };
    }, [value, delay]);

    return debouncedValue;
}

export default useDebounce;