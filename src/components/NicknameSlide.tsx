import NextButton from "./NextButton";
import BackButton from "./BackButton";

interface NicknameSlideProps {
    name: string;
    setName: (name: string) => void;
    gamepin: number;
    handleClick: () => void;
}

const NicknameSlide = (props: NicknameSlideProps) => {
    return (
        <>
            <div className='flex flex-col justify-center w-40 pb-8 space-y-4 mx-auto'>  
            <p className='text-2xl text-white'>Enter Name:</p>        
            <input
                onChange={(e) => props.setName(e.target.value)}
            >
            </input>        
        </div>
        <div className='flex justify-items-center flex-col w-28 space-y-4 mx-auto'>
            <NextButton 
                linkTo={`/lobby/${props.gamepin}`} 
                handleClick={props.handleClick} 
                disabledCondition={ !(props.name && /\S/.test(props.name)) }
            />
            <BackButton 
                linkTo="/"
            />
        </div>
      </>
    );
}

export default NicknameSlide;