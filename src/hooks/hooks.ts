import { useCallback, useEffect, useState } from 'react';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { ICallback } from '../types/types';
import type { RootState, AppDispatch } from './../store';

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

/**
 * Вызов передаваемой функции при нажатии на ESC
 * @param {ICallback} callback 
 */
export const useEscaping = (callback: ICallback) => {
    const escFunction = useCallback((event: KeyboardEvent) => {
        if (event.key === "Escape") {
            callback();
        }
    }, []);

    useEffect(() => {
        document.addEventListener("keydown", escFunction, false);

        return () => {
            document.removeEventListener("keydown", escFunction, false);
        };
    }, []);
}

/**
 * Работа с записью в sessionStorage
 * @param key 
 * @param defaultValue 
 * @returns 
 */
export const useSessionStorage = (key: string, defaultValue?: any) => {

    const getStorageValue = (_key: string): typeof defaultValue => {
        const json = sessionStorage.getItem(_key);

        if (json === null || json === 'undefined') // idk почему undefined - строка в json
            return defaultValue;
        else
            return JSON.parse(json);
    }

    const [value, setValue] = useState(() => getStorageValue(key));

    useEffect(() => {
        sessionStorage.setItem(key, JSON.stringify(value));
    }, [value])

    return [value, setValue];
}