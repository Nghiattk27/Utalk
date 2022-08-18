import React, { useEffect, useRef, useState } from 'react'
import './Audio.css';

function Audio({ src, audioState, setAudioState }) {

    const audioRef = useRef("");
    const progessRef = useRef("");
    const volumeRef = useRef("");
    const volumeIconRef = useRef("");
    const optionSpeedRef = useRef();
    const [duration, setDuration] = useState(0);
    const [timeNow, setTimeNow] = useState(0);
    const [value, setValue] = useState(0);
    const [audioSpeed, setAudioSpeed] = useState('1.0');
    const [volumeValue, setVolumeValue] = useState(1);
    const [prevVolume, setPrevVolume] = useState(1);

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

    const changeVolumeIcon = (progess) => {
        if (progess == 0) {
            volumeIconRef.current.className = "fa-solid fa-volume-xmark";
        }
        else
            volumeIconRef.current.className = "fa-solid fa-volume-high";

        setVolumeValue(progess);
        audioRef.current.volume = progess;
        volumeRef.current.style.background = `linear-gradient(to right,rgb(241, 50, 50) 0%, rgb(241, 50, 50) ${progess * 100}%,  #fff ${progess * 100}%, #fff 100%)`;
    }

    const VolumeHandleChange = (e) => {
        let progess = e.target.value;
        setPrevVolume(progess);
        changeVolumeIcon(progess);
    }

    const MuteHandleClick = () => {
        if (audioRef.current.volume > 0) {
            changeVolumeIcon(0);
        }
        else {
            setVolumeValue(prevVolume);
            changeVolumeIcon(prevVolume);
        }
    }

    const audioSpeedHandleClick = (speed, speedText) => {
        audioRef.current.playbackRate = speed;
        optionSpeedRef.current.className = "optionSpeed";
        setAudioSpeed(speedText);
    }

    const activeOptionHandleClick = () => {
        if (optionSpeedRef.current.className == "optionSpeed")
            optionSpeedRef.current.className = "optionSpeed active";
        else
            optionSpeedRef.current.className = "optionSpeed";
    }

    return (
        <div className='Audio' >
            <div className='progressBar'>
                <span>{convertMinute(timeNow)}</span>
                <input type='range' min='0' max='100' step='0.01' value={value} ref={progessRef}
                    onChange={progessOnChange} className="progress" />
                <span>{convertMinute(duration)}</span>
            </div>
            <audio ref={audioRef} onTimeUpdate={audioHandleTimeUpdate}
                onLoadedData={audioHandleLoad} accept=".mp3,audio/*">
                <source src={src} />
            </audio>
            <div className='volumeBx'>
                <div className='volumeIconBx'>
                    <i className="fa-solid fa-volume-high" ref={volumeIconRef} onClick={MuteHandleClick}></i>
                </div>
                <input type='range' min='0' max='1' step='0.01' onChange={VolumeHandleChange}
                    value={volumeValue} ref={volumeRef} className='volumeProgress' />
                <div className='audioSpeedBx'>
                    <ul className='optionSpeed' ref={optionSpeedRef}>
                        <li><span onClick={() => audioSpeedHandleClick(0.5, '0.5')}>x0.5</span></li>
                        <li><span onClick={() => audioSpeedHandleClick(1.0, '1.0')}>x1.0</span></li>
                        <li><span onClick={() => audioSpeedHandleClick(1.5, '1.5')}>x1.5</span></li>
                        <li><span onClick={() => audioSpeedHandleClick(2.0, '2.0')}>x2.0</span></li>
                    </ul>
                    <span onClick={activeOptionHandleClick}>x{audioSpeed}</span>
                </div>
            </div>
        </div>
    )
}

export default Audio