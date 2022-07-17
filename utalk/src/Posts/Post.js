import React, { useEffect } from 'react'
import { useState, useRef } from 'react';
import Emoji from './Emoji/Emoji.js';
import './Post.css';
import ava from './images/ava.png';
import defaultLike from './images/defaultLike.png';

function Post(post) {

  const [emoji, setEmoji] = useState(defaultLike);
  const [numberOfLikes, setNumberOfLikes] = useState(0);

  const button = useRef("");
  const myAudio = useRef("");
  const seekSlider = useRef("");

  const [value, setValue] = useState(0);
  const [duration, setDuration] = useState();

  function convertMinute(x) {
    if (!x) return '0:00';

    let min = Math.floor(x / 60);
    let sec = Math.floor(x % 60);
    if (sec < 10) {
      return `${min}:0${sec}`;
    }
    else {
      return `${min}:${sec}`;
    }
  };
  const clickButton = () => {
    if (button.current.className === "fa-solid fa-play") {
      button.current.className = "fa-solid fa-pause";
      button.current.style.color = "rgb(249, 242, 32)";
      myAudio.current.play();
    }
    else {
      button.current.className = "fa-solid fa-play";
      button.current.style.color = "rgb(255, 55, 55)";
      myAudio.current.pause();
    }
  }
  const changeSeek = () => {
    const progess = (myAudio.current.currentTime / myAudio.current.duration * 100);
    seekSlider.current.style.background = `linear-gradient(to right,rgb(241, 50, 50) 0%, rgb(241, 50, 50) ${progess}%,  #fff ${progess}%, #fff 100%)`;
    console.log(progess);
    if (progess == 100) {
      button.current.className = "fa-solid fa-play";
      button.current.style.color = "rgb(255, 55, 55)";
      myAudio.current.pause();
    }
    setValue(progess);
  }
  const rewind = (e) => {
    const seekTime = e.target.value / 100 * myAudio.current.duration;
    myAudio.current.currentTime = seekTime;
  }
  const onDurationChangeHandler = (e) => {
    setDuration(convertMinute(e.target.duration));
  }
  const resetLikeButton = () => {
    setEmoji(defaultLike);
    setNumberOfLikes(prev => Math.max(0, prev - 1));
  }
  function formText(x) {
    if (x == 0) {
      return 'Hãy là người đầu tiên quan tâm đến điều này';
    }
    else {
      return `${x} người quan tâm đến điều này`;
    }
  }
  return (
    <div className='Post'>
      <div className='content'>
        <h2 className='title'>{post.post.post_title}</h2>
        <div className="audioBx">
          <div className='button' onClick={clickButton}>
            <span><i ref={button} className="fa-solid fa-play"></i></span>
          </div>
          <div className='seekBar'>
            <span>{convertMinute(myAudio.current.currentTime)}</span>
            <input type='range' className='seekSlider' min='0' max='100'
              value={value} step='0.01' ref={seekSlider} onInput={(e) => rewind(e)} />
            <span>{duration}</span>
          </div>
          <audio ref={myAudio} onTimeUpdate={changeSeek} onDurationChange={(e) => onDurationChangeHandler(e)}>
            <source src={post.post.post_audio_path} type="audio/mp3" />
          </audio>
          <div className='likeBx'>
            <div className='reactionBx'>
              <div className='reactions'>
                <Emoji setEmoji={setEmoji} emoji={emoji} setNumberOfLikes={setNumberOfLikes} defaultLike={defaultLike} />
              </div>
              <button onClick={resetLikeButton}>
                <div className='imgBx'>
                  <img src={emoji} />
                </div>
              </button>
            </div>
            <h2 className='care'>
              {formText(numberOfLikes)}
            </h2>
          </div>
        </div>
      </div>
      <div className='imgBx'>
        <div className='profileImg'>
          <img src={ava} />
        </div>
      </div>
    </div>
  )
}

export default Post