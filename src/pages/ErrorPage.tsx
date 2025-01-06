import { useEffect, useState } from "react";
import { useParams } from "react-router";
 
function ErrorPage() {
    const params = useParams();

    const [message, setMessage] = useState('');

    useEffect(() => {
        switch(params.code) {
            case '400': 
                setMessage("400 - Bad Request");    
                break;
            case '403': 
                setMessage("403 - Forbidden");      
                break;
            case '404': 
                setMessage("404 - Not Found");      
                break;
        }
    // eslint-disable-next-line
    }, []);

    return (
        <div>
            <h1 className="text-4xl font-bold">Error {message}</h1>
        </div>
    );
}

export default ErrorPage;