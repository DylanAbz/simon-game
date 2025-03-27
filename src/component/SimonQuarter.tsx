import {useCallback, useEffect, useMemo, useState} from "react";

export interface SimonQuarterProps {
    color: string;
    sound: string;
    onClick: (color: number) => void;
    colorNumber: number;
    isActive: boolean;
    isPlayerTime: boolean;
}

export default function SimonQuarter(props: SimonQuarterProps) {
    const [fade, setFade] = useState<boolean>(false);
    const audio = useMemo(() => new Audio(props.sound), [props.sound]);

    useEffect(() => {
        if (props.isActive) {
            audio.pause();
            audio.currentTime = 0;
            audio.play();
            if (window.navigator.vibrate) {
                window.navigator.vibrate(200);
            }
            setFade(true);
        }
    }, [props.isActive])

    const onQuarterClick = useCallback(() => {
        if (props.isPlayerTime && !fade) {
            props.onClick(props.colorNumber);
            audio.pause();
            audio.currentTime = 0;
            audio.play();
            if (window.navigator.vibrate) {
                window.navigator.vibrate(200);
            }
            setFade(true);
        }
    }, [props.isPlayerTime, props.onClick, props.colorNumber, audio, fade])

    return (
        <>
            <div className={`quarter ${props.color} ${fade ? 'fade' : ''}`} onClick={onQuarterClick} onAnimationEnd={()=> {setFade(false)}}></div>
        </>
    )

}