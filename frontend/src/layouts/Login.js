import { useState, useEffect, useContext } from "react";
import { useNavigate, useOutletContext } from "react-router-dom";
import { AuthContext, authPOST } from "../HandleAuth";

const Login = () => {
    const [error, setError] = useState("");
    const [loggedIn, setLoggedIn] = useState("");
    const navigate = useNavigate();
    const { setUserId } = useContext(AuthContext);
    const setEmail = useOutletContext();

    useEffect(() => {
        const form = document.querySelector('form');
        
        form.addEventListener('submit', async (e) => {
                e.preventDefault();
                setError("");

                const email = form.email.value;
                const password = form.password.value;
                
                try {
                    const data = await authPOST('/api/auth/login', {email, password}, setUserId);
                    
                    if(data.errors){
                        setError(data.errors.error);
                    }

                    if(data.userid){
                        setEmail(data.email);
                        setLoggedIn(true);
                        setTimeout(() => navigate("/do/plans"), 1000);
                    }

                } catch (err) {
                    console.log(err);
                }
            })
    }, []);

    if(loggedIn)
        return (
            <div className="auth-card flex-col flex justify-center items-center text-xl">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8 mb-10 text-green-500">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span className="mx-2"> 
                    Logged in successfully!
                </span>
            </div>
        )
    return (
        <div className="auth-card">
            <h1 className="font-extrabold text-4xl my-6 p-6 px-10">Login</h1>
            <form className="p-6 px-10 flex flex-col ">
                <label htmlFor="email" className="my-2">Email: </label>
                <input type="text" name="email" required className="outline-none border-b-2 my-2 bg-transparent"/>

                <label htmlFor="password" className="my-2">Password: </label>
                <input type="password" name="password" required className="my-2 border-b-2 bg-transparent"/>
                <div className="text-sm bg-red-200 px-2 mt-3 rounded-md">{error}</div>
                <button className="outline-1 rounded-md outline mt-2 py-2 px-3 self-center">Login!</button>
            </form>
        </div>
    );
}
 
export default Login;