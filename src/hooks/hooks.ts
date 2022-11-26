import { useCallback, useEffect } from 'react';
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