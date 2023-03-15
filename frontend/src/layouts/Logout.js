import { useContext, useEffect } from 'react';
import { useOutletContext, Link } from 'react-router-dom';
import {AuthContext, authGET} from '../HandleAuth'

const Logout = () => {
    const {setUserId} = useContext(AuthContext);
    const setEmail = useOutletContext();

    useEffect(() => {
        setUserId(null);
        setEmail(null);
        authGET('/api/auth/logout');
    })

    return (
        <div className="h-1/3 mx-auto relative top-[20%] flex flex-col justify-around items-center">
            <h1 className="text-4xl font-bold text-gray-600 font-sans ">
                Logged out successfully!
            </h1>
            <Link className='menubar-item underline' to={'/login'}>
                Log in again
            </Link>        
        </div>
    );
}

export default Logout;