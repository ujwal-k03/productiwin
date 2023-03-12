import { useEffect, useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom'
import { AuthContext } from '../HandleAuth';
import Navbar from '../components/Navbar';


const Base = () => {

    const [userId, setUserId] = useState(null);
    const context = {userId, setUserId};

    return (
        <AuthContext.Provider value={context}>
            <div className="base h-screen bg-blue-200 font-nunito flex flex-col">
                <Navbar/>
                <Outlet/>
            </div>
        </AuthContext.Provider>
    );
}
 
export default Base;