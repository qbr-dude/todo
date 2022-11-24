import React from 'react'
import { Helmet } from 'react-helmet-async';
import { useParams } from 'react-router-dom';
import styles from './tasks.module.scss';

type Props = {}

const queueTasks = [
    { id: 1, name: 'some' },
    { id: 3, name: 'some' },
    { id: 4, name: 'some' },
    { id: 6, name: 'some' },
]

const Tasks = (props: Props) => {
    const { id } = useParams();

    return (
        <div>
            <Helmet>
                <title>Project №{id}</title>
            </Helmet>
            <div>{id}</div>
            <div className={styles.stages}>
                <div className={`${styles.stage} ${styles.queue}`}>
                    <span className={styles.label}>Queue</span>
                    <div>
                        {queueTasks.map(task =>
                            <div key={task.id}>
                                {task.name}
                            </div>
                        )}
                    </div>
                </div>
                <div className={`${styles.stage} ${styles.development}`}>
                    <span className={styles.label}>Development</span>
                </div>
                <div className={`${styles.stage} ${styles.done}`}>
                    <span className={styles.label}>Done</span>
                </div>
            </div>
        </div>
    )
}

export default Tasks