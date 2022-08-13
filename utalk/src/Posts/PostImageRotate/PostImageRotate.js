import React, { useCallback, useEffect } from 'react'
import { useState, useRef } from 'react';
import './PostImageRotate.css';

function PostImageRotate({ post_image_path, audioState, setAudioState }) {

    const PostImgBxRef = useRef();
    const imgRef = useRef();
    const PostImgRotate = useRef();

    const PostImgAnimation = useCallback((state) => {
        if (!PostImgRotate.current) {
            PostImgRotate.current = imgRef.current.animate([
                {
                    transform: 'rotate(360deg)',
                }
            ], {
                duration: 8000,
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
            PostImgAnimation("pause");
        }
        else {
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
    return (
        <div className='PostImageRotate'>
            <div className='PostImgBx' onClick={PostImgOnClick} ref={PostImgBxRef}>
                <img src={post_image_path} ref={imgRef} />
            </div>
        </div>
    )
}

export default PostImageRotate