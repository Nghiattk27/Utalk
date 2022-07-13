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
  const [file, setFile] = useState();
  const [progressBar, setProgressBar] = useState(0);
  const [errMessage, SetErrMessage] = useState('');

  const uploadFileClick = async () => {
    console.log(file);
    if (file) {
      const data = new FormData();
      data.append("file", file);
      try {
        const res = await axios.post('http://localhost:8082/api/uploadFile', data, {
          onUploadProgress: ProgressEvent => {
            setProgressBar(
              parseInt(Math.round(ProgressEvent.loaded * 100) / ProgressEvent.total)
            )
          }
        })
        if (res.data.errCode == 1) {
          SetErrMessage(res.data.message);
        }
      }
      catch (e) {

      }

    } else {
      console.log("Hãy chọn file audio của bạn");
    }
  }

  const fileNameElement = () => {
    if (!file) {
      return <h3>Tải file audio của bạn lên</h3>
    }
    else {
      let fileName = file.name;
      let tmp = '';

      if (fileName.length > 25) {
        for (let i = fileName.length - 1; i > 0; i--) {
          if (fileName[i] != '.') {
            tmp = fileName[i].concat(tmp);
          }
          else {
            fileName.slice(0, i - 1);
            break;
          }
        }
        console.log(tmp);
        fileName = fileName.substring(0, 20) + '...' + tmp;
      }
      return <h3>{fileName}</h3>
    }
  }

  const errMessageElement = () => {

    if (errMessage) {
      return (
        <div className='errBx'>
          <i className='fa-solid fa-circle-exclamation'></i>
          <h3>{errMessage}</h3>
        </div>
      )
    }
  }
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
        <textarea type='text' placeholder='Tiêu đề..' spellCheck="false" resize="false"></textarea>
        <div className='uploadBx'>
          <label htmlFor='upload'>
            <i className="fa-solid fa-plus"></i>
            <input type='file' id='upload' name='audioFile'
              onChange={(e) => { setFile(e.target.files[0]) }}></input>
          </label>
          {fileNameElement()}
        </div>
        {errMessageElement()}
        <button className='postButton' onClick={uploadFileClick}>Đăng bài</button>
      </div>
      <Post />
    </div >
  )
}

export default Profile