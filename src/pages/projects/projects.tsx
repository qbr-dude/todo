import React, { useEffect } from 'react';
import styles from './projects.module.scss';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector, useSessionStorage } from '../../hooks/hooks';
import { ProjectActions } from '../../store/projectsReducer';
import { Helmet } from 'react-helmet-async';
import { IProject } from '../../types/types';

type Props = {}

const initProjects = [
    { id: 1, name: 'Some Name', tasksCount: 0 },
    { id: 2, name: 'Some Name', tasksCount: 0 },
    { id: 3, name: 'Some Name', tasksCount: 0 },
    { id: 4, name: 'Some Name', tasksCount: 0 },
    { id: 5, name: 'Some Name', tasksCount: 0 },
]

/**
 * Рисовка проектов
 * Для навигации используется router-dom
 */
const Projects = (props: Props) => {
    const navigate = useNavigate();

    const dispatch = useAppDispatch();
    const projects = useAppSelector(state => state.projectsR);
    const [storedProjects, setStoredProjects] = useSessionStorage('projects');

    useEffect(() => {
        if (projects.length !== 0) {
            setStoredProjects(projects);
            return;
        }

        // TODO если нужно будет делать создание проектов (тогда нужно убрать initProjects)
        let initList;
        if (!storedProjects || storedProjects.length === 0) {
            initList = initProjects;
            setStoredProjects(initList);
        }
        else {
            initList = storedProjects
        }

        dispatch({ type: ProjectActions.INIT_PROJECTS, payload: initList });
    }, [])

    return (
        <div>
            <Helmet>
                <title>Projects</title>
            </Helmet>
            <div className={styles.header}>
                <div className={styles.naming}>
                    <span className={styles.label}>Список текущих проектов</span>
                    <span className={styles.sublabel}>Количество проектов: {projects.length}</span>
                </div>
                {/* <>
                button? // TODO создание проектов
                </> */}
            </div>
            <div className={styles.list}>
                {projects.map(project =>
                    <div className={styles.item}
                        key={project.id}
                        onClick={() => navigate(`/projects/${project.id}`)}>
                        <span className={styles.name}>{project.name}</span>
                        <div className={styles.info}>
                            <span>Текущих задач: {project.tasksCount}</span>
                            <span>Комментариев: 0</span>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}

export default Projects;