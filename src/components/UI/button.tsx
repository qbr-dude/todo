import React from 'react'
import { IClickHandler } from '../../types/types';
import styles from './ui.module.scss';

type Props = {
    handler: IClickHandler;
    children: React.ReactNode;
    value?: string;
    style?: string;
    disabled?: boolean;
}

// 2 типа рисовки у кнопки (основной и дополнительный)
const getStyleClass = (type: string): string => (type) ? type : 'main';

const Button = React.memo((props: Props) => {
    return (
        <button
            className={`${styles.button} ${styles[getStyleClass(props.style!)]}`}
            value={props.value}
            onClick={props.handler}
            disabled={props.disabled}
        >
            {props.children}
        </button>
    )
})

export default Button