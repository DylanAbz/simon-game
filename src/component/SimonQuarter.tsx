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
            audio.play();
            setFade(true);
        }
    }, [props.isActive])

    const onQuarterClick = useCallback(() => {
        if (props.isPlayerTime && !fade) {
            props.onClick(props.colorNumber);
            audio.play();
            setFade(true);
        }
    }, [props.isPlayerTime, props.onClick, props.colorNumber, audio, fade])

    return (
        <>
            <div className={`quarter ${props.color} ${fade ? 'fade' : ''}`} onClick={onQuarterClick} onAnimationEnd={()=> {setFade(false)}}></div>
        </>
    )

}