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
                className='min-w-28 w-auto border rounded-md p-2 border-slate-600 bg-slate-400 hover:bg-slate-500 hover:text-white  disabled:bg-slate-300 disabled:text-slate-500'
                onClick={props.handleClick}
                disabled={props.disabledCondition}
            >
                {props.text ? props.text : 'Next'}
            </button>
        </NavLink>
    );
}

export default NextButton;