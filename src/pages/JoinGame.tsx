import { NavLink } from 'react-router'
import '../App.css'

function JoinGame() {
  return (
    <div className='h-screen flex flex-col justify-center items-center'>
      <img src='/spy_icon.svg' className='w-48 h-48'></img>
      <h1 className='text-6xl font-bold py-16'>Spyfall</h1>      
      <div className='flex flex-col justify-center w-40 pb-8 space-y-4 mx-auto'>
        <p className='text-2xl text-white'>Enter Code:</p>        
        <input></input>        
      </div>
      <div className='flex justify-items-center flex-col w-28 space-y-4 mx-auto'>
        <button className='border rounded-md p-1.5 border-slate-400 bg-slate-300 hover:bg-slate-500 hover:text-white'>
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
