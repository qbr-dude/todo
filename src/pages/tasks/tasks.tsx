import { useState, useEffect } from 'react'
import { Helmet } from 'react-helmet-async';
import { useParams } from 'react-router-dom';
import { DragDropContext, DropResult } from 'react-beautiful-dnd';
import styles from './tasks.module.scss';
import { IMoveResult, ITask, ITaskStateLists } from '../../types/types';
import { moveTask, reorder } from '../../helpers';
import Stage from '../../components/project/stage';
import { ModalTaskView } from '../../components/project/task';
import { actionTypes } from '../../store/stateListsReducer';
import { useAppDispatch, useAppSelector } from '../../hooks/hooks';

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

type Props = {}

const Tasks = (props: Props) => {
    const { id } = useParams();
    const dispatch = useAppDispatch();
    const stateLists = useAppSelector(state => state);
    const [shownModal, setShownModal] = useState('hidden');

    // инициализация задач для текущего проекта
    useEffect(() => {
        const initList: ITaskStateLists = {
            queue: initQueueTasks,
            development: initDevTasks,
            done: initDoneTasks,
        }

        dispatch({ type: actionTypes.UPDATE_FULL_STATE, payload: initList })
    }, [])

    // обработка перемещения задачи
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
                dispatch({ type: actionTypes.UPDATE_QUEUE, payload: tasks });
            else if (destination.droppableId === 'development')
                dispatch({ type: actionTypes.UPDATE_DEVELOPMENT, payload: tasks });
            else if (destination.droppableId === 'done')
                dispatch({ type: actionTypes.UPDATE_DONE, payload: tasks });

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

            dispatch({ type: actionTypes.UPDATE_FULL_STATE, payload: stateToPush });
        }

    }

    return (
        <div>
            <Helmet>
                <title>Project №{id}</title>
            </Helmet>
            <div className={styles.header}>
                <div className={styles.naming}>
                    <span>Project №{id}</span>
                    <span>Количество задач: 150</span>
                </div>
                <div>
                    <button>Add new task</button>
                </div>
            </div>
            <DragDropContext onDragEnd={onDragEnd}>
                <div className={styles.stages}>
                    <Stage name='queue' list={stateLists.queue} />
                    <Stage name='development' list={stateLists.development} />
                    <Stage name='done' list={stateLists.done} />
                </div>
            </DragDropContext>
            <ModalTaskView status='hidden' />
        </div>
    )
}

export default Tasks