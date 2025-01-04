import { NavLink } from 'react-router'
import { useEffect, useState } from 'react';
import { database } from '../database';
import '../App.css'
import { ref, onValue } from 'firebase/database';
import { useAppDispatch } from '../redux/hooks';
import { setGamepin } from '../redux/sessionSlice';

function JoinGame() {
  const dispatch = useAppDispatch();
  const [gamepinInput, setGamepinInput] = useState('');
  const [gameExists, setGameExists] = useState(false);

  const handleClick = () => {
    dispatch(setGamepin(gamepinInput));
  }

  useEffect(() => {
    onValue(ref(database, 'active-games/' + gamepinInput), (snapshot) => {
      setGameExists(snapshot.exists());
    });
  }, [gamepinInput]);

  return (
    <div className='h-screen flex flex-col justify-center items-center'>
      <img src='/spy_icon.svg' className='w-48 h-48'></img>
      <h1 className='text-6xl font-bold py-16'>Spyfall</h1>      
      <div className='flex flex-col justify-center w-48 pb-8 space-y-4 mx-auto'>
        <p className='text-2xl text-white'>Enter Game Pin:</p>        
        <input
          maxLength={4}
          onChange={(e) => setGamepinInput(e.target.value)}
        />       
      </div>
      <div className='flex justify-items-center flex-col w-28 space-y-4 mx-auto'>
        <NavLink 
          to={ gameExists ? `/lobby/${gamepinInput}` : '#' }
        >
          <button 
            className='w-full border rounded-md p-1.5 border-slate-400 bg-slate-300 hover:bg-slate-500 hover:text-white disabled:bg-slate-600 disabled:border-slate-700 disabled:hover:text-black'
            onClick={gameExists ? handleClick : () => {}}
            disabled={ (gamepinInput.length === 4) && (/^[0-9\b]+$/.test(gamepinInput)) && (/\S/.test(gamepinInput)) ? false : true }
          >
              Next
          </button>
        </NavLink>
        <NavLink to='/'>
            <button className='w-full border rounded-md p-1.5 border-slate-400 bg-slate-300 hover:bg-slate-500 hover:text-white'>
                Back
            </button>
        </NavLink>
      </div>
    </div>
  )
}

export default JoinGame
