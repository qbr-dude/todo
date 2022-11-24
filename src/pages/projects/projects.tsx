import React from 'react';
import styles from './projects.module.scss';
import { useNavigate } from 'react-router-dom';

type Props = {}

const projects = [
    { id: 1, name: 'Some Name', tasks: 10 },
    { id: 2, name: 'Some Name', tasks: 10 },
    { id: 3, name: 'Some Name', tasks: 10 },
    { id: 4, name: 'Some Name', tasks: 10 },
    { id: 5, name: 'Some Name', tasks: 10 },
]

/**
 * Рисовка проектов
 * Для навигации используется router-dom
 */
const Projects = (props: Props) => {
    const navigate = useNavigate();

    return (
        <div className={styles.list}>
            {projects.map(project =>
                <div className={styles.item}
                    key={project.id}
                    onClick={() => navigate(`/projects/${project.id}`)}>
                    <span className={styles.name}>{project.name}</span>
                    <div className={styles.info}>
                        <span>Текущих задач: {project.tasks}</span>
                        <span>Комментариев: 0</span>
                    </div>
                </div>
            )}
        </div>
    )
}

export default Projects;