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
                className='min-w-28 w-auto border rounded-md p-2 border-slate-600 bg-slate-400 hover:bg-slate-500 hover:text-white disabled:bg-slate-300 disabled:text-slate-500'
                onClick={props.handleClick}
            >
                {props.text ? props.text : 'Back'}
            </button>
        </NavLink>
    );
}

export default BackButton;