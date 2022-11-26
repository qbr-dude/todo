import React from 'react'
import { useNavigate } from 'react-router-dom';
import styles from './header.module.scss';

type Props = {}

const Header = (props: Props) => {
    const navigate = useNavigate();
    return (
        <header className={styles.header}>

            <span className={styles.label} onClick={() => navigate(`/projects`)}>TODO</span>

            <div>
                <input type="text" placeholder='SEARCH' />
            </div>

        </header>
    )
}

export default Header;