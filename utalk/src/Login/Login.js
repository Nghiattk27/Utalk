import React from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useState, useRef } from 'react';
import "./Login.css";
import SignUp from '../SignUp/SignUp';
import utalk from './images/utalk.png';
import login from "./images/login.png";

const url = 'http://localhost:8082/api/login';

function Login() {

  const [view, setView] = useState('none');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const [warning, setWarning] = useState('Hãy điền thông tin tài khoản');
  const warningRef = useRef();
  const warningIcon = useRef();

  const navigate = useNavigate();

  const loginClick = async () => {
    try {
      const res = await axios.post(url, {
        username: username,
        password: password,
      })
      console.log(res.data);
      setWarning(res.data.message);
      if (res.data.message === 'Đăng nhập thành công') {
        navigate(`/Profile?id=${res.data.userId}`);
        warningRef.current.className = 'warning accepted';
        warningIcon.current.className = 'fa-solid fa-circle-check';
        console.log(res.data.userId);
      }
      else {
        warningRef.current.className = 'warning';
        warningIcon.current.className = 'fa-solid fa-circle-exclamation';
      }
    }
    catch (e) {

    }
  }
  const signUpClick = () => {
    if (view == 'none')
      setView('block');
    else
      setView('none');
  }
  return (
    <div className='Login'>
      <div className='content'>
        <div className='loginform'>
          <div className='logo'>
            <img src={utalk} />
          </div>
          <div className='info'>
            <img src={login} />
            <h2>Chào mừng bạn trở lại với Utalk</h2>
            <div>
              <i className="fa-solid fa-user"></i>
              <input type='text' placeholder='Tên đăng nhập'
                value={username} onChange={(e) => setUsername(e.target.value)}></input>
            </div>
            <div>
              <i className="fa-solid fa-key"></i>
              <input type='password' placeholder='Mật khẩu'
                value={password} onChange={(e) => setPassword(e.target.value)}></input>
            </div>
            <div className='warning' ref={warningRef}>
              <i className="" ref={warningIcon}></i>
              <h3>{warning}</h3>
            </div>
            <button className='signInBx' onClick={loginClick}>Đăng nhập</button>
            <button className='signUpBx' onClick={signUpClick}>Chưa có tài khoản</button>
          </div>
        </div>
      </div>
      <SignUp view={view} signUpClick={signUpClick} />
    </div>
  )
}

export default Login