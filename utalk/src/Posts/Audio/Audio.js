import React, { useEffect, useRef, useState } from 'react'
import './Audio.css';

function Audio(src) {

    const audioRef = useRef("");
    const progessRef = useRef("");
    const [duration, setDuration] = useState();
    const [value, setValue] = useState(0);


    const progessOnChange = (e) => {
        let progess = e.target.value;
        let currentTime = (audioRef.current.duration / 100) * progess;
        audioRef.current.currentTime = currentTime;
        progessRef.current.style.background = `linear-gradient(to right,rgb(241, 50, 50) 0%, rgb(241, 50, 50) ${progess}%,  #fff ${progess}%, #fff 100%)`;
        console.log(progess);
        if (progess == 100) {
            // button.current.className = "fa-solid fa-play";
            // button.current.style.color = "rgb(255, 55, 55)";
            // audioRef.current.pause();
        }
        setValue(progess);
    }

    return (
        <div className='Audio' >
            <div className='play'>
                <i className="fa-solid fa-play"></i>
            </div>
            <div className='progressBar'>
                <span>0:00</span>
                <input type='range' min='0' max='100' step='1' value={value} ref={progessRef}
                    onChange={progessOnChange} className="progress" />
                <span>12:12</span>
            </div>
            <audio controls ref={audioRef}
                onLoadedData={(e) => {
                    setDuration(e.currentTarget.duration)
                }} accept=".mp3,audio/*">
                <source src={src.src} />
            </audio>
        </div>
    )
}

export default Audio