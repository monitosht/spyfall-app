import { NavLink } from 'react-router'
import '../App.css'
import { useState } from 'react';

function JoinGame() {
  const [gamepin, setGamepin] = useState('');

  const handleClick = () => {
    console.log(gamepin);
  }

  return (
    <div className='h-screen flex flex-col justify-center items-center'>
      <img src='/spy_icon.svg' className='w-48 h-48'></img>
      <h1 className='text-6xl font-bold py-16'>Spyfall</h1>      
      <div className='flex flex-col justify-center w-40 pb-8 space-y-4 mx-auto'>
        <p className='text-2xl text-white'>Enter Code:</p>        
        <input
          onChange={(e) => setGamepin(e.target.value)}
        >
        </input>        
      </div>
      <div className='flex justify-items-center flex-col w-28 space-y-4 mx-auto'>
        <button 
          className='w-full border rounded-md p-1.5 border-slate-400 bg-slate-300 hover:bg-slate-500 hover:text-white disabled:bg-slate-600 disabled:border-slate-700 disabled:hover:text-black'
          onClick={handleClick}
          disabled={ !(gamepin && /\S/.test(gamepin)) }
        >
            Next
        </button>
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
