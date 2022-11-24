import React from 'react'
import styles from './header.module.scss';

type Props = {}

const Header = (props: Props) => {
    return (
        <header className={styles.header}>
            <div className={styles.chunk}>
                {/* Сделать через чанки */}
                <span className={'header-chunk-piece'}>All projects / </span>
                <span className={'header-chunk-piece'}>first</span>
            </div>

            <div>
                <span>SEARCH</span>
            </div>

            <span className={styles.label}>TODO</span>
        </header>
    )
}

export default Header;