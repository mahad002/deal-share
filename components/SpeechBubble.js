import React from 'react';

const SpeechBubble = ({ message }) => (
    <div class="container">
        <div class="arrow">
            <div class="outer"></div>
            <div class="inner"></div>
        </div>
        <div class="message-body">
            <p>{message}</p>
        </div>
    </div>
);

const styles = {
    container: {
        position: 'relative',
        backgroundColor: '#f44336', // Red background color
        color: '#fff', // White text color
        padding: '10px',
        borderRadius: '10px',
        marginBottom: '20px',
        maxWidth: '300px', // Adjust as needed
    },
    message: {
        fontSize: '16px',
        fontWeight: 'bold',
    },
    pointer: {
        position: 'absolute',
        top: '50%',
        right: '-10px', // Adjust to position the pointer
        width: '0',
        height: '0',
        borderStyle: 'solid',
        borderWidth: '10px 0 10px 10px',
        borderColor: 'transparent transparent transparent #f44336', // Red border color
    },
};

export default SpeechBubble;
