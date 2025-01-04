import { NavLink } from 'react-router'
import '../App.css'
import { useAppSelector } from '../redux/hooks';
import { child, get, ref, set } from 'firebase/database';
import { database } from '../database';

function LobbyPage() {
  const nickname = useAppSelector((state) => state.session.nickname);
  const gamepin = useAppSelector((state) => state.session.gamepin);  
  
  const clearDatabase = () => {
    get(child(ref(database), 'active-games/' + gamepin))
    .then((snapshot) => {
      if(snapshot.val().hostname === nickname) {
        set(ref(database, 'active-games/' + gamepin), null);
      }
    })
    .catch((error) => {
      console.error(error);
    });
    console.log('cleared db');
  }
    
  return (
    <div className='h-screen flex flex-col justify-center items-center'>
      <img src='/spy_icon.svg' className='w-48 h-48'></img>
      <h1 className='text-6xl font-bold py-16'>Spyfall</h1>
      <div className='flex flex-col justify-center w-60 pb-8 space-y-4 mx-auto'>
        <p className='text-2xl text-white'>{nickname}</p>    
        <p className='text-2xl text-white'><b>Gamepin:</b> {gamepin}</p>  
      </div>
      <div className='flex justify-items-center flex-col w-28 space-y-4 mx-auto'>
        <NavLink 
            to='/' 
        >
          <button 
            className='w-full border rounded-md p-1.5 border-slate-400 bg-slate-300 hover:bg-slate-500 hover:text-white'              
            onClick={clearDatabase}
          >
            Exit
          </button>
        </NavLink>
      </div>
    </div>
  )
}

export default LobbyPage
