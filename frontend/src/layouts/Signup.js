import {useContext, useEffect, useState} from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../HandleAuth';

const Signup = () => {
    const [emailError, setEmailError] = useState("");
    const [passwordError, setPasswordError] = useState("");
    const userId = useContext(AuthContext);
    const navigate = useNavigate();

    useEffect(() => {
        const form = document.querySelector('form');
        
        form.addEventListener('submit', async (e) => {
                e.preventDefault();
                setEmailError("");
                setPasswordError("");

                const email = form.email.value;
                const password = form.password.value;

                try {
                    const res = await fetch('/api/auth/signup', {
                        method: 'POST',
                        body: JSON.stringify({email, password}),
                        headers: {'Content-Type': 'application/json'}
                    });

                    const data = await res.json();
                    if(data.errors){
                        setEmailError(data.errors.email);
                        setPasswordError(data.errors.password);
                    }

                    if(data.user){
                        navigate("/do/plans");
                    }

                } catch (err) {
                    console.log(err);
                }
            })
    }, []);

    return (
        <div className="bg-white rounded-lg w-1/3 h-2/3 self-center relative top-[10%]">
            <h1 className="font-extrabold text-4xl my-6 p-6 px-10">Signup</h1>
            <form className="p-6 px-10 flex flex-col">
                <label htmlFor="email" className="my-2">Email: </label>
                <input type="text" name="email" required className="outline-none border-b-2 my-2"/>
                <div className="text-sm bg-red-200 px-2 rounded-md">{emailError}</div>

                <label htmlFor="password" className="my-2">Password: </label>
                <input type="password" name="password" required className="my-2 border-b-2 "/>
                <div className="text-sm bg-red-200 px-2 rounded-md">{passwordError}</div>
                <button className="outline-1 rounded-md outline mt-2">Sign Up!</button>
            </form>
            <h1>{userId}</h1>
        </div>
    );
}
 
export default Signup;