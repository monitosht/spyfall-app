import { useEffect, useState } from "react";
import BackButton from "../components/BackButton";

function GamePage() {
    const [timer, setTimer] = useState(300);

    useEffect(() => {
        const interval = setInterval(() => {
            setTimer(timer - 1);
        }, 1000);
        return () => clearInterval(interval);
    }, [timer]);

    const formatTimeString = (time: number) => {
        const minutes = Math.floor(time / 60);
        const seconds = time - minutes * 60;
        return `${str_pad_left(minutes.toString(), '0', 2)}:${str_pad_left(seconds.toString(), '0', 2)}`;
    }
    
    return (
        <div>
            <h1 className="text-6xl font-bold">Gameplay Page</h1>
            <h1 className="text-4xl py-14">{formatTimeString(timer)}</h1>
            <BackButton 
                text="Exit"
                linkTo="/" 
            />
        </div>
    );
}

function str_pad_left(string: string, pad: string, length: number) {
    return (new Array(length + 1).join(pad) + string).slice(-length);
}

export default GamePage;