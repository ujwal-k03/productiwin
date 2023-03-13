import { useState, useEffect } from 'react';
import { Outlet } from 'react-router-dom'
import { AuthContext, authGET } from '../HandleAuth';
import Navbar from '../components/Navbar';


const Base = () => {

    const [userId, setUserId] = useState(null);
    const [email, setEmail] = useState(null);
    const [loaded, setLoaded] = useState(false);
    const context = {userId, setUserId};

    useEffect(() => {
        const f1 = async () => {
            const data = await authGET('/api/auth/details', setUserId);
            console.log(data);
            setEmail(data.email);
            setLoaded(true);
        }
        f1();
    })

    return (
        <AuthContext.Provider value={context}>
            <div className="base h-screen bg-blue-200 font-nunito flex flex-col">
                { 
                    loaded && 
                    <Navbar email = {email}/>
                }
                {
                    loaded &&
                    <Outlet/>
                }
                {
                    !loaded &&
                    <h1>Loading...</h1>
                }
                
            </div>
        </AuthContext.Provider>
    );
}
 
export default Base;