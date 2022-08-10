import React from 'react';
import { useState, useEffect } from 'react';
import './PostImage.css';

function PostImage({ setImgFile }) {

    const [imgSrc, setImgSrc] = useState();

    const imageFileLoad = () => {
        URL.revokeObjectURL(imgSrc);
        // setImgFile(imgSrc);
        // console.log(imgSrc);
    }
    const imageFileInput = (e) => {
        setImgSrc(URL.createObjectURL(e.target.files[0]));
        setImgFile(e.target.files[0]);
        console.log(URL.createObjectURL(e.target.files[0]));
        imageFileLoad();
    }

    return (
        <div className='PostImage'>
            <div className='postImageBx'>
                <img src={imgSrc} />
                <label htmlFor='uploadImg'>
                    <input type='file' id='uploadImg'
                        accept="image/*" onChange={imageFileInput} >
                    </input>
                </label>
                <div className='hoverEffect'>
                    <i className="fa-solid fa-image"></i>
                </div>
            </div>
        </div>
    )
}

export default PostImage