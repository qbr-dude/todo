import React, { useState, useEffect } from 'react';
import { IEditHandler } from '../../types/types';
import styles from './ui.module.scss';

type Props = {
    value?: string;
    type?: string;
    style?: React.CSSProperties;
    placeholder?: string;
    inputRef?: React.LegacyRef<HTMLInputElement>;
    onEdit?: IEditHandler;
}

const Input = (props: Props) => {

    const [value, setValue] = useState('');
    const getInputStyle = () => props.type ? props.type : 'main';

    /**
     * Подгрузка значения в input
     */
    useEffect(() => {
        if (!props.value)
            return;
        setValue(props.value);
    }, [props.value])


    /**
     * Обработка изменения, используется и useState, u external Ref
     * @param event 
     */
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setValue(event.target.value);
        if (props.onEdit)
            props.onEdit(event.target.value);
    }

    /**
     * Обработка нажатия кнопок
     * Пока для Enter
     * @param event 
     */
    const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            event.preventDefault();
            (event.target as HTMLInputElement).blur();
        }
    }

    return (
        <input
            className={`${styles.input} ${styles[getInputStyle()]}`}
            type="text"
            onChange={handleChange}
            value={value}
            style={props.style}
            placeholder={props.placeholder}
            ref={props.inputRef}
            onKeyUp={handleKeyPress}
        />
    )
}

export default Input