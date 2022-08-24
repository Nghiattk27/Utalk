import React, { useState, useEffect } from 'react'
import axios from 'axios';
import './Newfeed.css'
import Header from '../../Header/Header/Header';
import Post from '../../Posts/Post/Post';
import InfiniteScroll from "react-infinite-scroll-component";
import { useLocation, useNavigate, useParams } from 'react-router-dom';

function Newfeed() {

    let location = useLocation();
    let query = new URLSearchParams(location.search);

    const [posts, setPosts] = useState([]);

    useEffect(() => {
        const getUser = async () => {
            // const res = await axios.get('https://utalk-backend-nodejs.herokuapp.com/api/getUser', {
            //     params: {
            //         id: userId,
            //     }
            // })
            // setUserId(res.data.id)
            const followers = await axios.get('https://utalk-backend-nodejs.herokuapp.com/api/getFollower', {
                params: {
                    userId: query.get('id'),
                }
            })

            if (followers.data) {
                followers.data.map(async (follower) => {
                    const res = await axios.get('https://utalk-backend-nodejs.herokuapp.com/api/getPosts', {
                        params: {
                            id: follower.user_id,
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
            }
            else {
            }
        }
        return tmp;
    }

    return (
        <div className='Newfeed'>
            <h2>wow</h2>
            {
                query.get('id') && (
                    <Header userId={query.get('id')} />
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
                    posts && query.get('id') && (
                        uniqueArray(posts.sort((a, b) => postsHandleSort(a, b))).map(
                            post => {
                                return <Post post={post} visitorId={query.get('id')} />
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