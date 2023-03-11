import { Outlet } from "react-router-dom";
import Menu from '../components/Menu'
import Music from '../components/Music'
const Do = () => {
    return (
        <div className='grid grid-cols-7 flex-grow'>
            <Outlet/>
            <Menu/>
            <Music/>
        </div>
    );
}
 
export default Do;