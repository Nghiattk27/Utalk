import React, { useState } from 'react';
import { useEffect } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import "./Profile.css";
import Post from '../Posts/Post/Post.js';
import CreatePost from './CreatePost/CreatePost';
import Header from '../Header/Header/Header';
import userImg from '../images/userImg.png';

function Profile() {

  let location = useLocation();
  let query = new URLSearchParams(location.search);

  // let { userId } = useParams();

  const [user, setUser] = useState({});
  const [visitor, setVisitor] = useState();
  const [posts, setPosts] = useState([]);

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
  }, [])

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
        visitor && visitor.userId == user.id &&
        <CreatePost userId={user.id} />
      }
      {
        visitor && visitor.userId && (
          posts.map((post) => {
            return <Post post={post} visitorId={visitor.userId} key={post.id} />
          })
        )
      }
    </div >
  )
}

export default Profile