import React, { useEffect, useState } from 'react';
import './CommentBx.css';
import axios from 'axios';
import Comment from '../Comment/Comment.js';
import WriteComment from '../WriteComment/WriteComment.js';

function CommentBx({ postId, visitorId, post, user, visitor, comments }) {

    return (
        <div className='CommentBx'>
            {
                comments &&
                comments.map((comment) => {
                    return <Comment comment={comment} key={comment.id} visitorId={visitorId} />
                })
            }
        </div>
    )
}

export default CommentBx