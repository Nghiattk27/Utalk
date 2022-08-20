import React from 'react';
import './CommentButton.css';

function CommentButton({ setCommentButtonState, commentButtonState }) {
    return (
        <div className='CommentButton' onClick={() => { setCommentButtonState(!commentButtonState) }}>
            <h2>Bình luận</h2>
        </div>
    )
}

export default CommentButton