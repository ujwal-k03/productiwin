import { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { AuthContext } from "../HandleAuth";

const Do = () => {
    const { userId } = useContext(AuthContext);

    if(userId){
        return (
            <div className='w-full flex justify-center'>
                <Outlet/>
            </div>
        );
    }
    else{
        return <Navigate to='/login' />
    }
}
 
export default Do;