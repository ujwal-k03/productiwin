const DelForm = ({setMode, deadline, setUpdate}) => {

    const handleSubmit = async (e) => {
        e.preventDefault();
        await fetch(`/api/deadlines/${deadline._id}`, {
            method: 'DELETE',
        })

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
                <h1 className="mb-4 text-center font-extrabold text-2xl border-b-2 border-gray-600"> Delete deadline </h1>
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
                <h1 className="text-center my-2">Are you sure you want to delete this deadline?</h1>
                
                <button className="p-1 outline outline-1 rounded-lg w-1/2 outline-red-600 hover:bg-red-500 transition duration-300">Delete deadline</button>
            </form>
        </div>
    );
}
 
export default DelForm;