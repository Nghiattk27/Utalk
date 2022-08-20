import React, { useRef, useState } from 'react';
import axios from 'axios';
import './TimeAndDelete.css';

function TimeAndDelete({ post, PostRef }) {

    const [editClickState, setEditClickState] = useState(false);
    const deleteRef = useRef();

    const closeOpenMenus = (e) => {
        if (deleteRef.current && editClickState && !deleteRef.current.contains(e.target)) {
            setEditClickState(false);
        }
    }

    const deletePost = async (id) => {
        const res = await axios.post('http://localhost:8082/api/deletePost', {
            postId: id,
        })
    }

    document.addEventListener('mousedown', closeOpenMenus);

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

    const deleteHandleClick = () => {
        deletePost(post.id);
        PostRef.current.style.display = 'none';
    }

    return (
        <div className='TimeAndDelete'>
            <h4>{processTimeDate(post.createdAt)}</h4>
            <div className='editTimeAndDeleteBx'>
                <i className="fa-solid fa-ellipsis" onClick={() => { setEditClickState(true) }}></i>
                {
                    editClickState && (
                        <h4 ref={deleteRef} onClick={deleteHandleClick}>xóa bài</h4>
                    )
                }
            </div>
        </div>
    )
}

export default TimeAndDelete