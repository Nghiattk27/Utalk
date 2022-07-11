import React from 'react';
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

  let user = {};

  useEffect(() => {
    const getUser = async () => {
      const res = await axios.get('http://localhost:8082/api/getUserInfo', {
        params: {
          id: query.get("id"),
        }
      })
      user = res;
      console.log(res.data);
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
        <h2>{user.last_name}</h2>
      </div>
      <Post />
    </div>
  )
}

export default Profile