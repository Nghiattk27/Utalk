import React, { useRef } from 'react';
import './WriteComment.css';
import ava from "../../images/ava.png";

function WriteComment() {

    const textareaRef = useRef();
    const textAreaOnInput = () => {
        textareaRef.current.style.height = "5px";
        textareaRef.current.style.height = textareaRef.current.scrollHeight + "px";
    }

    return (
        <div className='WriteComment'>
            <div className='WriteCommentAvatar'>
                <img src={ava} />
            </div>
            <div className='MyComment'>
                <textarea placeholder="Để lại bình luận của bạn" spellCheck="false"
                    ref={textareaRef}
                    onInput={textAreaOnInput}>
                </textarea>
            </div>
        </div>
    )
}

export default WriteComment