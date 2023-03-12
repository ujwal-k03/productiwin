import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
    const [error, setError] = useState("")
    const navigate = useNavigate();

    useEffect(() => {
        const form = document.querySelector('form');
        
        form.addEventListener('submit', async (e) => {
                e.preventDefault();
                setError("");

                const email = form.email.value;
                const password = form.password.value;
                
                try {
                    const res = await fetch('/api/auth/login', {
                        method: 'POST',
                        body: JSON.stringify({email, password}),
                        headers: {'Content-Type': 'application/json'}
                    });

                    const data = await res.json();
                    console.log(data);

                    if(data.errors){
                        setError(data.errors.error);
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
            <h1 className="font-extrabold text-4xl my-6 p-6 px-10">Login</h1>
            <form className="p-6 px-10 flex flex-col">
                <label htmlFor="email" className="my-2">Email: </label>
                <input type="text" name="email" required className="outline-none border-b-2 my-2"/>

                <label htmlFor="password" className="my-2">Password: </label>
                <input type="password" name="password" required className="my-2 border-b-2 "/>
                <div className="text-sm bg-red-200 px-2 mt-3 rounded-md">{error}</div>
                <button className="outline-1 rounded-md outline mt-2">Login!</button>
            </form>
        </div>
    );
}
 
export default Login;