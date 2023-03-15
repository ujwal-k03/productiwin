import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext, authDELETE } from '../../HandleAuth'

const DelForm = ({setMode, deadline, setUpdate}) => {
    const { setUserId } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        authDELETE(`/api/deadlines/${deadline._id}`, setUserId, navigate);

        setMode(0);
        setUpdate(true);
    }
    return (
        <div className="deadline-form-card">
            <form className="flex flex-col items-center w-full" onSubmit={handleSubmit}>
                <div className="flex justify-end w-full" onClick={()=>setMode(0)}>
                    <button type="button" className="cross-icon">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>
                <h1 className="mb-4 text-center font-extrabold text-2xl border-b-2 border-gray-600"> Delete deadline </h1>
                <div className="deadline-mini-info flex flex-col justify-center items-center">
                    <h1 className="font-extrabold text-lg">
                        {deadline.title}
                    </h1>
                    <h3>
                        {new Date(deadline.date).toLocaleDateString("en-US", {
                            weekday: "short",
                            day: "numeric",
                            month: "short",
                            year: "numeric"
                        })}
                    </h3>
                    <h3 className=""> 
                        
                        {new Date(deadline.date).toLocaleTimeString("en-US", {
                            hour: "2-digit",
                            minute: "2-digit"
                        })}
                    </h3>
                </div>
                <h1 className="text-center my-2">Are you sure you want to delete this deadline?</h1>
                
                <button className="p-1 outline outline-1 rounded-lg w-1/2 outline-red-600 hover:bg-red-500 transition duration-300">Delete deadline</button>
            </form>
        </div>
    );
}
 
export default DelForm;