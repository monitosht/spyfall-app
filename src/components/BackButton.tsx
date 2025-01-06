import { NavLink } from "react-router";

interface BackButtonProps {
    text?: string;
    linkTo: string;
    handleClick?: () => void;
}

const BackButton = (props: BackButtonProps) => {
    return (
        <NavLink 
            to={props.linkTo ? props.linkTo : '#'} 
        >
            <button 
                className='w-full border rounded-md p-1.5 border-slate-400 bg-slate-300 hover:bg-slate-500 hover:text-white disabled:bg-slate-600 disabled:border-slate-700 disabled:hover:text-black'
                onClick={props.handleClick}
            >
                {props.text ? props.text : 'Back'}
            </button>
        </NavLink>
    );
}

export default BackButton;