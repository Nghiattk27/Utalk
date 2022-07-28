import React from 'react';
import './CommentBx.css';
import Comment from '../Comment/Comment.js';
import WriteComment from '../WriteComment/WriteComment.js';

function CommentBx() {
    return (
        <div className='CommentBx'>
            <WriteComment />
            <Comment />
            <Comment />
            <Comment />
        </div>
    )
}

export default CommentBx