import React from 'react';
import axios from 'axios';
import { useState, useRef, useEffect } from 'react';
import './SignUp.css';
import signup from './images/signup.png';
const url = 'http://localhost:8082/api/signup';

function SignUp({ view, signUpClick }) {

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [warning, setWarning] = useState('');
  const warningRef = useRef();
  const warningIcon = useRef();
  const handleSubmit = async () => {
    try {
      if (password === confirmPassword) {
        const res = await axios.post(url, {
          username: username,
          password: password,
        })
        setWarning(res.data);
        if (res.data == 'A new account created') {
          setUsername('');
          setPassword('');
          setConfirmPassword('');
          warningRef.current.className = 'warning accepted';
          warningIcon.current.className = 'fa-solid fa-circle-check';
        }
        else {
          warningRef.current.className = 'warning';
          warningIcon.current.className = 'fa-solid fa-circle-exclamation';
        }
      }
      else {
        setWarning('xác nhận mật khẩu không trùng khớp');
        warningRef.current.className = 'warning';
        warningIcon.current.className = 'fa-solid fa-circle-exclamation';
      }
    } catch (e) {
      console.log(e.response)
    }
  }
  const singUpRef = useRef('');

  useEffect(() => {
    singUpRef.current.style.display = view;
  });

  return (
    <div className='SignUp' ref={singUpRef}>
      <div className='background' onClick={signUpClick}>
      </div>
      <div className='SignUpForm'>
        <div className='imgBx'>
          <img src={signup} />
        </div>
        <h2>Hãy điền thông tin tài khoản của bạn</h2>
        <div className='input'>
          <i className="fa-solid fa-user"></i>
          <input type='text' placeholder='Tên đăng nhập'
            value={username} onChange={(e) => setUsername(e.target.value)}></input>
        </div>
        <div className='input'>
          <i className="fa-solid fa-key"></i>
          <input type='password' placeholder='Mật khẩu'
            value={password} onChange={(e) => setPassword(e.target.value)}></input>
        </div>
        <div className='input'>
          <i className="fa-solid fa-key"></i>
          <input type='password' placeholder='Xác nhận mật khẩu'
            value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)}></input>
        </div>
        <div className='warning' ref={warningRef}>
          <i className="" ref={warningIcon}></i>
          <h3>{warning}</h3>
        </div>
        <button className='done' onClick={() => handleSubmit()}>Hoàn thành</button>
      </div>
    </div>
  )
}

export default SignUp