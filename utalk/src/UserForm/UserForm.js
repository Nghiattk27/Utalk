import React from 'react'
import { useState, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './UserForm.css';
import utalk from '../images/utalk.png';

function UserForm() {

    let location = useLocation();

    let query = new URLSearchParams(location.search);

    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');

    const [warning, setWarning] = useState('');
    const warningRef = useRef();
    const warningIcon = useRef();

    const navigate = useNavigate();

    const handleClick = async () => {
        if (firstName == '' || lastName == '' || email == '') {
            warningIcon.current.className = 'fa-solid fa-circle-exclamation'
            setWarning('Hãy điền đầy đủ thông tin');
        }
        else {
            const res = await axios.put('http://localhost:8082/api/updateUser', {
                id: query.get("id"),
                first_name: firstName,
                last_name: lastName,
                email: email,
            })
            navigate(`/Profile?id=${query.get("id")}`);

        }
    }
    return (
        <div className='UserForm'>
            <div className='logo'>
                <img src={utalk} />
            </div>
            <div className='title'>
                <h2>Hãy điền thông tin của bạn</h2>
            </div>
            <div className='content'>
                <p>Họ và tên đệm</p>
                <input type='text' placeholder='' spellCheck='false'
                    value={firstName} onChange={(e) => setFirstName(e.target.value)} ></input>

                <p>Tên của bạn</p>
                <input type='text' placeholder='' spellCheck='false'
                    value={lastName} onChange={(e) => setLastName(e.target.value)}></input>

                <p>Email của bạn</p>
                <input type='email' placeholder='' spellCheck='false'
                    value={email} onChange={(e) => setEmail(e.target.value)}></input>
                <div className='warning'>
                    <i className="" ref={warningIcon}></i>
                    <h3>{warning}</h3>
                </div>
                <button onClick={handleClick}>Xong</button>
            </div>
        </div>
    )
}

export default UserForm