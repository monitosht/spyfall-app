import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { database } from "../database";
import { get, onValue, ref, set, update } from "firebase/database";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { setMessage } from "../redux/slices/messageSlice";
import BackButton from "../components/BackButton";
import Identity from "../../identity";

function GamePage() {
    const TIMER_DURATION = 600; // 10 minute timer

    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    
    const playerId = useAppSelector((state) => state.session.playerId);
    const isHost = useAppSelector((state) => state.session.isHost);
    const gamepin = useAppSelector((state) => state.session.gamepin);

    const [timer, setTimer] = useState<number>(0);

    useEffect(() => {
        if(!playerId || !gamepin) {
          navigate('/error/403');
        }
    // eslint-disable-next-line
    }, []);

    useEffect(() => {
        const gameRef = ref(database, 'active-games/' + gamepin);

        const listener = onValue(gameRef, (snapshot) => {
            const data = snapshot.val();

            if(data){
                if(data.startTime)
                {
                    const currentTime = Math.floor(Date.now() / 1000);
                    const timeElapsed = currentTime - data.startTime;
                    setTimer(TIMER_DURATION - timeElapsed)
                }
            } else {
                if(!isHost) {
                    dispatch(setMessage('The host has terminated the lobby.'))
                }
                navigate('/');
            }
        });

        return () => {
            listener();
        }
    }, [gamepin, isHost, dispatch, navigate]);

    useEffect(() => {
        const handleBeforeUnload = () => {
            updateDatabase();
        }

        window.addEventListener('beforeunload', handleBeforeUnload);

        return () => {
            window.removeEventListener('beforeunload', handleBeforeUnload);
        }
    });

    const updateDatabase = () => {
        const gameRef = ref(database, 'active-games/' + gamepin);

        get(gameRef)
        .then((snapshot) => {
            const data = snapshot.val();

            if(data) {
                if(isHost) {
                    set(gameRef, null);
                } else {
                    const updatedPlayers = data.players.filter((player: Identity) => player.playerId !== playerId);
                    update(gameRef, { players: updatedPlayers });
                }
            }
        })
        .catch((error) => {
            console.error(error);
        });
    }

    useEffect(() => {
        if(timer > 0) {
            const interval = setInterval(() => {
                setTimer((prevTimer) => prevTimer - 1);
            }, 1000);

            return () => clearInterval(interval);
        }
    }, [timer]);

    const formatTimeString = (time: number) => {
        const minutes = Math.floor(time / 60);
        const seconds = time - minutes * 60;
        return `${str_pad_left(minutes.toString(), '0', 2)}:${str_pad_left(seconds.toString(), '0', 2)}`;
    }
    
    return (
        <div>
            <h1 className="text-6xl font-bold">Spyfall</h1>
            <h1 className="text-4xl py-14">Time Remaining: {formatTimeString(timer)}</h1>
            <BackButton 
                text="Exit"
                linkTo="/" 
                handleClick={updateDatabase}
            />
        </div>
    );
}

function str_pad_left(string: string, pad: string, length: number) {
    return (new Array(length + 1).join(pad) + string).slice(-length);
}

export default GamePage;