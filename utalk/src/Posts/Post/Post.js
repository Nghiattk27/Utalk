import React, { useCallback, useEffect } from 'react'
import { useState, useRef } from 'react';
import './Post.css';
import Like from '../Like/Like.js';
import CommentButton from '../Comment/CommentButton/CommentButton.js';
import Share from '../Share/Share';
import CommentBx from '../Comment/CommentBx/CommentBx';
import Audio from '../Audio/Audio';
import PostImageRotate from '../PostImageRotate/PostImageRotate';

function Post({ post, visitorId }) {

  const [audioState, setAudioState] = useState("pause");
  return (
    <div className='Post'>
      <div className='content'>
        <h2 className='title'>{post.post_title}</h2>
        <PostImageRotate post_image_path={post.post_image_path} audioState={audioState} setAudioState={setAudioState} />
        <Audio src={post.post_audio_path} audioState={audioState} setAudioState={setAudioState} />
        <div className='postAction'>
          <Like visitorId={visitorId} postId={post.id} />
          <CommentButton />
          <Share />
        </div>
        <CommentBx />
      </div>
    </div>
  )
}

export default Post