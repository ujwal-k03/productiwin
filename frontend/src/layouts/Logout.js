import { useContext } from 'react';
import {AuthContext, authGET} from '../HandleAuth'

export const Logout = () => {
    const {setUser} = useContext(AuthContext);
    setUser(null);

    return (
        <div className="flex h-screen w-full justify-center">
            <h1 className="text-6xl font-bold text-gray-600 font-sans relative top-1/4">
                Logged out successfully!
            </h1>
        </div>
    );
}

export const logoutLoader = async () => {
    const res = await authGET('/api/auth/logout');
    return res;
}