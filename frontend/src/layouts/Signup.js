import {useContext, useEffect, useState} from 'react';
import { useNavigate, useOutletContext } from 'react-router-dom';
import { AuthContext, authPOST } from '../HandleAuth';

const Signup = () => {
    const [emailError, setEmailError] = useState("");
    const [passwordError, setPasswordError] = useState("");
    const [signedUp, setSignedUp] = useState(false);
    const { setUserId } = useContext(AuthContext);
    const navigate = useNavigate();
    const setEmail = useOutletContext();

    useEffect(() => {
        const form = document.querySelector('form');
        
        form.addEventListener('submit', async (e) => {
                e.preventDefault();
                setEmailError("");
                setPasswordError("");

                const email = form.email.value;
                const password = form.password.value;

                try {
                    const data = await authPOST('/api/auth/signup', {email, password}, setUserId);
                    
                    if(data.errors){
                        setEmailError(data.errors.email);
                        setPasswordError(data.errors.password);
                    }

                    if(data.userid){
                        setEmail(data.email);
                        setSignedUp(true);
                        setTimeout(() => navigate("/do/plans"), 1000);
                    }

                } catch (err) {
                    console.log(err);
                }
            })
    }, []);

    if(signedUp)
        return (
            <div className="auth-card flex-col flex justify-center items-center text-xl">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8 mb-10 text-green-500">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span className="mx-2"> 
                    Signed up successfully!
                </span>
            </div>
        )
    return (
        <div className="auth-card">
            <h1 className="font-extrabold text-4xl my-6 p-6 px-10">Signup</h1>
            <form className="p-6 px-10 flex flex-col">
                <label htmlFor="email" className="my-2">Email: </label>
                <input type="text" name="email" required className="outline-none border-b-2 my-2 bg-transparent dark:border-gray-500"/>
                <div className="text-sm dark:bg-red-700 dark:bg-opacity-75 bg-red-200 px-2 rounded-md">{emailError}</div>

                <label htmlFor="password" className="my-2">Password: </label>
                <input type="password" name="password" required className="my-2 border-b-2 bg-transparent dark:border-gray-500"/>
                <div className="text-sm dark:bg-red-700 dark:bg-opacity-75 bg-red-200 px-2 rounded-md">{passwordError}</div>
                <button className="rounded-md add-deadline-btn mt-2 py-2 px-3 self-center">Sign Up!</button>
            </form>
        </div>
    );
}
 
export default Signup;