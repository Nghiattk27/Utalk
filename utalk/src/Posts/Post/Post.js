import React, { useEffect } from 'react'
import { useState, useRef } from 'react';
import './Post.css';
import Like from '../Like/Like.js';
import CommentButton from '../Comment/CommentButton/CommentButton.js';
import Share from '../Share/Share';
import CommentBx from '../Comment/CommentBx/CommentBx';
import Audio from '../Audio/Audio';

function Post(post) {
  return (
    <div className='Post'>
      <div className='content'>
        <h2 className='title'>{post.post.post_title}</h2>
        <Audio src={post.post.post_audio_path} />
        <div className='postAction'>
          <Like />
          <CommentButton />
          <Share />
        </div>
        <CommentBx />
      </div>
    </div>
  )
}

export default Post