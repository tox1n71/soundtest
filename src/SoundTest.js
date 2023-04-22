import React, { useState, useRef } from "react";

function SoundTest() {
    const audioRef = useRef(null);
    const [startTime, setStartTime] = useState(null);
    const [endTime, setEndTime] = useState(null);

    const handleButtonClick = () => {
        if (!startTime) {
            // Нажали на кнопку в первый раз
            setStartTime(new Date());
            audioRef.current.play();
        } else {
            // Нажали на кнопку во второй раз
            setEndTime(new Date());
        }
    };

    return (
        <div>
            <h1>Тест на звук</h1>
            <p>Нажмите на кнопку, когда услышите звук:</p>
            <button onClick={handleButtonClick}>Нажми меня!</button>
            <audio ref={audioRef} src="./wensday.mp3"/>
            {startTime && endTime && (
                <p>Вы нажали на кнопку через {(endTime - startTime) / 1000} секунд.</p>
            )}
        </div>
    );
}

export default SoundTest;
