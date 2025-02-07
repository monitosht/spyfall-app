import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { database } from "../database";
import { get, onValue, ref, set, update } from "firebase/database";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { setMessage } from "../redux/slices/messageSlice";
import BackButton from "../components/BackButton";
import locations from "../../locations";
import Identity from "../../identity";

function GamePage() {
    const TIMER_DURATION = 600; // 10 minute timer

    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    
    const playerId = useAppSelector((state) => state.session.playerId);
    const isHost = useAppSelector((state) => state.session.isHost);
    const gamepin = useAppSelector((state) => state.session.gamepin);

    const [players, setPlayers] = useState<Identity[]>([]);
    const [location, setLocation] = useState<string>('');
    const [role, setRole] = useState<string>('');    
    const [timer, setTimer] = useState<number>(0);

    const [gridCols, setGridCols] = useState<string>('');
    const [gridGapX, setGridGapX] = useState<string>('');

    const [crossedOutNames, setCrossedOutNames] = useState<number[]>([]);
    const [crossedOutLocations, setCrossedOutLocations] = useState<number[]>([]);

    useEffect(() => {
        if(!playerId || !gamepin) {
          navigate('/error/403');
        }

        const gameRef = ref(database, 'active-games/' + gamepin);

        get(gameRef)
        .then((snapshot) => {
            const data = snapshot.val();

            if(data) {
                setPlayers(data.players);
                setLocation(data.location);

                // Set the current players' role to the one they were randomly assigned
                const currentPlayer = data.players.find((player: Identity) => player.playerId === playerId);

                if(currentPlayer) {
                    setRole(currentPlayer.role);
                }
            }
        })
        .catch((error) => {
            console.error(error);
        });
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
                setPlayers(data.players);
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
            updateDatabaseOnExit();
        }

        window.addEventListener('beforeunload', handleBeforeUnload);

        return () => {
            window.removeEventListener('beforeunload', handleBeforeUnload);
        }
    });

    const updateDatabaseOnExit = () => {
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

    useEffect(() => {
        setGridCols(`grid-cols-${Math.min(players.length, 4)}`);
        setGridGapX(`gap-x-${Math.min((12 * players.length), 48)}`);
    }, [players]);

    const crossoutName = (index:number) => {
        setCrossedOutNames((prev) => {
            if(prev.includes(index)) {
                return prev.filter((item) => item !== index);
            } else {
                return [...prev, index];
            }
        });
    }

    const crossoutLocation = (index:number) => {
        setCrossedOutLocations((prev) => {
            if(prev.includes(index)) {
                return prev.filter((item) => item !== index);
            } else {
                return [...prev, index];
            }
        });
    }
    
    return (
        <div>
            <h1 className="text-7xl font-bold">Spyfall</h1>
            <h1 className="text-3xl pt-12">Round Timer: {formatTimeString(timer)}</h1>
            {
                role !== 'Spy'
                ? 
                (<div className="flex justify-center items-center space-x-4 mx-auto">
                    <img src='./location.svg' className='w-10 h-10'></img>
                    <h1 className="text-4xl py-12">{location}</h1>
                </div>)
                : 
                (<div className="flex justify-center items-center space-x-4 mx-auto">
                    <img src='./spy_icon.svg' className='w-10 h-10'></img>
                    <h1 className="text-4xl py-12">You are the Spy</h1>
                </div>)
            }   
            <p className="text-3xl pt-6 underline">Players</p>
            <div className={`grid ${gridCols} ${gridGapX} gap-y-8 w-96 justify-center mx-auto py-12 pb-24`}>
            {
                players.map((player: Identity, index:number) => {
                    return (
                        <div key={player.playerId} className="flex justify-center items-center space-x-4">
                            <button 
                                className={`text-xl min-w-36 p-1 rounded border border-black
                                    ${player.playerId === playerId ? 'font-bold' : ''}
                                    ${crossedOutNames.includes(index) ? 'line-through' : ''}`}
                                onClick={() => crossoutName(index)}
                            >
                                {player.nickname}
                            </button>                        
                        </div>
                    );
                })
            }
            </div>
            <p className="text-3xl pt-6 underline">Locations</p>
            <div className={`grid grid-cols-5 gap-x-2 gap-y-8 w-auto justify-center mx-auto pt-12 pb-24`}>
                {
                    locations.map((location: string, index:number) => {
                        return (
                            <div className="flex justify-center items-center space-x-4">
                                <button 
                                    className={`text-xl min-w-40 p-1 rounded border border-black
                                    ${crossedOutLocations.includes(index) ? 'line-through' : ''}`}
                                    onClick={() => crossoutLocation(index)}
                                >
                                    {location}
                                </button>                        
                            </div>
                        );
                    })
                }
            </div>
            <div>
                <BackButton 
                    text="Exit"
                    linkTo="/" 
                    handleClick={updateDatabaseOnExit}
                />
            </div>
        </div>
    );
}

function str_pad_left(string: string, pad: string, length: number) {
    return (new Array(length + 1).join(pad) + string).slice(-length);
}

export default GamePage;