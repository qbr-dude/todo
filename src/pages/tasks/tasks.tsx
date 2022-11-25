import React, { useState } from 'react'
import { Helmet } from 'react-helmet-async';
import { useParams } from 'react-router-dom';
import { DragDropContext, Draggable, DraggableProvided, Droppable, DroppableProvided, DropResult, } from 'react-beautiful-dnd';
import styles from './tasks.module.scss';
import { IMoveResult, ITask } from '../../types';
import { moveTask } from '../../helpers';

type Props = {}

const initQueueTasks: ITask[] = [
    { id: "queue-0", name: 'some' },
    { id: "queue-1", name: 'some' },
    { id: "queue-2", name: 'some' },
    { id: "queue-3", name: 'some' },
]
const initDevTasks: ITask[] = [
    { id: "dev-0", name: 'some' },
    { id: "dev-1", name: 'some' },
    { id: "dev-2", name: 'some' },
    { id: "dev-3", name: 'some' },
]
const initDoneTasks: ITask[] = [
    { id: "done-0", name: 'some' },
    { id: "done-1", name: 'some' },
    { id: "done-2", name: 'some' },
    { id: "done-3", name: 'some' },
]

const reorder = (list: ITask[], startIndex: number, endIndex: number): ITask[] => {
    const result = [...list];
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);

    return result;
};

const Tasks = (props: Props) => {
    const { id } = useParams();

    const [queueTasks, setQueueTasks] = useState(initQueueTasks);
    const [devTask, setDevTask] = useState(initDevTasks);
    const [doneTask, setDoneTask] = useState(initDoneTasks)

    const onDragEnd = (result: DropResult) => {
        const { source, destination } = result;

        if (!destination)
            return;

        if (source.droppableId === destination.droppableId) {

            if (destination.droppableId === 'stage-queue')
                setQueueTasks(reorder(queueTasks, source.index, destination.index));
            if (destination.droppableId === 'stage-development')
                setDevTask(reorder(devTask, source.index, destination.index));
            if (destination.droppableId === 'stage-done')
                setDoneTask(reorder(doneTask, source.index, destination.index));

        } else {
            const moveResult: IMoveResult = moveTask(

            )


        }

    }

    return (
        <div>
            <Helmet>
                <title>Project №{id}</title>
            </Helmet>
            <div>{id}</div>
            <DragDropContext onDragEnd={onDragEnd}>
                <div className={styles.stages}>
                    <Droppable droppableId='stage-queue'>
                        {(provided: DroppableProvided) => (
                            <div
                                ref={provided.innerRef}
                                {...provided.droppableProps}
                                className={`${styles.stage} ${styles.queue}`}
                            >
                                {queueTasks.map((task, index) =>
                                    <Draggable
                                        key={task.id}
                                        draggableId={task.id}
                                        index={index}
                                    >
                                        {(providedDraggable: DraggableProvided) => (
                                            <div
                                                className={`${styles.task} ${styles['task-queue']}`}
                                                ref={providedDraggable.innerRef}
                                                {...providedDraggable.draggableProps}
                                                {...providedDraggable.dragHandleProps}>
                                                <span>{task.id}</span>
                                            </div>
                                        )}
                                    </Draggable>)}
                                {provided.placeholder}
                            </div>
                        )}
                    </Droppable>
                    <Droppable droppableId='stage-development'>
                        {(provided: DroppableProvided) => (
                            <div
                                ref={provided.innerRef}
                                {...provided.droppableProps}
                                className={`${styles.stage} ${styles.development}`}
                            >
                                {devTask.map((task, index) =>
                                    <Draggable
                                        key={task.id}
                                        draggableId={task.id}
                                        index={index}
                                    >
                                        {(providedDraggable: DraggableProvided) => (
                                            <div
                                                className={`${styles.task} ${styles['task-dev']}`}
                                                ref={providedDraggable.innerRef}
                                                {...providedDraggable.draggableProps}
                                                {...providedDraggable.dragHandleProps}>
                                                <span>{task.id}</span>
                                            </div>
                                        )}
                                    </Draggable>)}
                                {provided.placeholder}
                            </div>
                        )}
                    </Droppable>
                    <Droppable droppableId='stage-done'>
                        {(provided: DroppableProvided) => (
                            <div
                                ref={provided.innerRef}
                                {...provided.droppableProps}
                                className={`${styles.stage} ${styles.done}`}
                            >
                                {doneTask.map((task, index) =>
                                    <Draggable
                                        key={task.id}
                                        draggableId={task.id}
                                        index={index}
                                    >
                                        {(providedDraggable: DraggableProvided) => (
                                            <div
                                                className={`${styles.task} ${styles['task-done']}`}
                                                ref={providedDraggable.innerRef}
                                                {...providedDraggable.draggableProps}
                                                {...providedDraggable.dragHandleProps}>
                                                <span>{task.id}</span>
                                            </div>
                                        )}
                                    </Draggable>)}
                                {provided.placeholder}
                            </div>
                        )}
                    </Droppable>
                </div>
            </DragDropContext>
        </div>
    )
}

export default Tasks