import React, { useCallback, useEffect } from 'react'
import { useState, useRef } from 'react';
import './PostImageRotate.css';

function PostImageRotate({ post_image_path, audioState, setAudioState }) {

    const PostImgBxRef = useRef();
    const imgRef = useRef();
    const PostImgRotate = useRef();
    const playBgRef = useRef();
    const defaultBgRef = useRef();

    const [playPauseIcon, setPlayPauseIcon] = useState("fa-solid fa-play");

    const PostImgAnimation = useCallback((state) => {
        if (!PostImgRotate.current) {
            PostImgRotate.current = imgRef.current.animate([
                {
                    transform: 'rotate(360deg)',
                }
            ], {
                duration: 10000,
                iterations: Infinity
            })
        }
        PostImgRotate.current.pause();
        if (state == "play") PostImgRotate.current.play();
        else PostImgRotate.current.pause();
        console.log(state);
    }, [])

    useEffect(() => {
        if (audioState == "pause") {
            defaultBgRef.current.style.opacity = '1';
            setPlayPauseIcon("fa-solid fa-play");
            PostImgAnimation("pause");
        }
        else {
            defaultBgRef.current.style.opacity = '0';
            setPlayPauseIcon("fa-solid fa-pause");
            PostImgAnimation("play");
        }
    }, [audioState])

    const PostImgOnClick = () => {
        if (audioState == "pause") {
            PostImgAnimation("play");
            setAudioState("play");
        }
        else {
            PostImgAnimation("pause");
            setAudioState("pause");
        }
    }

    const postImgBxHandleMouseOver = () => {
        playBgRef.current.style.opacity = "1";
    }

    const postImgBxHandleMouseOut = () => {
        playBgRef.current.style.opacity = "0";
    }

    return (
        <div className='PostImageRotate'>
            <div className='PostImgBx' onClick={PostImgOnClick} ref={PostImgBxRef}
                onMouseOver={postImgBxHandleMouseOver}
                onMouseOut={postImgBxHandleMouseOut}>
                <img src={post_image_path} ref={imgRef} />
                <div className='playBg' ref={playBgRef}>
                    <i className={playPauseIcon}></i>
                </div>
                <div className='defaultBg' ref={defaultBgRef}>
                    <i className="fa-solid fa-play"></i>
                </div>
            </div>
        </div>
    )
}

export default PostImageRotate