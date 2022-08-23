import React, { useState } from 'react';
import { useEffect } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import "./Profile.css";
import Post from '../Posts/Post/Post.js';
import CreatePost from './CreatePost/CreatePost';
import Header from '../Header/Header/Header';
import userImg from '../images/userImg.png';
import Follow from './Follow/Follow';

function Profile() {

  let location = useLocation();
  let query = new URLSearchParams(location.search);

  const [user, setUser] = useState({});
  const [visitor, setVisitor] = useState();
  const [posts, setPosts] = useState([]);
  const [render, setRender] = useState(true);
  const [createState, setCreatState] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const getUser = async () => {
      const res = await axios.get('http://localhost:8082/api/getUserInfo', {
        params: {
          id: query.get('id'),
        },
        withCredentials: true,
      })
      setVisitor(res.data.visitor);
      setUser(res.data.user);
    }
    getUser();
  }, [])

  useEffect(() => {
    const getPosts = async () => {
      const res = await axios.get('http://localhost:8082/api/getPosts', {
        params: {
          userId: query.get('id'),
        }
      })
      setPosts(res.data);
    }
    getPosts();
  }, [render])

  return (
    <div className='Profile'>
      {
        visitor && (
          <Header userId={visitor.userId} />
        )
      }
      <div className='imgBx'>
        <div className='avatar'>
          <img src={user.user_avatar ? user.user_avatar : userImg} />
          <div className='changeAvatar' onClick={() => navigate(`/UpdateAvatar?id=${query.get('id')}`)}>
            <i className="fa-solid fa-camera"></i>
          </div>
        </div>
        <h2>{user.first_name + " " + user.last_name}</h2>
      </div>
      {
        visitor && user && visitor.userId != user.id && (
          <div className='followBx'>
            <Follow userId={user.id} visitorId={visitor.userId} />
          </div>
        )
      }
      {
        visitor && visitor.userId == user.id &&
        (
          <div className='openCreatePostBx'>
            <div className='imgCreateBx'>
              <img src={user.user_avatar} />
            </div>
            <input placeholder='Tạo bài viết mới' className='createInput' readOnly
              onClick={() => { setCreatState(true) }}></input>
          </div>
        )
      }

      {
        createState &&
        <div className='createBg'>
          <CreatePost userId={user.id} render={render} setRender={setRender} setCreatState={setCreatState} />
        </div>
      }

      {
        visitor && visitor.userId && (
          [...posts].reverse().map((post) => {
            return <Post post={post} visitorId={visitor.userId} key={post.id} />
          })
        )
      }
    </div >
  )
}

export default Profile