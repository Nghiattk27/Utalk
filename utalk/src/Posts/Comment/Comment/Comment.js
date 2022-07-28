import React from 'react';
import './Comment.css';
import ava from '../../images/ava.png';

function Comment() {
    return (
        <div className='Comment'>
            <div className='commentAvatar'>
                <img src={ava} />
            </div>
            <div className='commentContent'>
                <h2>Nghia Pham</h2>
                <p>Tôi nói thật, tôi cũng mệt mỏi lắm rồi
                    tôi cũng chỉ muốn nghỉ ngơi một chút thôi,
                    làm việc quần quật cả ngày rồi, chứ có phải chuyện chơi đâu
                    Tôi nói thật, tôi cũng mệt mỏi lắm rồi
                    tôi cũng chỉ muốn nghỉ ngơi một chút thôi,
                    làm việc quần quật cả ngày rồi, chứ có phải chuyện chơi đâu
                </p>
            </div>
        </div>
    )
}

export default Comment