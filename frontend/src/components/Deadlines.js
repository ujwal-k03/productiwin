import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext, authGET } from "../HandleAuth";
import AddForm from "./deadlines/AddForm";
import Deadline from "./deadlines/Deadline";
import DelForm from "./deadlines/DelForm";
import EditForm from "./deadlines/EditForm";


const Deadlines = () => {
    const [deadlines, setDeadlines] = useState(null);
    const [deadline, setDeadline] = useState(false);
    const { userId, setUserId } = useContext(AuthContext);
    const navigate = useNavigate();

    // 0 for none
    // 1 for edit
    // 2 for delete
    const [mode, setMode] = useState(0);
    const [update, setUpdate] = useState(true);
    
    useEffect(() => {

        if(update === false)
            return;

        // TODO: Make an abort controller for this
        const fetchDeadlines = async () => {
            const data = await authGET('/api/deadlines', setUserId, navigate);

            if(data) {
                const deadlines = data.deadlines.sort((a, b) => {
                    const aDate = new Date(a.date);
                    const bDate = new Date(b.date);
                    
                    return aDate > bDate;
                })
                
                setDeadlines(deadlines);
            }
        }
        fetchDeadlines();
        setUpdate(false);

    }, [update]);

    return (
            <div className="border-gray-300 bg-gray-50 border rounded-sm m-4 w-[480px] md:w-[720px] flex flex-col relative h-[88vh]">
                <h1 className="text-center font-extrabold uppercase text-3xl my-4">Deadlines</h1>
                <div draggable="true" className="flex justify-center">
                    <button className="add-deadline-btn" onClick={()=>{setMode(3)}}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <span className="mx-1">
                            Add new deadline
                        </span>
                    </button>
                </div>
                <div className="mt-3 mb-2 overflow-scroll">
                    { deadlines && deadlines.map((deadline) => (
                        <Deadline 
                            deadline={deadline}
                            key= {deadline._id}
                            setDeadline={setDeadline}
                            setMode={setMode}
                        />
                        ))}
                </div>
                { mode===3 && <AddForm setMode={setMode} setUpdate={setUpdate}/>}
                { mode===1 && <EditForm deadline={deadline} setMode={setMode} setUpdate={setUpdate}/> }
                { mode===2 && <DelForm deadline={deadline} setMode={setMode} setUpdate={setUpdate}/> }
            </div>
    );
}
 
export default Deadlines;