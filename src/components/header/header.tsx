import React from 'react'
import styles from './header.module.scss';

type Props = {}

const Header = (props: Props) => {
    return (
        <header className={styles.header}>
            <span className={styles.label}>TODO</span>

            <div>
                <input type="text" placeholder='SEARCH' />
            </div>

        </header>
    )
}

export default Header;