import React, { useCallback, useEffect } from 'react'
import { useState, useRef } from 'react';
import './Post.css';
import axios from 'axios';
import Like from '../Like/Like.js';
import CommentButton from '../Comment/CommentButton/CommentButton.js';
import Share from '../Share/Share';
import CommentBx from '../Comment/CommentBx/CommentBx';
import Audio from '../Audio/Audio';
import PostImageRotate from '../PostImageRotate/PostImageRotate';
import WriteComment from '../Comment/WriteComment/WriteComment';
import TimeAndDelete from '../TimeAndDelete/TimeAndDelete';

function Post({ post, visitorId }) {

  const [user, setUser] = useState({});
  const [visitor, setVisitor] = useState({});
  const [commentButtonState, setCommentButtonState] = useState(false);
  const [comments, setComments] = useState();
  const PostRef = useRef();

  useEffect(() => {
    const getUser = async () => {
      const res = await axios.get('http://localhost:8082/api/getUser', {
        params: {
          id: post.user_id
        }
      })
      setUser(res.data);
    }
    getUser();
  }, [])

  useEffect(() => {
    const getVisitor = async () => {
      const res = await axios.get('http://localhost:8082/api/getUser', {
        params: {
          id: visitorId,
        }
      })
      setVisitor(res.data);
    }
    getVisitor();
  }, [])

  useEffect(() => {
    const getAllcomment = async () => {
      const comment = await axios.get('http://localhost:8082/api/getAllPostComment', {
        params: {
          postId: post.id,
        }
      })
      setComments(comment.data.comments);
    }
    getAllcomment();
  }, [])

  const [audioState, setAudioState] = useState("pause");
  return (
    <div className='Post' ref={PostRef}>
      <div className='content'>
        <h2 className='title'>{post.post_title}</h2>
        <div className='timeAndDeleteBx'>
          <TimeAndDelete post={post} PostRef={PostRef} />
        </div>
        <PostImageRotate post_image_path={post.post_image_path} audioState={audioState} setAudioState={setAudioState} />
        <Audio src={post.post_audio_path} audioState={audioState} setAudioState={setAudioState} />
        <div className='postAction'>
          <Like visitorId={visitorId} postId={post.id} />
          <CommentButton setCommentButtonState={setCommentButtonState} commentButtonState={commentButtonState} />
          <Share />
        </div>
        <div className='writeComment'>
          <WriteComment postId={post.id} setComments={setComments} comments={comments} visitorId={visitorId} user={user} visitor={visitor} />
        </div>
        {
          commentButtonState && (
            <CommentBx postId={post.id} visitorId={visitorId} post={post} user={user} visitor={visitor} comments={comments} />
          )
        }
      </div>
    </div>
  )
}

export default Post