import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import "./SearchHeader.css";

function SearchHeader() {

    const [userList, setUserList] = useState();
    const [valueSearchInput, setValueSearchInput] = useState("");
    const inputRef = useRef();
    const userListRef = useRef();
    const navigate = useNavigate();

    useEffect(() => {
        const users = async () => {
            const res = await axios.get('http://localhost:8082/api/getAllUsers');
            setUserList(res.data);
        }
        users();
    }, [])

    const inputHandleChange = () => {
        if (inputRef.current.value == "") {
            userListRef.current.style.height = 0;
        }
        else {
            userListRef.current.style.height = 'auto';
        }
        setValueSearchInput(inputRef.current.value);
    }

    const liHandleClick = (user_id) => {
        navigate(`/Profile?id=${user_id}`);
        navigate(0);
    }

    return (
        <div className='SearchHeader'>
            <i className="fa-solid fa-magnifying-glass"></i>
            <input type="text" placeholder='Tìm kiếm' spellCheck="false"
                onChange={inputHandleChange} ref={inputRef}></input>
            {
                userList && (
                    <ul className='userList' ref={userListRef}>
                        {
                            userList.map((user) => {
                                if ((user.first_name + " " + user.last_name).includes(valueSearchInput)) {
                                    return <li key={user.first_name} onClick={() => liHandleClick(user.id)}>
                                        {user.first_name + " " + user.last_name}
                                    </li>
                                }
                            })
                        }
                    </ul>
                )
            }
        </div>
    )
}

export default SearchHeader