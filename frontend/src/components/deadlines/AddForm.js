import { useState } from "react";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext, authPOST } from '../../HandleAuth'

const AddForm = ({setMode, setUpdate}) => {

    const [title, setTitle] = useState(null);
    const [date, setDate] = useState(null);
    const { setUserId } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const deadlineDate = new Date(date);
        const deadline = {title, date: deadlineDate};
        
        const data = await authPOST('/api/deadlines', deadline, setUserId, navigate);

        setMode(0);
        setUpdate(true);
    }
    return (
        <div className="flex justify-center items-center absolute w-3/5 h-3/5 left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-slate-100 outline shadow-lg outline-1 rounded-lg">
            <form className="flex flex-col items-center w-full" onSubmit={handleSubmit}>
                <div className="flex justify-end w-full" onClick={()=>setMode(0)}>
                    <button type="button" className="cross-icon">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>
                <h1 className="mb-20 text-center font-extrabold text-2xl border-b-2 border-gray-600"> Add a deadline </h1>
                <label className="text-center font-bold text-2xl">Deadline title:</label>
                <input className="rounded-sm outline outline-1 mb-8 mt-2 w-4/5"
                    type="text"
                    required
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />
                <label className="text-center font-bold text-xl">Date: </label>
                <input className="rounded-sm outline outline-1 mb-8 mt-2"
                    type="datetime-local"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    required
                />
                <button className="p-1 outline outline-1 rounded-lg w-1/2 outline-green-600 hover:bg-green-600 transition duration-300">Add deadline</button>
            </form>
        </div>
    );
}
 
export default AddForm;