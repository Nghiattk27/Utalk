import React, { useEffect } from 'react';
import './Like.css';
import axios from 'axios';
import { useState, useRef } from 'react';
import defaultLike from '../images/defaultLike.png';
import likeIcon from '../images/like.png';

function Like({ visitorId, postId }) {

    const [like, setLike] = useState(defaultLike);
    const likeIconRef = useRef();
    const [amountLike, setAmountLike] = useState(0);

    useEffect(() => {
        const getAllLike = async () => {
            const res = await axios.get('https://utalk-backend-nodejs.herokuapp.com/api/countAllPostLike', {
                params: {
                    visitorId: visitorId,
                    postId: postId,
                }
            })
            setAmountLike(res.data.amount);
            if (res.data.state == true) {
                setLike(likeIcon);
            }
        }
        getAllLike();
    }, [])

    const addPostLike = async () => {
        const res = await axios.post('https://utalk-backend-nodejs.herokuapp.com/api/addPostLike', {
            visitorId: visitorId,
            postId: postId,
        })
    }

    const deletePostLike = async () => {
        const res = await axios.post('https://utalk-backend-nodejs.herokuapp.com/api/deletePostLike', {
            visitorId: visitorId,
            postId: postId,
        })
    }

    const resetLikeButton = () => {
        if (like == defaultLike) {
            setLike(likeIcon);
            setAmountLike(amountLike + 1);
            addPostLike();
            likeIconRef.current.className = "likeIconUp active";
        }
        else {
            setLike(defaultLike);
            setAmountLike(amountLike - 1);
            deletePostLike();
            likeIconRef.current.className = "likeIconUp";
        }
    }

    return (
        <div className='Like'>
            <h2 className='amountLike'>{amountLike} lượt thích</h2>
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