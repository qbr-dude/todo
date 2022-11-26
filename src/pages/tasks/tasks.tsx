import { useState, useEffect, useCallback } from 'react'
import { Helmet } from 'react-helmet-async';
import { useParams } from 'react-router-dom';
import { DragDropContext, DropResult } from 'react-beautiful-dnd';
import styles from './tasks.module.scss';
import { IMoveResult, ITask, ITaskStateLists } from '../../types/types';
import { getFreeListID, moveTask, reorder } from '../../helpers';
import Stage from '../../components/project/stage';
import { ModalTaskView } from '../../components/project/task';
import { StateListsActions } from '../../store/stateListsReducer';
import { useAppDispatch, useAppSelector } from '../../hooks/hooks';
import Button from '../../components/UI/button';
import { ModalViewActions } from '../../store/modalReducer';

const initQueueTasks: ITask[] = [
    { id: "queue-0", heading: 'Some', currentStatus: 'queue' },
    { id: "queue-1", heading: 'Some', currentStatus: 'queue' },
    { id: "queue-2", heading: 'Some', currentStatus: 'queue' },
    { id: "queue-3", heading: 'Some', currentStatus: 'queue' },
]
const initDevTasks: ITask[] = [
    { id: "development-0", heading: 'soMe', currentStatus: 'development' },
    { id: "development-1", heading: 'soMe', currentStatus: 'development' },
    { id: "development-2", heading: 'soMe', currentStatus: 'development' },
    { id: "development-3", heading: 'soMe', currentStatus: 'development' },
]
const initDoneTasks: ITask[] = [
    { id: "done-0", heading: 'somE', currentStatus: 'done' },
    { id: "done-1", heading: 'somE', currentStatus: 'done' },
    { id: "done-2", heading: 'somE', currentStatus: 'done' },
    { id: "done-3", heading: 'somE', currentStatus: 'done' },
]

const getGeneralTaskCount = (list: ITaskStateLists): number => {
    if (list)
        return list.queue.length + list.development.length + list.done.length;
    return 0;
}

type Props = {}

const Tasks = (props: Props) => {

    const { id } = useParams();
    const dispatch = useAppDispatch();
    const stateLists = useAppSelector(state => state.stateListsR);
    const modalProps = useAppSelector(state => state.modalR);

    // инициализация задач для текущего проекта
    useEffect(() => {
        const initList: ITaskStateLists = {
            queue: initQueueTasks,
            development: initDevTasks,
            done: initDoneTasks,
        }

        dispatch({ type: StateListsActions.UPDATE_FULL_STATE, payload: initList })
    }, [])

    /**
     * Получение определенной задачи из "общего" списка задач
     * @param {string} id
     * @param {string} state
     * @returns {ITask | null}
     */
    const getTaskFromStateLists = useCallback((id: string, state: string): ITask | null => {
        if (!stateLists || !id || !state)
            return null;
        const _state = stateLists[state as keyof typeof stateLists];
        const _task = _state.find(task => task.id === id);
        if (_task)
            return _task;

        return null;
        // throw new Error(`No such task: ${_state} ${id} ${state}`);
    }, [modalProps.taskID]);

    /**
     * Стандартная обработка, с офф. сайта
     * @param {DropResult} result 
     * @returns 
     */
    const onDragEnd = (result: DropResult) => {
        const { source, destination } = result;

        if (!destination)
            return;

        if (source.droppableId === destination.droppableId) {
            // перемещение внутри stage
            const tasks = reorder(
                stateLists[source.droppableId as keyof typeof stateLists],
                source.index,
                destination.index
            );

            if (destination.droppableId === 'queue')
                dispatch({ type: StateListsActions.UPDATE_QUEUE, payload: tasks });
            else if (destination.droppableId === 'development')
                dispatch({ type: StateListsActions.UPDATE_DEVELOPMENT, payload: tasks });
            else if (destination.droppableId === 'done')
                dispatch({ type: StateListsActions.UPDATE_DONE, payload: tasks });

        } else {
            // Перемещение между stages
            const moveResult: IMoveResult = moveTask(
                stateLists[source.droppableId as keyof typeof stateLists],
                stateLists[destination.droppableId as keyof typeof stateLists],
                source,
                destination
            )

            const stateToPush = stateLists;
            stateToPush[moveResult.oldStateName as keyof typeof stateToPush] = moveResult.oldStageList!;
            stateToPush[moveResult.newStateName as keyof typeof stateToPush] = moveResult.newStageList!;

            dispatch({ type: StateListsActions.UPDATE_FULL_STATE, payload: stateToPush });
        }

    }


    /**
     * Обработка нажатия кнопки добавления новой задачи
     */
    const handleAddNewTask = () => {
        const newTask: ITask = {
            id: `queue-${getFreeListID(stateLists.queue).toString()}`,
            heading: 'Новая задача',
            priority: 'Не задан',
            currentStatus: 'queue',
            createDate: new Date(),
            description: 'Вы можете добавить описание здесь',
            comments: [],
        }
        const _modalProps = {
            status: 'shown',
            taskID: newTask.id,
            stateID: 'queue',
        }
        dispatch({ type: ModalViewActions.CHANGE_FULL, payload: _modalProps });
        dispatch({ type: StateListsActions.UPDATE_QUEUE, payload: [...stateLists.queue, newTask] });
    }

    return (
        <div>
            <Helmet>
                <title>Project №{id}</title>
            </Helmet>
            <div className={styles.header}>
                <div className={styles.naming}>
                    <span>Project №{id}</span>
                    <span>Количество задач: {getGeneralTaskCount(stateLists)}</span>
                </div>
                <Button handler={handleAddNewTask}>
                    Добавить новую задачу
                </Button>
            </div>
            <DragDropContext onDragEnd={onDragEnd}>
                <div className={styles.stages}>
                    <Stage name='queue' list={stateLists.queue} />
                    <Stage name='development' list={stateLists.development} />
                    <Stage name='done' list={stateLists.done} />
                </div>
            </DragDropContext>
            <ModalTaskView
                status={modalProps.status}
                task={getTaskFromStateLists(modalProps.taskID!, modalProps.stateID!)}
            />
        </div>
    )
}

export default Tasks