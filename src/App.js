import React, {useState, useEffect, useRef} from 'react';
import soundFile from './wensday.mp3';
import "./styles/buttons.css";
import button from "./Button";
import Button from "./Button";

function TestPage() {
    const [startTime, setStartTime] = useState(null);
    const [endTime, setEndTime] = useState(null);
    const [showResult, setShowResult] = useState(false);
    const [elapsedTime, setElapsedTime] = useState(0);
    const [isPlaying, setIsPlaying] = useState(0);
    const audioRef = useRef(null);
    const [showRestartButton, setShowRestartButton] = useState(false);
    const MIN_DELAY = 2000;
    const MAX_DELAY = 3000;
    const delay = Math.floor(Math.random() * (MAX_DELAY - MIN_DELAY + 1)) + MIN_DELAY;

    useEffect(() => {
        let intervalId;
        if (startTime !== null && endTime === null) {
            intervalId = setInterval(() => {
                setElapsedTime(Date.now() - startTime);
            }, 1);
        }
        return () => clearInterval(intervalId);
    }, [startTime, endTime]);


    const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));

    const handleStartTest = async () => {
        setIsPlaying(1);
        await sleep(delay);
        setStartTime(Date.now());
        audioRef.current.play();
    }

    const handleStopTest = () => {
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
        setIsPlaying(2);
        setEndTime(Date.now());
        setShowResult(true);
        setShowRestartButton(true)
    };

    const handleRestartTest = () => {
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
        setShowRestartButton(false);
        setStartTime(null);
        setEndTime(null);
        setShowResult(false);
        setElapsedTime(0);
        setIsPlaying(0);
    }


    const result = showResult && `Ваш результат: ${endTime - startTime} мс`;


    return (
        <div>
            {isPlaying === 0 ? (
                <Button role={button} onClick={handleStartTest} disabled={startTime !== null}>
                    Начать тест
                </Button>
            ) : isPlaying === 1 ? (
                <Button role={button} onClick={handleStopTest} disabled={endTime !== null}>
                    Стоп
                </Button>
            ) : <Button role={button} onClick={handleRestartTest}>
                Перезапустить
                </Button>
            }


            <div className="showResult">
                <style>
                    {`
                .showResult {
                    color: #c7edef;
                }
                `}
                </style>
                <br/>
                {showResult && result}
                <br/>
                {startTime !== null && (
                    <div className="result">
                        <style>
                            {`
                .result {
                    color: #c7edef;
                }
                `}
                        </style>
                        Прошло времени: {elapsedTime} мс ({new Date(elapsedTime).toISOString().substr(14, 9)})
                    </div>
                )}

            </div>

            <audio ref={audioRef}>
                <source src={soundFile} type="audio/mpeg"/>
                Your browser does not support the audio element.
            </audio>
        </div>
    );
}

export default TestPage;
