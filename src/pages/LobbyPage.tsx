import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { database } from '../database';
import { get, onValue, ref, set, update } from 'firebase/database';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { setMessage } from '../redux/slices/messageSlice';
import BackButton from '../components/BackButton';
import NextButton from '../components/NextButton';
import '../App.css'

function LobbyPage() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const nickname = useAppSelector((state) => state.session.nickname);
  const gamepin = useAppSelector((state) => state.session.gamepin);

  const [isHost, setIsHost] = useState(false);
  const [players, setPlayers] = useState<string[]>([]);
  const [hostname, setHostname] = useState<string | null>(null);

  useEffect(() => {
    const fetchHostname = async () => {
      const snapshot = await get(ref(database, 'active-games/' + gamepin));
      const data = snapshot.val();
      if (data) {
        setHostname(data.hostname);
      }
    };

    fetchHostname();
  }, [gamepin]);

  // change this to use a GUID instead of the host's nickname
  useEffect(() => {
    const gameRef = ref(database, 'active-games/' + gamepin);

    get(gameRef)
    .then((snapshot) => {
      if(snapshot.val().hostname === nickname) {
        setIsHost(true);
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
      if(data) {
        setPlayers(data.players || []);
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
  
  const updateDatabase = () => {
    const gameRef = ref(database, 'active-games/' + gamepin);

    get(gameRef)
    .then((snapshot) => {
      const data = snapshot.val();

      if(data) {
        if(isHost) {
          set(gameRef, null);
        } else {
          const updatedPlayers = data.players.filter((player: string) => player !== nickname);
          update(gameRef, { players: updatedPlayers });
        }
      }
    })
    .catch((error) => {
      console.error(error);
    });
  }

  const [copied, setCopied] = useState(false)

  const handleCopy = () => {
    navigator.clipboard.writeText(gamepin)

    if(copied === false) {
      setCopied(true);

      const timer = setTimeout(() => {
        setCopied(false);
      }, 2000);

      return () => clearTimeout(timer);
    }
  }
    
  return (
    <div className='h-screen flex flex-col justify-center items-center'>
      <img src='/spy_icon.svg' className='w-48 h-48'></img>
      <h1 className='text-6xl font-bold py-16'>Spyfall</h1>
      <div className='flex flex-col justify-center min-w-60 pb-6 space-y-4'>
        <div className='flex justify-between space-x-2 pb-4 mx-auto'>
          <p className='text-3xl text-white'><b>Game Pin:</b> {gamepin}</p>
          <button 
            className="rounded border py-1 px-1 bg-slate-300 hover:bg-slate-500 hover:text-white disabled:bg-slate-300 disabled:text-slate-500"
            onClick={ handleCopy }
            disabled={ copied }
          >
          { copied ?          
            <svg 
            xmlns="http://www.w3.org/2000/svg" 
            fill="none" 
            viewBox="0 0 24 24" 
            stroke-width="1.5" 
            stroke="currentColor" 
            className="size-6"
            >
              <path 
                stroke-linecap="round" 
                stroke-linejoin="round" 
                d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" 
              />
            </svg>
            :
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke-width="1.5" 
              stroke="currentColor" 
              className="size-6"
            >
              <path 
                stroke-linecap="round" 
                stroke-linejoin="round" 
                d="M8.25 7.5V6.108c0-1.135.845-2.098 1.976-2.192.373-.03.748-.057 1.123-.08M15.75 18H18a2.25 2.25 0 0 0 2.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 0 0-1.123-.08M15.75 18.75v-1.875a3.375 3.375 0 0 0-3.375-3.375h-1.5a1.125 1.125 0 0 1-1.125-1.125v-1.5A3.375 3.375 0 0 0 6.375 7.5H5.25m11.9-3.664A2.251 2.251 0 0 0 15 2.25h-1.5a2.251 2.251 0 0 0-2.15 1.586m5.8 0c.065.21.1.433.1.664v.75h-6V4.5c0-.231.035-.454.1-.664M6.75 7.5H4.875c-.621 0-1.125.504-1.125 1.125v12c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V16.5a9 9 0 0 0-9-9Z" 
              />
            </svg>
          }
          </button>
        </div>
        <div className="pb-4 space-y-2">
          <p className='text-3xl text-white'><b>Players:</b></p>
          <ul className='text-2xl text-white'>
            {players.map((player, index) => (
              <div className="flex mx-auto space-x-2 py-2 items-center justify-center">
              {player === hostname ? (
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  fill="none" 
                  viewBox="0 0 24 24" 
                  stroke-width="1.5" 
                  stroke="currentColor" 
                  className="size-6"
                >
                  <path 
                    stroke-linecap="round" 
                    stroke-linejoin="round" 
                    d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" 
                  />
                </svg>
              ) : null}
              {player === nickname ? <li key={index}><b>{player}</b> (you)</li> : <li key={index}>{player}</li>}
              </div>
            ))}
          </ul>
        </div>
      </div>
      <div className='flex justify-items-center flex-col space-y-4 mx-auto'>
        {
          isHost
          ? <NextButton
              text='Start Game'
            />
          : <NextButton
              text='Waiting for Host'
              disabledCondition={true}
            />
        }
        <BackButton
          text='Exit'
          linkTo='/'
          handleClick={ updateDatabase }
        />
      </div>
    </div>
  )
}

export default LobbyPage
