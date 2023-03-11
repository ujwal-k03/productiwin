import { useEffect, useRef, useState } from "react";

const ActionMenu = ({scope, setColor, deleteTask, id}) => {
    const [enable, setEnable] = useState(false);
    const menuRef = useRef(null);
    const enableString = enable ? "flex" : "none";

    useEffect(() => {
        document.addEventListener("contextmenu", (event) => {

            if(event.target !== scope){
                setEnable(false);
                return;
            }
        
            event.preventDefault();

            setEnable(true);

            const { offsetX, offsetY } = event;
            menuRef.current.style.top = `${offsetY}px`;
            menuRef.current.style.left = `${offsetX}px`;

            const f1 = (event) => {
                setEnable(false);
                document.removeEventListener("click", f1);
            }

            document.addEventListener("click", f1);

        })
    }, [])

    return (
        <div ref={menuRef} style={{ display: enableString }} id="action-menu" className="flex flex-col bg-white rounded-md shadow-md absolute z-50">
            <div className="flex pt-2 px-2 flex-nowrap">
                <button 
                    className="rounded-full h-4 w-4 bg-red-600 mr-1 hover:h-5 hover:w-5"
                    onClick={() => setColor("red")}
                ></button>
                <button 
                    className="rounded-full h-4 w-4 bg-blue-600 mr-1 hover:h-5 hover:w-5"
                    onClick={() => setColor("blue")}
                ></button>
                <button 
                    className="rounded-full h-4 w-4 bg-green-600 mr-1 hover:h-5 hover:w-5"
                    onClick={() => setColor("green")}
                ></button>
                <button 
                    className="rounded-full h-4 w-4 bg-yellow-600 hover:h-5 hover:w-5"
                    onClick={() => setColor("yellow")}
                ></button>
            </div>
            <button 
                onClick={() => deleteTask(id)}
                className="flex my-2 mx-2 p-1 text-slate-700 hover:shadow-lg rounded-md hover:bg-red-100">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none  " viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                </svg>
                <span className="font-extrabold">
                    Delete
                </span>
            </button>
        </div>
    );
}
 
export default ActionMenu;