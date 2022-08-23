import React, { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import './Follow.css'

function Follow({ userId, visitorId }) {

    const [followContent, setFollowContent] = useState("")
    const followRef = useRef();

    useEffect(() => {
        const check = async () => {
            const res = await axios.get('http://localhost:8082/api/checkFollower', {
                params: {
                    userId: userId,
                    followerId: visitorId,
                }
            })
            if (res.data == true) {
                setFollowContent("Đã theo dõi");
                followRef.current.style.background = 'rgb(21, 192, 67)';
            }
            else {
                setFollowContent("Theo dõi");
                followRef.current.style.background = 'rgb(247, 53, 53)';
            }
        }
        check();
    }, [])

    const addFollower = async () => {
        const res = await axios.post('http://localhost:8082/api/addFollower', {
            userId: userId,
            followerId: visitorId,
        })
    }

    const deleteFollower = async () => {
        const res = await axios.post('http://localhost:8082/api/deleteFollower', {
            userId: userId,
            followerId: visitorId,
        })
    }

    const followHandleClick = () => {
        if (followContent == "Theo dõi") {
            addFollower();
            setFollowContent("Đã theo dõi");
            followRef.current.style.background = 'rgb(21, 192, 67)';
        }
        else {
            deleteFollower();
            setFollowContent("Theo dõi");
            followRef.current.style.background = 'rgb(247, 53, 53)';
        }
    }

    return (
        <div className='Follow' onClick={followHandleClick} ref={followRef}>
            <h2>{followContent}</h2>
        </div>
    )
}

export default Follow