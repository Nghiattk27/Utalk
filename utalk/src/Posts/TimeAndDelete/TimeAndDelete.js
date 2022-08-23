import React, { useRef, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './TimeAndDelete.css';

function TimeAndDelete({ post, PostRef, user }) {

    const [editClickState, setEditClickState] = useState(false);
    const deleteRef = useRef();
    const navigate = useNavigate();

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


    const homePageOnClick = () => {
        navigate(`/Profile?id=${user.id}`);
        navigate(0);
    }

    return (
        <div className='TimeAndDelete'>
            <div className='userBx'>
                <div className='imgTimeBx'>
                    <img src={user.user_avatar} onClick={homePageOnClick} />
                </div>
                <h3>{user.first_name + " " + user.last_name}</h3>
            </div>
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