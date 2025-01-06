import { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { database } from '../database';
import { get, ref, set } from 'firebase/database';
import { useAppDispatch } from '../redux/hooks';
import { setGamepin, setNickname, setPlayerId } from '../redux/slices/sessionSlice';
import NicknameSlide from '../components/NicknameSlide';
import NextButton from '../components/NextButton';
import BackButton from '../components/BackButton';
import Identity from '../../identity';
import '../App.css'

function JoinGame() {
  const dispatch = useAppDispatch();

  const identity = new Identity();
  const params = useParams();

  const [name, setName] = useState('');
  const [gamepinInput, setGamepinInput] = useState('');

  const [gameExists, setGameExists] = useState(false);
  const [showNicknameSlide, setShowNicknameSlide] = useState(false);

  useEffect(() => {
    if(params.gamepin) {
      setGamepinInput(params.gamepin);
      handleContinue();
    }
  // eslint-disable-next-line
  }, []);

  useEffect(() => { 
    const gameRef = ref(database, 'active-games/' + gamepinInput);

    get(gameRef)
    .then((snapshot) => {
      setGameExists(snapshot.exists());
    })
    .catch((error) => {
      console.error(error);
    });
  }, [gamepinInput]);

  const handleContinue = () => {
    setShowNicknameSlide(true);
  }

  const handleClick = () => {
    identity.setNickname(name);

    dispatch(setNickname(identity.nickname));
    dispatch(setPlayerId(identity.playerId));
    dispatch(setGamepin(gamepinInput));

    const gameRef = ref(database, 'active-games/' + gamepinInput);

    get(gameRef)
    .then((snapshot) => {
      const data = snapshot.val();
      if(data) {
        const updatedPlayers = [...data.players, identity];
        set(gameRef, {
          ...data,
          players: updatedPlayers
        });
      }
      setGameExists(snapshot.exists());
    })
    .catch((error) => {
      console.error(error);
    });
  }

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
        ? <NicknameSlide 
            name={name} 
            setName={setName} 
            gamepin={Number(gamepinInput)} 
            handleClick={handleClick}
          />
        : gamepinInputRender()
      }
    </div>
  )
}

export default JoinGame
