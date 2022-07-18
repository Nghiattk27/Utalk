import React, { useState } from 'react';
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import "./Profile.css";
import Post from '../Posts/Post.js';
import CreatePost from './CreatePost/CreatePost';
import MyEditor from '../MyEditor/MyEditor';
import ava from './images/ava.png';
import background from './images/background.jpg';

function Profile() {

  let location = useLocation();
  let query = new URLSearchParams(location.search);

  const [user, setUser] = useState({});
  const [posts, setPosts] = useState([]);
  const [editAvatar, setEditAvatar] = useState(false);

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

  useEffect(() => {
    const getPosts = async () => {
      const res = await axios.get('http://localhost:8082/api/getPosts', {
        params: {
          userId: query.get("id"),
        }
      })
      setPosts(res.data);
    }
    getPosts();
  }, [])
  return (
    <div className='Profile'>
      {
        editAvatar && (
          <div className='editBx'>
            <MyEditor userId={query.get('id')} />
          </div>
        )
      }
      <div className='imgBx'>
        <div className='background'>
          <img src={background} />
        </div>
        <div className='avatar'>
          <img src={ava} />
          <div className='changeAvatar' onClick={() => setEditAvatar(!editAvatar)}>
            <i className="fa-solid fa-camera"></i>
          </div>
        </div>
        <h2>{user.first_name + " " + user.last_name}</h2>
      </div>
      <CreatePost userId={user.id} />
      {/* {
        posts.map((post) => {
          return <Post post={post} />
        })
      } */}
    </div >
  )
}

export default Profile