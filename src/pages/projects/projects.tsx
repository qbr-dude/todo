import React, { useEffect } from 'react';
import styles from './projects.module.scss';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../hooks/hooks';
import { ProjectActions } from '../../store/projectsReducer';
import { IProject } from '../../types/types';

type Props = {}

const initProjects = [
    { id: 1, name: 'Some Name' },
    { id: 2, name: 'Some Name' },
    { id: 3, name: 'Some Name' },
    { id: 4, name: 'Some Name' },
    { id: 5, name: 'Some Name' },
]

/**
 * Рисовка проектов
 * Для навигации используется router-dom
 */
const Projects = (props: Props) => {
    const navigate = useNavigate();

    const dispatch = useAppDispatch();
    const projects = useAppSelector(state => state.projectsR);

    useEffect(() => {
        // TODO если нужно будет делать создание проектов
        // const json = localStorage.getItem(`projects`);
        // if (!json)
        //     return;
        // let initList = JSON.parse(json) as IProject[];

        dispatch({ type: ProjectActions.INIT_PROJECTS, payload: initProjects });
    }, [])

    // см. TODO выше
    useEffect(() => {
        localStorage.setItem(`projects`, JSON.stringify(projects));
    }, [projects])



    return (
        <div className={styles.list}>
            {projects.map(project =>
                <div className={styles.item}
                    key={project.id}
                    onClick={() => navigate(`/projects/${project.id}`)}>
                    <span className={styles.name}>{project.name}</span>
                    <div className={styles.info}>
                        <span>Текущих задач: {0}</span>
                        <span>Комментариев: 0</span>
                    </div>
                </div>
            )}
        </div>
    )
}

export default Projects;