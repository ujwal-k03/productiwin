import { useState } from "react";

const EditForm = ({setMode, deadline, setUpdate}) => {
    const [title, setTitle] = useState(deadline.title);
    const [date, setDate] = useState(deadline.date.substr(0,16));

    const handleSubmit = async (e) => {
        e.preventDefault();
        const deadlineDate = new Date(date);
        const tempDeadline = {title, date: deadlineDate, _id: deadline._id};
        await fetch('/api/deadlines', {
            method: 'PATCH',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(tempDeadline)
        })

        setMode(0);
        setUpdate(true);
    }
    return (
        <div className="modify-card">
            <form className="flex flex-col items-center w-full" onSubmit={handleSubmit}>
                <div className="flex justify-end w-full" onClick={()=>setMode(0)}>
                    <button type="button" className="cross-icon">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>
                <h1 className="mb-4 text-center font-extrabold text-2xl border-b-2 border-gray-600"> Edit deadline </h1>
                <div className="deadline mx-4 px-4 mb-6 rounded-lg bg-slate-200 flex justify-between items-center">
                    <div>
                        <h1 className="font-extrabold text-lg">
                            {deadline.title}
                        </h1>
                        <h3 className=""> 
                            {new Date(deadline.date).toDateString()}
                        </h3>
                    </div>
                </div>
                <label className="text-center font-bold text-2xl">Deadline title:</label>
                <input className="rounded-sm outline outline-1 mb-4 mt-2 w-4/5"
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
                <button className="p-1 outline outline-1 rounded-lg w-1/2 outline-blue-600 hover:bg-blue-400 transition duration-300">Edit deadline</button>
            </form>
        </div>
    );
}
 
export default EditForm;