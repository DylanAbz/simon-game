import '../styles/SimonDisc.css';
import SimonQuarter from "./SimonQuarter.tsx";
import {useEffect, useState} from "react";

export default function SimonDisc() {

    function getRandomColor() {
        return Math.floor(Math.random() * 4);
    }

    const [sequence, setSequence] = useState<number[]>([]);
    const [sequenceIndex, setSequenceIndex] = useState<number>(0);
    const [isPlayerTime, setIsPlayerTime] = useState<boolean>(false);
    const [currentColor, setCurrentColor] = useState<number>(-1);
    const [score, setScore] = useState<number>(0);

    useEffect(() => {
        if (isPlayerTime) {
            setCurrentColor(-1);
        } else {
            setCurrentColor(sequence[sequenceIndex]);
            setTimeout(() => {
                setCurrentColor(-1);
            }, 100);
        }
    }, [sequence, sequenceIndex, isPlayerTime]);

    function sendLoseNotif(score: number) {
        if (!("Notification" in window)) {
            alert("This browser does not support desktop notification");
            return;
        }
        Notification.requestPermission((result) => {
            if (result === "granted") {
                navigator.serviceWorker.ready.then((registration) => {
                    registration.showNotification("Vibration Sample", {
                        body: "You lose with score " + score,
                        tag: "vibration-sample",
                    });
                });
            }
        });
    }

    const onClick = (color: number) => {
        if (color === sequence[sequenceIndex]) {
            if (sequenceIndex === sequence.length - 1) {
                setTimeout(() => {
                    setScore(sequence.length);
                    setSequence([...sequence, getRandomColor()]);
                    setIsPlayerTime(false);
                    setSequenceIndex(0);
                }, 300);
            } else {
                setSequenceIndex(sequenceIndex + 1);
            }
        } else {
            sendLoseNotif(score);
            setScore(0);
            setSequence([]);
            setSequenceIndex(0);
            setIsPlayerTime(false);
        }
    }



    useEffect(() => {
        if (sequence.length === 0) {
            setTimeout(() => {
                setSequence([getRandomColor()]);
            }, 1000);
        }
        if (!isPlayerTime && sequenceIndex < sequence.length) {
            if(sequenceIndex === sequence.length - 1) {
                setTimeout(() => {
                    setIsPlayerTime(true);
                    setSequenceIndex(0);
                }, 500);
            } else {
                setTimeout(() => {
                    setSequenceIndex(sequenceIndex + 1);
                }, 500);
            }
        }
    }, [isPlayerTime, sequenceIndex, sequence])

    return (
        <>
            <h1>{isPlayerTime ? "YOUR TURN" : "MY TURN"}</h1>
            <div className="simon-disc">
                <SimonQuarter color="red" sound="https://s3.amazonaws.com/freecodecamp/simonSound2.mp3" onClick={onClick} isActive={currentColor===0 && !isPlayerTime} colorNumber={0} isPlayerTime={isPlayerTime}/>
                <SimonQuarter color="green" sound="https://s3.amazonaws.com/freecodecamp/simonSound1.mp3" onClick={onClick} isActive={currentColor===1 && !isPlayerTime} colorNumber={1} isPlayerTime={isPlayerTime}/>
            </div>
            <div className="simon-disc">
                <SimonQuarter color="blue" sound="https://s3.amazonaws.com/freecodecamp/simonSound4.mp3" onClick={onClick} isActive={currentColor===2 && !isPlayerTime} colorNumber={2} isPlayerTime={isPlayerTime}/>
                <SimonQuarter color="yellow" sound="https://s3.amazonaws.com/freecodecamp/simonSound3.mp3" onClick={onClick} isActive={currentColor===3 && !isPlayerTime} colorNumber={3} isPlayerTime={isPlayerTime}/>
            </div>
            <h2>Score : {score}</h2>
        </>
    )
}