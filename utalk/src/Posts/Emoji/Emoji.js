import React from 'react';
import { useState,useRef } from 'react';
import './Emoji.css';
import like from './images/like.png';
import love from './images/love.png';
import haha from './images/haha.png';
import yay from './images/yay.png';
import wow from './images/wow.png';
import sad from './images/sad.png';
import angry from './images/angry.png';

function Emoji({ setEmoji , emoji, setNumberOfLikes, defaultLike }) {

    const iconLike = useRef();
    const iconLove = useRef();
    const iconHaha = useRef();
    const iconYay = useRef();
    const iconWow = useRef();
    const iconSad = useRef();
    const iconAngry = useRef();
    const icons = [iconLike, iconLove, iconHaha, iconYay, iconWow, iconSad, iconAngry];

    const emojiClick = (x,y) => {
        console.log(y);
        icons.forEach((icon) => {icon.current.className = '';})
        x.current.className = 'icon';
        setEmoji(y);
        if (emoji === defaultLike)
        {
            setNumberOfLikes(prev => prev + 1);
        }
    }
    return (
    <div className='Emoji'>
        <div className="emoji  emoji--like" onClick={() => emojiClick(iconLike,like)}>
            <div className="emoji__hand">
                <div className="emoji__thumb"></div>
            </div>
            <div className='imgBx' >
                <img src={like} ref={iconLike} className=''/>
            </div>
        </div>
        <div className="emoji  emoji--love" onClick={() => emojiClick(iconLove,love)}>
            <div className="emoji__heart"></div>
            <div className='imgBx' >
                <img src={love} ref={iconLove} className=''/>
            </div>
        </div>
        <div className="emoji  emoji--haha" onClick={() => emojiClick(iconHaha,haha)}>
            <div className="emoji__face">
                <div className="emoji__eyes"></div>
                <div className="emoji__mouth">
                    <div className="emoji__tongue"></div>
                </div>
            </div>
            <div className='imgBx' >
                <img src={haha} ref={iconHaha} className=''/>
            </div>  
        </div>
        <div className="emoji  emoji--yay" onClick={() => emojiClick(iconYay,yay)}>
            <div className="emoji__face">
                <div className="emoji__eyebrows"></div>
                <div className="emoji__mouth"></div>
            </div>
            <div className='imgBx' >
                <img src={yay} ref={iconYay} className=''/>
            </div>  
        </div>
        <div className="emoji  emoji--wow" onClick={() => emojiClick(iconWow,wow)}>
            <div className="emoji__face">
                <div className="emoji__eyebrows"></div>
                <div className="emoji__eyes"></div>
                <div className="emoji__mouth"></div>
            </div>
            <div className='imgBx' >
                <img src={wow} ref={iconWow} className=''/>
            </div>  
        </div>
        <div className="emoji  emoji--sad" onClick={() => emojiClick(iconSad,sad)}>
            <div className="emoji__face">
                <div className="emoji__eyebrows"></div>
                <div className="emoji__eyes"></div>
                <div className="emoji__mouth"></div>
            </div>
            <div className='imgBx' >
                <img src={sad} ref={iconSad} className=''/>
            </div>  
        </div>
         <div className="emoji  emoji--angry" onClick={() => emojiClick(iconAngry,angry)}>
            <div className="emoji__face">
                <div className="emoji__eyebrows"></div>
                <div className="emoji__eyes"></div>
                <div className="emoji__mouth"></div>
            </div>
            <div className='imgBx' >
                <img src={angry} ref={iconAngry} className=''/>
            </div>  
        </div>
    </div>
    )
}

export default Emoji