import React, { useEffect, useRef, useState } from 'react'
import './Audio.css';

function Audio({ src, audioState, setAudioState }) {

    const audioRef = useRef("");
    const progessRef = useRef("");
    const [duration, setDuration] = useState(0);
    const [timeNow, setTimeNow] = useState(0);
    const [value, setValue] = useState(0);

    useEffect(() => {
        if (audioState == "play") {
            if (timeNow == duration)
                audioRef.current.currentTime = 0;
            audioRef.current.play();
        }
        else audioRef.current.pause();
    }, [audioState])

    function convertMinute(x) {
        if (!x) return '0:00';

        let min = Math.floor(x / 60);
        let sec = Math.floor(x % 60);
        if (sec < 10) {
            return `${min}:0${sec}`;
        }
        else {
            return `${min}:${sec}`;
        }
    }

    const audioHandleLoad = (e) => {
        const durationTmp = Math.floor(e.currentTarget.duration);
        setDuration(durationTmp);
    }

    const audioHandleTimeUpdate = () => {
        if (audioRef.current.currentTime >= duration) {
            audioRef.current.currentTime = duration;
            setAudioState("pause");
        }
        let progess = (audioRef.current.currentTime / duration) * 100;
        let currentTime = (duration / 100) * progess;
        setTimeNow(currentTime);
        progessRef.current.style.background = `linear-gradient(to right,rgb(241, 50, 50) 0%, rgb(241, 50, 50) ${progess}%,  #fff ${progess}%, #fff 100%)`;
        setValue(progess);
    }

    const progessOnChange = (e) => {
        let progess = e.target.value;
        let currentTime = (duration / 100) * progess;
        audioRef.current.currentTime = currentTime;
        setTimeNow(currentTime);
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
            <div className='progressBar'>
                <span>{convertMinute(timeNow)}</span>
                <input type='range' min='0' max='100' step='0.01' value={value} ref={progessRef}
                    onChange={progessOnChange} className="progress" />
                <span>{convertMinute(duration)}</span>
            </div>
            <audio controls ref={audioRef} onTimeUpdate={audioHandleTimeUpdate}
                onLoadedData={audioHandleLoad} accept=".mp3,audio/*">
                <source src={src} />
            </audio>
        </div>
    )
}

export default Audio