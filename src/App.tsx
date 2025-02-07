import { NavLink } from 'react-router'
import './App.css'
import { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from './redux/hooks';
import { resetDefaults } from './redux/slices/sessionSlice';
import { clearMessage } from './redux/slices/messageSlice';

function App() {
  const dispatch = useAppDispatch();
  const message = useAppSelector((state) => state.message.message);

  useEffect(() => {
    dispatch(resetDefaults());    
    
    if(message) {
      const timer = setTimeout(() => {
        dispatch(clearMessage());
      }, 5000);

      return () => clearTimeout(timer);
    }
  // eslint-disable-next-line
  }, []);

  /*
  useEffect(() => {
    if(message) {
      const timer = setTimeout(() => {
        dispatch(clearMessage());
      }, 5000);

      return () => clearTimeout(timer);
    }
  }, [dispatch, message]);
  */

  return (
    <>
      <div className='h-screen flex flex-col justify-center items-center'>
        <img src='/spyfall-app/#/spy_icon.svg' className='w-48 h-48'></img>
        <h1 className='text-6xl font-bold py-16'>Spyfall</h1>
        <div className='flex justify-items-center flex-col w-28 space-y-4 mx-auto mb-8'>
          <NavLink to='/create'>
            <button className='w-full border rounded-md p-2 border-slate-600 bg-slate-400 hover:bg-slate-500 hover:text-white'>
              Create Game
            </button>
          </NavLink>
          <NavLink to='/join'>
            <button className='w-full border rounded-md p-2 border-slate-600 bg-slate-400 hover:bg-slate-500 hover:text-white'>
              Join Game
            </button>
          </NavLink>
        </div>
        <p className="text-red-400 font-bold h-8">{message}</p>
      </div>    
    </>
  )
}

export default App
