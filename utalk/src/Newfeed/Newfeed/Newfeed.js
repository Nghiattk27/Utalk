import React, { useState, useEffect } from 'react'
import axios from 'axios';
import './Newfeed.css'
import Header from '../../Header/Header/Header';
import Post from '../../Posts/Post/Post';
import InfiniteScroll from "react-infinite-scroll-component";

function Newfeed() {

    const [userId, setUserId] = useState();
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        const getUser = async () => {
            const res = await axios.get('http://localhost:8082/api/getUserInfo', {
                params: {
                    id: 0,
                },
                withCredentials: true,
            })
            setUserId(res.data.visitor.userId);
            const followers = await axios.get('http://localhost:8082/api/getFollower', {
                params: {
                    userId: res.data.visitor.userId,
                }
            })
            console.log(followers.data);
            if (followers.data) {
                followers.data.map(async (follower) => {
                    const res = await axios.get('http://localhost:8082/api/getPosts', {
                        params: {
                            userId: follower.user_id,
                        },
                    })
                    res.data.map(newPost => {
                        return setPosts(prev => [...prev, newPost]);
                    })
                })
            }
        }
        getUser();
    }, [])


    const postsHandleSort = (a, b) => {
        return b.id - a.id;
    }

    const uniqueArray = (arr) => {
        let tmp = [];
        let tmpId = -1;
        for (let i = 0; i < arr.length; i++) {
            if (arr[i].id != tmpId) {
                tmpId = arr[i].id;
                tmp.push(arr[i]);
                console.log(tmpId);
            }
            else {
                console.log(1);
            }
        }
        return tmp;
    }

    return (
        <div className='Newfeed'>
            <h2>wow</h2>
            {
                userId && (
                    <Header userId={userId} />
                )
            }
            {
                posts && posts.length == 0 && (
                    <div className='noOne'>
                        <h1>Bạn chưa theo dõi bất kì ai </h1>
                    </div>
                )
            }
            <div className='postBxofNewfeed'>
                {
                    posts && userId && (
                        uniqueArray(posts.sort((a, b) => postsHandleSort(a, b))).map(
                            post => {
                                return <Post post={post} visitorId={userId} />
                            }
                        )
                    )
                }
            </div>
            <h2 style={{ opacity: 0 }}>wow</h2>
        </div>
    )
}
export default Newfeed