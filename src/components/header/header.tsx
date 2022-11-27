import React from 'react'
import { useNavigate } from 'react-router-dom';
import Input from '../UI/input';
import styles from './header.module.scss';

type Props = {}

const Header = (props: Props) => {
    const navigate = useNavigate();
    return (
        <header className={styles.header}>

            <span className={styles.label} onClick={() => navigate(`/projects`)}>TODO</span>

            <div>
                <Input placeholder='Начните поиск' />
            </div>

        </header>
    )
}

export default Header;