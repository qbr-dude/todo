import React, { useState, useEffect } from 'react';
import styles from './ui.module.scss';

type Props = {
    value?: string;
    type?: string;
    style?: React.CSSProperties;
    placeholder?: string;
}

const Input = (props: Props) => {

    const [value, setValue] = useState('');
    const getInputStyle = () => props.type ? props.type : 'main';

    useEffect(() => {
        if (!props.value)
            return;
        setValue(props.value);
    }, [props.value])


    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setValue(event.target.value);
    }

    return (
        <input
            className={`${styles.input} ${styles[getInputStyle()]}`}
            type="text"
            onChange={handleChange}
            value={value}
            style={props.style}
            placeholder={props.placeholder}
        />
    )
}

export default Input