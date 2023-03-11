import { Outlet } from 'react-router-dom'
import Navbar from '../components/Navbar';

const Base = () => {
    return (
        <div className="base h-screen bg-blue-200 font-nunito flex flex-col">
            <Navbar/>
            <Outlet/>
        </div>
    );
}
 
export default Base;