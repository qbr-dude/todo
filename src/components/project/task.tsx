import React from 'react'
import { DraggableProvided } from 'react-beautiful-dnd';
import Tasks from '../../pages/tasks/tasks';
import { ITaskClickHandler, ITask } from '../../types/types';
import styles from './task.module.scss';

type SmallProps = {
    task: ITask;
    state: string;
    provided: DraggableProvided;
    clickHandler: ITaskClickHandler;
}

export const SmallTaskView = (props: SmallProps) => {

    const handleClick = () => props.clickHandler(props.task.id);

    return (
        <div
            className={`${styles.task} ${styles[props.state]}`}
            ref={props.provided.innerRef}
            {...props.provided.draggableProps}
            {...props.provided.dragHandleProps}
            onClick={handleClick}
        >
            <div>
                <span className={styles.label}>{props.task.name}</span>
                <span className={styles.description}>Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugit, qui?</span>
            </div>

        </div>
    )
}

type Props = {
    status: string;
}

export const ModalTaskView = (props: Props) => {
    return (
        <div className={`${styles['modal-view']} ${styles[props.status]}`}>

        </div>
    )
}