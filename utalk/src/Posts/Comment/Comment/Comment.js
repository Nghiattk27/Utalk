import React, { useEffect, useRef, useState } from 'react';
import './Comment.css';
import axios from 'axios';
import ava from '../../images/ava.png';

function Comment({ comment, visitorId }) {

    const textAreaRef = useRef();
    const CommenetRef = useRef();
    const [textAreaUpdateAble, setTextAreaUpdateAble] = useState(true);
    const [user, setUser] = useState({});

    useEffect(() => {
        textAreaRef.current.style.height = "5px";
        textAreaRef.current.style.height = textAreaRef.current.scrollHeight + "px";
    }, [])

    useEffect(() => {
        const getUser = async () => {
            const res = await axios.get('http://localhost:8082/api/getUser', {
                params: {
                    id: comment.user_id,
                }
            })
            setUser(res.data);
        }
        getUser();
    }, [])

    const deletePostComment = async () => {
        await axios.post('http://localhost:8082/api/deletePostComment', {
            id: comment.id,
        })
    }

    const editPostComment = async (content) => {
        await axios.put('http://localhost:8082/api/updatePostComment', {
            id: comment.id,
            content: content,
        })
    }

    const textAreaOnInput = () => {
        textAreaRef.current.style.height = "5px";
        textAreaRef.current.style.height = textAreaRef.current.scrollHeight + "px";
    }

    const deleteHandleClick = () => {
        deletePostComment();
        CommenetRef.current.style.display = 'none';
    }

    const editHandleClick = () => {
        setTextAreaUpdateAble(false);
        let end = textAreaRef.current.value.length;
        textAreaRef.current.setSelectionRange(end, end);
        textAreaRef.current.focus();
        textAreaRef.current.style.background = 'rgb(217, 215, 215)';
    }

    const textAreaHandleKeyDown = (e) => {
        if (e.which === 13 && !e.shiftKey) {
            editPostComment(textAreaRef.current.value);
            textAreaRef.current.blur();
            textAreaRef.current.style.background = 'none';
        }
    }

    const processTimeDate = (s) => {
        let now = new Date();
        let d = new Date(s);

        if (now.getFullYear() == d.getFullYear()) {
            if (now.getMonth() == d.getMonth()) {
                if (now.getDate() == d.getDate()) {
                    return 'hôm nay'
                }
                else {
                    return `${now.getDate() - d.getDate()} ngày trước`
                }
            }
            else {
                return `${now.getMonth() - d.getMonth()} tháng trước`
            }
        }
        else {
            return `${now.getFullYear() - d.getFullYear()} năm trước`
        }

    }

    return (
        <div className='Comment' ref={CommenetRef}>
            <div className='commentAvatar'>
                <img src={user.user_avatar} />
            </div>
            <div className='commentContent'>
                <h2>Nghia Pham</h2>
                <textarea spellCheck="false" ref={textAreaRef}
                    onChange={textAreaOnInput}
                    readOnly={textAreaUpdateAble} onKeyDown={(e) => textAreaHandleKeyDown(e)}>
                    {comment.content}
                </textarea>
            </div>
            {
                comment.user_id == visitorId && (
                    <div className='editBx'>
                        <div className='editActions'>
                            <h3 onClick={deleteHandleClick}>xóa</h3>
                            <h3 onClick={editHandleClick}>sửa</h3>
                        </div>
                    </div>
                )
            }
            <div className='timeCreatedBx'>
                <p>{processTimeDate(comment.createdAt)}</p>
            </div>
        </div>
    )
}

export default Comment