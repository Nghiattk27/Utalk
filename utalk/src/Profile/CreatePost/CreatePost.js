import React, { useRef } from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios';
import './CreatePost.css';
import PostImage from '../PostImage/PostImage';

function CreatePost({ userId, render, setRender, setCreatState }) {

    const [file, setFile] = useState();
    const [progressBar, setProgressBar] = useState(0);
    const [errMessage, SetErrMessage] = useState('');
    const [preview, setPreview] = useState('');
    const [title, setTitle] = useState('');
    const [titleWarning, setTitleWarning] = useState('');
    const [imgFile, setImgFile] = useState({});

    const CreatePostRef = useRef();

    const closeOpenMenus = (e) => {
        if (CreatePostRef.current && !CreatePostRef.current.contains(e.target)) {
            setCreatState(false);
        }
    }

    document.addEventListener('mousedown', closeOpenMenus);

    useEffect(() => {
        console.log(imgFile);
    }, [imgFile])

    useEffect(() => {
        return () => {
            preview && URL.revokeObjectURL(preview.preview)
        }
    }, [preview])

    const previewFile = (e) => {

        let fileTmp = e.target.files[0];

        setFile(fileTmp);

        fileTmp.preview = URL.createObjectURL(fileTmp);

        setPreview(fileTmp);

    }

    const uploadPostClick = async () => {
        if (file && imgFile) {
            const data = new FormData();
            data.append("title", title);
            data.append("userId", userId);
            data.append("audioFile", file);
            try {
                const res = await axios.post('http://localhost:8082/api/uploadFile', data,
                    {
                        headers: {
                            'Content-Type': 'application/x-www-form-urlencoded'
                        }
                    }
                )
                setCreatState(false);
                console.log(render);
                setRender(!render);
                const baby = res.data;
                const dataImg = new FormData();
                dataImg.append("imgFile", imgFile);
                dataImg.append("postId", baby.newPost.id);
                console.log(imgFile, baby.newPost.id);
                const abc = await axios.post('http://localhost:8082/api/uploadPostImage', dataImg,
                    {
                        headers: {
                            'Content-Type': 'application/x-www-form-urlencoded'
                        }
                    }
                )
            }
            catch (e) {

            }

        } else {
            console.log("Hãy chọn file audio của bạn");
        }
    }
    const fileNameElement = () => {
        if (!file) {
            return <h3>Tải file audio của bạn lên</h3>
        }
        else {
            let fileName = file.name;
            let tmp = '';

            if (fileName.length > 25) {
                for (let i = fileName.length - 1; i > 0; i--) {
                    if (fileName[i] != '.') {
                        tmp = fileName[i].concat(tmp);
                    }
                    else {
                        fileName.slice(0, i - 1);
                        break;
                    }
                }
                console.log(tmp);
                fileName = fileName.substring(0, 20) + '...' + tmp;
            }
            return <h3>{fileName}</h3>
        }
    }
    const errMessageElement = () => {
        if (errMessage) {
            return (
                <div className='errBx'>
                    <i className='fa-solid fa-circle-exclamation'></i>
                    <h3>{errMessage}</h3>
                </div>
            )
        }
    }
    const titleChange = (e) => {
        setTitle(e.target.value);
    }
    const keyDownTitle = (e) => {
        if (e.key != 'Backspace') {
            if (title.length > 115) {
                setTitleWarning("Tiêu đề không thể vượt quá 115 kí tự")
            }
        }
        else {
            setTitleWarning('');
            setTitle(e.target.value);
        }
        console.log(e.key);
    }
    return (
        <div className='CreatePost' ref={CreatePostRef}>
            <div className='textBx'>
                <h2>Chia sẻ một điều gì mới mẻ ?</h2>
            </div>
            <textarea type='text' placeholder='Tiêu đề..' spellCheck="false" resize="false"
                value={title} onChange={titleChange} maxLength='116' onKeyDown={keyDownTitle}></textarea>
            {titleWarning && (
                <h4>{titleWarning}</h4>
            )}
            <div className='PostImageDiv'>
                <PostImage setImgFile={setImgFile} />
            </div>
            <div className='uploadBx'>
                <label htmlFor='upload'>
                    <i className="fa-solid fa-plus"></i>
                    <input type='file' id='upload' name='audioFile' accept='audio/*'
                        onChange={previewFile}></input>
                </label>
                {fileNameElement()}
            </div>
            {errMessageElement()}
            {file && (
                <audio key={preview.preview} controls>
                    <source src={preview.preview} />
                </audio >
            )}
            <button className='postButton' onClick={uploadPostClick}>Đăng bài</button>
        </div>
    )
}

export default CreatePost