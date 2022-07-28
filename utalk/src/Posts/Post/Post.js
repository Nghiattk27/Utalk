import React, { useEffect } from 'react'
import { useState, useRef } from 'react';
// import Emoji from './Emoji/Emoji.js';
import './Post.css';
import ava from '../images/ava.png';
import Like from '../Like/Like.js';
import CommentButton from '../Comment/CommentButton/CommentButton.js';
import Share from '../Share/Share';
import CommentBx from '../Comment/CommentBx/CommentBx';

function Post(post) {

  const [numberOfLikes, setNumberOfLikes] = useState(0);

  function formText(x) {
    if (x == 0) {
      return 'Hãy là người đầu tiên quan tâm đến điều này';
    }
    else {
      return `${x} người quan tâm đến điều này`;
    }
  }
  return (
    <div className='Post'>
      <div className='content'>
        <h2 className='title'>{post.post.post_title}</h2>
        <div className="audioBx">
          <div className='postAction'>
            <Like />
            <CommentButton />
            <Share />
          </div>
        </div>
        <CommentBx />
      </div>
    </div>
  )
}

export default Post