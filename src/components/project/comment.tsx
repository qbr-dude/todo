import React, { useRef } from 'react'
import { getFormatedDate } from '../../helpers';
import { Editor as TinyMCEEditor } from 'tinymce';
import { ITaskComment } from '../../types/types'
import { Editor } from '@tinymce/tinymce-react';
import styles from './comment.module.scss';

type Props = {
    comment: ITaskComment;
}

const Comment = (props: Props) => {

    const commentRef = useRef<TinyMCEEditor | null>(null);

    return (
        <div className={styles.comment}>
            <div className={styles.editor}>
                <Editor
                    apiKey='q86eiw12h8war83jo0kmq6cncj0ugr4xe5kudhhx8b4w7zmx'
                    onInit={(evt, editor) => commentRef.current = editor}
                    initialValue={props.comment.text}
                    init={{
                        statusbar: false,
                        height: '100%',
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
                />
            </div>
            <span className={styles.date}>{getFormatedDate(props.comment.date)}</span>
        </div>
    )
}

export default Comment