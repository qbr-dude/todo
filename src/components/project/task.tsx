import { Editor } from '@tinymce/tinymce-react';
import React, { useRef, useCallback, memo, useEffect } from 'react'
import { DraggableProvided } from 'react-beautiful-dnd';
import { Editor as TinyMCEEditor } from 'tinymce';
import { calculateTime } from '../../helpers';
import { useAppDispatch, useEscaping } from '../../hooks/hooks';
import { ModalViewActions } from '../../store/modalReducer';
import { IClickHandler, IModalView, ITask } from '../../types/types';
import Button from '../UI/button';
import styles from './task.module.scss';

type SmallProps = {
    task: ITask;
    state: string;
    provided: DraggableProvided;
}

export const SmallTaskView = React.memo((props: SmallProps) => {

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
})

type Props = {
    task: ITask | null;
    status: string;
}

export const ModalTaskView = memo((props: Props) => {

    const dispatch = useAppDispatch();

    const descriptionRef = useRef<TinyMCEEditor | null>(null);

    /**
     * Закрытие модального окна
     */
    const closeModal = () => {
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

    const handleEditing = (str: string, editor: TinyMCEEditor) => {
        // setEditorTimeout()
    }

    return (
        <div
            className={`${styles['modal-view']} ${styles[props.status]}`}
            onClick={handleOutModalClick}
        >
            <div className={styles.task} id={props.task?.id}>
                <div className={styles.text}>
                    <span className={styles.heading}>{props.task?.heading}</span>
                    <br />
                    <span className={styles.date}>(дата1 - дата2)</span>
                    <div className={styles.description}>
                        <span>Описание</span>
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
                                content_css: 'editor.scss',
                            }}
                            onEditorChange={handleEditing}
                        />
                    </div>
                </div>
                <div className={styles.info}>
                    <span className={styles.label}>Информация</span>
                    <span>Время в работе: {calculateTime(props.task?.createDate!, new Date())}</span>
                    <span>Приоритет: {props.task?.priority}</span>
                    <span>Текущий статус: {props.task?.currentStatus?.toUpperCase()}</span>
                    <div className={styles.files}>
                        <span className={styles.label}>Вложенные файлы</span>
                    </div>
                </div>
                <div className={styles.buttons}>
                    <Button
                        style='second'
                        handler={closeModal}>
                        Close
                    </Button>
                </div>
            </div>
        </div>
    )
});