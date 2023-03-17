import { useState, useEffect } from 'react';
import { Outlet } from 'react-router-dom'
import { AuthContext, authGET } from '../HandleAuth';
import Navbar from '../components/Navbar';

const Base = () => {

    const [userId, setUserId] = useState(null);
    const [email, setEmail] = useState(null);
    const [loaded, setLoaded] = useState(false);

    let dMode = false;
    if(localStorage.theme === 'dark' 
        && window.matchMedia('(prefers-color-scheme: dark)').matches)
        dMode = true;
    
    const [darkMode, setDarkMode] = useState(dMode);
    
    const setTheme = () => {
        if(darkMode === false){
            setDarkMode(true);
            localStorage.setItem('theme', 'dark');
        }
        else if(darkMode === true){
            setDarkMode(false);
            localStorage.setItem('theme', 'light');
        }
    }

    if(darkMode == true)
        document.documentElement.classList.add('dark');
    else
        document.documentElement.classList.remove('dark');

    const context = {userId, setUserId};

    useEffect(() => {
        const f1 = async () => {
            const data = await authGET('/api/auth/details', setUserId);
            if(data?.email)
                setEmail(data.email);

            setLoaded(true);
        }
        f1();
    }, [])

    return (
        <AuthContext.Provider value={context}>
            <div className="absolute w-full base h-screen font-nunito bg-gray-200 dark:bg-gray-900">
                { 
                    loaded && 
                    <Navbar email = {email} setTheme={setTheme} dark={darkMode}/>
                }
                {
                    loaded &&
                    <Outlet context={setEmail}/>
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