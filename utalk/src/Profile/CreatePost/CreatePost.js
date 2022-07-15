import React from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios';
import './CreatePost.css';

function CreatePost() {

    const [file, setFile] = useState();
    const [progressBar, setProgressBar] = useState(0);
    const [errMessage, SetErrMessage] = useState('');
    const [preview, setPreview] = useState('');
    const [title, setTitle] = useState('');
    const [titleWarning, setTitleWarning] = useState('');

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

    const uploadFileClick = async () => {

        if (file) {
            const data = new FormData();
            data.append("file", file);
            try {
                const res = await axios.post('http://localhost:8082/api/uploadFile', data, {
                    onUploadProgress: ProgressEvent => {
                        setProgressBar(
                            parseInt(Math.round(ProgressEvent.loaded * 100) / ProgressEvent.total)
                        )
                    }
                })
                if (res.data.errCode == 1) {
                    SetErrMessage(res.data.message);
                }
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
        <div className='CreatePost'>
            <div className='textBx'>
                <h2>Chia sẻ một điều gì mới mẻ ?</h2>
            </div>
            <textarea type='text' placeholder='Tiêu đề..' spellCheck="false" resize="false"
                value={title} onChange={titleChange} maxLength='116' onKeyDown={keyDownTitle}></textarea>
            {titleWarning && (
                <h4>{titleWarning}</h4>
            )}
            <div className='uploadBx'>
                <label htmlFor='upload'>
                    <i className="fa-solid fa-plus"></i>
                    <input type='file' id='upload' name='audioFile'
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
            <button className='postButton' onClick={uploadFileClick}>Đăng bài</button>
        </div>
    )
}

export default CreatePost