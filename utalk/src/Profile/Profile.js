import React, { useState } from 'react';
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import "./Profile.css";
import Post from '../Posts/Post.js';
import ava from './images/ava.png';
import background from './images/background.jpg';

function Profile() {

  let location = useLocation();

  let query = new URLSearchParams(location.search);

  const [user, setUser] = useState({});

  useEffect(() => {
    const getUser = async () => {
      const res = await axios.get('http://localhost:8082/api/getUserInfo', {
        params: {
          id: query.get("id"),
        }
      })
      setUser(res.data)
    }
    getUser();
  }, [])

  return (
    <div className='Profile'>
      <div className='imgBx'>
        <div className='background'>
          <img src={background} />
        </div>
        <div className='avatar'>
          <img src={ava} />
        </div>
        <h2>{user.first_name + " " + user.last_name}</h2>
      </div>
      <div className='createPost'>
        <div className='textBx'>
          <h2>Chia sẻ một điều gì mới mẻ ?</h2>
        </div>
        <textarea type='text' placeholder='Tiêu đề..' spellcheck="false" resize="false"></textarea>
        <div className='uploadBx'>
          <label for='upload'>
            <input type='file' id='upload'>
            </input>
          </label>
          <h3>Tải file audio của bạn lên</h3>
        </div>
        <button className='postButton'>Đăng bài</button>
      </div>
      <Post />
    </div >
  )
}

export default Profile