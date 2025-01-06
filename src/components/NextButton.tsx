import { NavLink } from "react-router";

interface NextButtonProps {
    text?: string;
    linkTo?: string;
    disabledCondition?: boolean;
    handleClick?: () => void;
}

const NextButton = (props: NextButtonProps) => {
    return (
        <NavLink 
            to={props.linkTo ? props.linkTo : '#'} 
        >
            <button 
                className='w-full border rounded-md p-1.5 border-slate-400 bg-slate-300 hover:bg-slate-500 hover:text-white disabled:bg-slate-600 disabled:border-slate-700 disabled:hover:text-black'
                onClick={props.handleClick}
                disabled={props.disabledCondition}
            >
                {props.text ? props.text : 'Next'}
            </button>
        </NavLink>
    );
}

export default NextButton;