import React from 'react';

const SpeechBubble = ({ message }) => {

 return (
    <div classNameName="container">
        <div className="arrow">
            <div className="outer"></div>
            <div className="inner"></div>
        </div>
        <div className="message-body">
            <p>{message}</p>
        </div>
    </div>
);}

export default SpeechBubble;
