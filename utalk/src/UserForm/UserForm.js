import React from 'react'
import './UserForm.css';
import utalk from '../images/utalk.png';

function UserForm() {
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
                <input type='text' placeholder=''
                ></input>
                <p>Tên của bạn</p>
                <input type='text' placeholder=''
                ></input>
                <p>Email của bạn</p>
                <input type='email' placeholder=''
                ></input>

                <button>Xong</button>
            </div>
        </div>
    )
}

export default UserForm