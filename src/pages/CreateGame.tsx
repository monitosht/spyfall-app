import { useState } from 'react';
import { database } from '../database';
import { set, ref } from 'firebase/database';
import { useAppDispatch } from '../redux/hooks';
import { setGamepin, setNickname, setPlayerId } from '../redux/slices/sessionSlice';
import NicknameSlide from '../components/NicknameSlide';
import Identity from '../../identity';
import '../App.css'

function CreateGame() {
    const dispatch = useAppDispatch();

    const [name, setName] = useState('');
    const identity = new Identity();

    const gamepin = Math.floor(Math.random() * 8999 + 1000);
    
    const writeToDatabase = (gamepin: number) => {
        set(ref(database, 'active-games/' + gamepin), {
            gamepin: gamepin,
            host: identity,
            players: [identity],
            status: 'lobby'
        });
    }

    const handleClick = () => {
        identity.setNickname(name);

        dispatch(setNickname(identity.nickname));
        dispatch(setPlayerId(identity.playerId));
        dispatch(setGamepin(gamepin));
        
        writeToDatabase(gamepin);
    }
    
  return (
    <div className='h-screen flex flex-col justify-center items-center'>
      <img src='/spyfall-app/spy_icon.svg' className='w-48 h-48'></img>
      <h1 className='text-6xl font-bold py-16'>Spyfall</h1>
      <NicknameSlide 
        name={name} 
        setName={setName} 
        gamepin={gamepin} 
        handleClick={handleClick}
      />
    </div>
  )
}

export default CreateGame
