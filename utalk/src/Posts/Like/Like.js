import React from 'react';
import './Like.css';
import { useState, useRef } from 'react';
import defaultLike from '../images/defaultLike.png';
import likeIcon from '../images/like.png';



function Like() {

    const [like, setLike] = useState(defaultLike);
    const likeIconRef = useRef();

    const resetLikeButton = () => {
        if (like == defaultLike) {
            setLike(likeIcon);
            //   setNumberOfLikes(prev => Math.max(0, prev + 1));
            likeIconRef.current.className = "likeIconUp active";
        }
        else {
            //   setNumberOfLikes(prev => Math.max(0, prev - 1));
            setLike(defaultLike);
            likeIconRef.current.className = "likeIconUp";
        }
    }

    return (
        <div className='Like'>
            <button onClick={resetLikeButton}>
                <div className='likeImgBx'>
                    <img src={like} />
                </div>
            </button>
            <div className='likeIconUp' ref={likeIconRef}>
                <img src={likeIcon} />
            </div>
        </div>
    )
}

export default Like