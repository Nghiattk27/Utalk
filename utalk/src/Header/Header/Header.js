import React from 'react';
import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Header.css';
import SearchHeader from './SearchHeader/SearchHeader';

function Header({ userId }) {

    const [user, setUser] = useState({});
    const [control, setControl] = useState(false);

    const controlRef = useRef();
    const navigate = useNavigate();

    const closeOpenMenus = (e) => {
        if (controlRef.current && control && !controlRef.current.contains(e.target)) {
            setControl(false);
        }
    }

    document.addEventListener('mousedown', closeOpenMenus);

    useEffect(() => {
        const getUser = async () => {
            const res = await axios.get('https://utalk-backend-nodejs.herokuapp.com/api/getVisitorInfo', {
                params: {
                    id: userId,
                },
            })
            setUser(res.data.user);
        }
        getUser();
    }, [])

    const homePageOnClick = () => {
        navigate(`/Profile?id=${userId}&visitorId=${userId}`);
        navigate(0);
    }

    const profileOnClick = () => {
        setControl(true);
    }

    const newFeedHandleClick = () => {
        navigate(`/Newfeed?id=${userId}`);
        navigate(0);
    }

    const loginHandleClick = () => {
        navigate(`/`);
        navigate(0);
    }

    return (
        <div className='Header'>
            <SearchHeader visitorId={userId} />
            <div className='newfeedBx'>
                <h2 onClick={newFeedHandleClick}>NewFeed</h2>
            </div>
            <div className='socketBx'>
                <div className='notificationBx'>
                    <i className="fa-solid fa-bell"></i>
                </div>
                <div className='profileBx' onClick={profileOnClick}>
                    <img src={user.user_avatar} />
                    {
                        control && (
                            <div className='control' ref={controlRef}>
                                <ul>
                                    <li onClick={homePageOnClick}>
                                        <i className="fa-solid fa-house-user"></i>
                                        <h2>Trang chủ</h2>
                                    </li>
                                    <li>
                                        <i className="fa-solid fa-gear"></i>
                                        <h2>Thông tin cá nhân</h2>
                                    </li>
                                    <li onClick={loginHandleClick}>
                                        <i className="fa-solid fa-right-from-bracket"></i>
                                        <h2>Đăng xuất</h2>
                                    </li>
                                </ul>
                            </div>
                        )
                    }
                </div>
            </div>
        </div>
    )
}

export default Header