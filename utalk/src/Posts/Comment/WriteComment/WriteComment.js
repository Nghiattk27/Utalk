import React, { useRef, useState } from 'react';
import './WriteComment.css';
import axios from 'axios';
import ava from "../../images/ava.png";

function WriteComment({ visitorId, postId, comments, setComments, visitor }) {

    const textareaRef = useRef();

    const addPostComment = async (content) => {
        const res = await axios.post('http://localhost:8082/api/addPostComment', {
            visitorId: visitorId,
            postId: postId,
            content: content,
        })
        setComments([res.data, ...comments]);
    }

    const textAreaOnInput = () => {
        textareaRef.current.style.height = "5px";
        textareaRef.current.style.height = textareaRef.current.scrollHeight + "px";
    }

    const textAreaHandleKeyDown = async (e) => {
        if (e.which === 13 && !e.shiftKey) {
            await addPostComment(textareaRef.current.value);
            textareaRef.current.value = "";
            textareaRef.current.blur();
            textareaRef.current.style.height = "5px";
            textareaRef.current.style.height = textareaRef.current.scrollHeight + "px";
        }
    }

    return (
        <div className='WriteComment'>
            <div className='WriteCommentAvatar'>
                <img src={visitor.user_avatar} />
            </div>
            <div className='MyComment'>
                <textarea placeholder="Để lại bình luận của bạn" spellCheck="false"
                    ref={textareaRef}
                    onInput={textAreaOnInput}
                    onKeyDown={(e) => textAreaHandleKeyDown(e)}>
                </textarea>
            </div>
        </div>
    )
}

export default WriteComment