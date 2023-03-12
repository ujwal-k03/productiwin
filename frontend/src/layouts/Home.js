import { useEffect } from "react";

const Home = () => {
    useEffect(() => {
        const f = async () => {
            const res = await fetch('/api/deadlines', {
                method: 'GET'
            });
            const data = await res.json();
        }
        f();
    })
    return (
        <h1>Welcome to the home!</h1>
    );
}
 
export default Home;