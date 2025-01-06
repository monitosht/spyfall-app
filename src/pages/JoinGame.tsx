import { useEffect, useState } from 'react';
import { database } from '../database';
import { get, ref, child } from 'firebase/database';
import { useAppDispatch } from '../redux/hooks';
import { setGamepin, setNickname } from '../redux/sessionSlice';
import NicknameSlide from '../components/NicknameSlide';
import NextButton from '../components/NextButton';
import BackButton from '../components/BackButton';
import '../App.css'

function JoinGame() {
  const dispatch = useAppDispatch();

  const [name, setName] = useState('');
  const [gamepinInput, setGamepinInput] = useState('');

  const [gameExists, setGameExists] = useState(false);
  const [showNicknameSlide, setShowNicknameSlide] = useState(false);

  const handleContinue = () => {
    setShowNicknameSlide(true);
  }

  const handleClick = () => {
    dispatch(setNickname(name));
    dispatch(setGamepin(gamepinInput));
  }

  useEffect(() => { 
    get(child(ref(database), 'active-games/' + gamepinInput))
    .then((snapshot) => {
      setGameExists(snapshot.exists());
    })
    .catch((error) => {
      console.error(error);
    });
  }, [gamepinInput]);

  const gamepinInputRender = () => {
    return (
      <>
        <div className='flex flex-col justify-center w-48 pb-8 space-y-4 mx-auto'>
        <p className='text-2xl text-white'>Enter Game Pin:</p>        
        <input
          maxLength={4}
          onChange={(e) => setGamepinInput(e.target.value)}
        />       
        </div>
        <div className='flex justify-items-center flex-col w-28 space-y-4 mx-auto'>
          <NextButton
            handleClick={handleContinue}
            disabledCondition={gameExists && (gamepinInput.length === 4) && (/^[0-9\b]+$/.test(gamepinInput)) && (/\S/.test(gamepinInput)) ? false : true}
          />          
          <BackButton 
            linkTo="/"
          />
        </div>  
      </>    
    );
  }

  return (
    <div className='h-screen flex flex-col justify-center items-center'>
      <img src='/spy_icon.svg' className='w-48 h-48'></img>
      <h1 className='text-6xl font-bold py-16'>Spyfall</h1>      
      {
        showNicknameSlide 
        ? <NicknameSlide name={name} setName={setName} gamepin={Number(gamepinInput)} handleClick={handleClick}/>
        : gamepinInputRender()
      }
    </div>
  )
}

export default JoinGame
