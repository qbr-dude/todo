import { Editor } from '@tinymce/tinymce-react';
import React, { useRef, useState, memo, useEffect } from 'react'
import { DraggableProvided } from 'react-beautiful-dnd';
import { Editor as TinyMCEEditor } from 'tinymce';
import { calculateTime, getFormatedDate } from '../../helpers';
import { useAppDispatch, useEscaping } from '../../hooks/hooks';
import { ModalViewActions } from '../../store/modalReducer';
import { StateListsActions } from '../../store/stateListsReducer';
import { IClickHandler, IModalView, ITask } from '../../types/types';
import Button from '../UI/button';
import Input from '../UI/input';
import Comment from './comment';
import styles from './task.module.scss';

type SmallProps = {
    task: ITask;
    state: string;
    provided: DraggableProvided;
}

export const SmallTaskView = (props: SmallProps) => {

    const dispatch = useAppDispatch();

    const handleClick: IClickHandler = ({ id, state }) => {
        const modalProps: IModalView = {
            status: 'shown',
            taskID: id as string,
            stateID: state as string
        }
        dispatch({ type: ModalViewActions.CHANGE_FULL, payload: modalProps });
    }

    return (
        <div
            className={`${styles['small-task']} ${styles[props.state]}`}
            ref={props.provided.innerRef}
            {...props.provided.draggableProps}
            {...props.provided.dragHandleProps}
            onClick={() => handleClick({ id: props.task.id, state: props.state })}
        >
            <div>
                <span className={styles.label}>{props.task.heading}</span>
                <span>Приоритет: {props.task.priority}</span>
                <span>Комментариев: {props.task.comments?.length}</span>
            </div>
        </div>
    )
}

type Props = {
    task: ITask | null;
    status: string;
}

export const ModalTaskView = memo((props: Props) => {

    const dispatch = useAppDispatch();
    const [hasChanges, setHasChanges] = useState(false)

    const taskNameRef = React.createRef<HTMLInputElement>();
    const descriptionRef = useRef<TinyMCEEditor | null>(null);
    const priorityRef = React.createRef<HTMLInputElement>();

    /**
     * Закрытие модального окна
     */
    const closeModal = () => {
        // setHasChanges(false);
        dispatch({ type: ModalViewActions.CHANGE_STATUS, payload: 'hidden' });
    }

    useEscaping(closeModal);

    /**
     * Обработка нажатия мимо модального окна
     * @param {React.MouseEvent<HTMLElement>} event 
     */
    const handleOutModalClick: React.MouseEventHandler = (event: React.MouseEvent<HTMLElement>) => {
        if (event.target === event.currentTarget)
            closeModal();
    }

    /**
     * Обработка начала редактирования. // TODO сделать для всех позиций ITask
     * @param str 
     */
    const handleEditing = (str: string) => {
        // Удаление тегов из строки
        const item = str.replace(/<(.|\n)*?>/g, '');

        // FIXME обработка description, сделать для всех
        // if (item !== props.task?.description)
        //     setHasChanges(true);
        // else
        //     setHasChanges(false);

        console.log(str);


        setHasChanges(true);
    }

    /**
     * Применение и запись результатов изменения в Redux
     * //TODO добавить ли валидацию на изменение исходных данных?
     */
    const handleEditEnd = () => {
        const newTask = { ...props.task! };

        if (taskNameRef.current) {
            newTask.heading = taskNameRef.current.value;
        }
        if (priorityRef.current) {
            newTask.priority = priorityRef.current.value;
        }
        if (descriptionRef.current) {
            newTask.description = descriptionRef.current.getContent();
        }

        dispatch({ type: StateListsActions.UPDATE_STATE_LIST, payload: newTask });
        setHasChanges(false);
    }

    return (
        <div
            className={`${styles['modal-view']} ${styles[props.status]}`}
            onClick={handleOutModalClick}
        >
            <div className={styles.task} id={props.task?.id}>
                <div className={styles.text}>
                    <div className={styles.heading}>
                        <Input
                            value={props.task?.heading!}
                            type='second'
                            style={{ fontSize: '35px' }}
                            inputRef={taskNameRef}
                            onEdit={handleEditing}
                        />
                    </div>
                    <span className={styles.date}>({getFormatedDate(props.task?.createDate!)} - дата2)</span>
                    <div className={styles['sub-text']}>
                        <div className={styles.description}>
                            <span className={styles.label}>Описание</span>
                            <Editor
                                apiKey='q86eiw12h8war83jo0kmq6cncj0ugr4xe5kudhhx8b4w7zmx'
                                onInit={(evt, editor) => descriptionRef.current = editor}
                                initialValue={props.task?.description}
                                init={{
                                    statusbar: false,
                                    min_height: 200,
                                    height: 200,
                                    width: '100%',
                                    menubar: false,
                                    plugins: [
                                        'advlist autolink lists link image charmap print preview anchor',
                                        'searchreplace visualblocks code fullscreen',
                                        'insertdatetime media table paste code help wordcount'
                                    ],
                                    toolbar: false,
                                    content_style: '* {color: #51459E; font-size: 18px}'
                                }}
                                onEditorChange={handleEditing}
                            />
                        </div>
                        <div className={styles.subtasks}>
                            <span className={styles.label}>Подзадачи</span>
                        </div>
                    </div>
                    <div className={styles['comment-area']}>
                        <span className={styles.label}>Комментарии</span>
                        <div className={styles.comments}>
                            <Comment comment={{ id: 0, taskID: props.task?.id!, date: Date.now(), text: 'Новый комментарий' }} />
                        </div>
                    </div>
                </div>
                <div className={styles.info}>
                    <span className={styles.label}>Информация</span>
                    <span className={styles['info-item']}>Время в работе: {calculateTime(props.task?.createDate!, new Date())}</span>
                    <span className={styles['info-item']}>
                        Приоритет:
                        {<Input
                            type='second'
                            value={props.task?.priority}
                            inputRef={priorityRef}
                            onEdit={handleEditing}
                        />}
                    </span>
                    <span className={styles['info-item']}>Текущий статус: {props.task?.currentStatus?.toUpperCase()}</span>
                    <div className={styles.files}>
                        <span className={styles.label}>Вложенные файлы</span>
                    </div>
                </div>
                <div className={styles.buttons}>
                    <Button style='second' handler={handleEditEnd} disabled={!hasChanges}>
                        Принять изменения
                    </Button>
                    <Button style='exit' handler={closeModal}>
                        Закрыть
                    </Button>
                </div>
            </div>
        </div>
    )
});