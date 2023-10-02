import React, {Dispatch, SetStateAction, useEffect, useState} from "react";

export function useLocalStorage<T>(storageKey: string, fallbackState: T): [T , Dispatch<SetStateAction<T>> ] {
    const storedString = localStorage.getItem(storageKey);
    let parsedObject = null;

    if (storedString !== null) parsedObject = JSON.parse(storedString);

    const [value, setValue] = useState<T>(parsedObject ?? fallbackState);

    useEffect(() => {
        localStorage.setItem(storageKey, JSON.stringify(value));
    }, [value, storageKey]);

    return [value, setValue];
}