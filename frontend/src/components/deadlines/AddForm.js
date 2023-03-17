import { useState } from "react";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext, authPOST } from '../../HandleAuth'

const AddForm = ({setMode, setUpdate}) => {

    const [title, setTitle] = useState(null);
    const [date, setDate] = useState(null);
    const [time, setTime] = useState(null);

    const dateTime = date+"T"+time;

    const { setUserId } = useContext(AuthContext);
    const navigate = useNavigate();
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        const deadlineDate = new Date(dateTime);
        const deadline = {title, date: deadlineDate};
        
        const data = await authPOST('/api/deadlines', deadline, setUserId, navigate);

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
                <h1 className="mb-20 text-center font-extrabold text-2xl border-b-2 border-gray-600 dark:border-gray-400"> Add a deadline </h1>
                <label className="text-center font-bold text-2xl">Deadline title:</label>
                <input className="rounded-sm border border-gray-300 dark:border-gray-500 my-2 w-4/5 bg-transparent"
                    type="text"
                    required
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />
                <div>
                    <label className="text-center font-bold text-xl">Date: </label>
                    <input className="rounded-sm border border-gray-300 dark:border-gray-500 my-2 bg-transparent"
                        type="date"
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label className="text-center font-bold text-xl">Time: </label>
                    <input className="rounded-sm border border-gray-300 dark:border-gray-500 my-2 bg-transparent"
                        type="time"
                        value={time}
                        onChange={(e) => setTime(e.target.value)}
                        required
                    />
                </div>
                <button className="add-deadline-btn">Add deadline</button>
            </form>
        </div>
    );
}
 
export default AddForm;