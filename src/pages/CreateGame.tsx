import { NavLink } from 'react-router'
import '../App.css'
import { useState } from 'react';
import { setGamepin, setNickname } from '../redux/sessionSlice';
import { useAppDispatch } from '../redux/hooks';

function CreateGame() {
    const dispatch = useAppDispatch();

    const [name, setName] = useState('');

    const handleClick = () => {
        dispatch(setNickname(name));
        dispatch(setGamepin(generateGamepin()));
    }

    const generateGamepin = () => {
        return Math.floor(Math.random() * 8999 + 1000);
    }
    
  return (
    <div className='h-screen flex flex-col justify-center items-center'>
      <img src='/spy_icon.svg' className='w-48 h-48'></img>
      <h1 className='text-6xl font-bold py-16'>Spyfall</h1>
      <div className='flex flex-col justify-center w-40 pb-8 space-y-4 mx-auto'>  
        <p className='text-2xl text-white'>Enter Name:</p>        
        <input
            onChange={(e) => setName(e.target.value)}
        >
        </input>        
      </div>
      <div className='flex justify-items-center flex-col w-28 space-y-4 mx-auto'>
        <NavLink 
            to='/lobby' 
        >
            <button 
                className='w-full border rounded-md p-1.5 border-slate-400 bg-slate-300 hover:bg-slate-500 hover:text-white disabled:bg-slate-600 disabled:border-slate-700 disabled:hover:text-black'
                onClick={handleClick}
                disabled={ !(name && /\S/.test(name)) }
            >
                Next
            </button>
        </NavLink>
        <NavLink 
            to='/' 
        >
            <button className='w-full border rounded-md p-1.5 border-slate-400 bg-slate-300 hover:bg-slate-500 hover:text-white'>
                Back
            </button>
        </NavLink>
      </div>
    </div>
  )
}

export default CreateGame
