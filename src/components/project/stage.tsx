import React, { memo, useCallback } from 'react'
import { Draggable, DraggableProvided, Droppable, DroppableProvided, DroppableStateSnapshot } from 'react-beautiful-dnd';
import { capitalize } from '../../helpers';
import { ITask } from '../../types/types';
import styles from './../../pages/tasks/tasks.module.scss';
import { SmallTaskView } from './task';

type Props = {
    name: string;
    list: ITask[];
}

const Stage = (props: Props) => {

    /**
     * Отдельный рендер, иначе не обновляются значения после изменений в модалке
     */
    const renderSmallTaskView = useCallback((task: ITask, providedDraggable: DraggableProvided) => {
        return (
            <SmallTaskView
                task={task}
                provided={providedDraggable}
                state={props.name}
            />
        )
    }, [props.list]);

    return (
        <Droppable droppableId={props.name} >
            {(provided: DroppableProvided) => (
                <div
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                    className={`${styles.stage} ${styles[props.name]}`}
                >
                    <span className={styles.label}>{capitalize(props.name)}</span>
                    {props.list.map((task, index) =>
                        <Draggable key={task.id} draggableId={task.id} index={index} >
                            {(providedDraggable: DraggableProvided) => (
                                renderSmallTaskView(task, providedDraggable)
                            )}
                        </Draggable>)}
                    {provided.placeholder}
                </div>
            )}
        </Droppable >
    )
}

export default Stage