import { database } from '../database';
import { child, get, ref, set } from 'firebase/database';
import { useAppSelector } from '../redux/hooks';
import BackButton from '../components/BackButton';
import '../App.css'
import NextButton from '../components/NextButton';
import { useEffect, useState } from 'react';

function LobbyPage() {
  const nickname = useAppSelector((state) => state.session.nickname);
  const gamepin = useAppSelector((state) => state.session.gamepin);

  const [hostPermissions, setHostPermissions] = useState(false);

  useEffect(() => {
    get(child(ref(database), 'active-games/' + gamepin))
    .then((snapshot) => {
      if(snapshot.val().hostname === nickname) {
        setHostPermissions(true);
      }
    })
    .catch((error) => {
      console.error(error);
    });
  // eslint-disable-next-line
  }, []);
  
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
        {
          hostPermissions
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
          handleClick={clearDatabase}
        />
      </div>
    </div>
  )
}

export default LobbyPage
