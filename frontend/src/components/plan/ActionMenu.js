import { useEffect, useRef, useState } from "react";

const ActionMenu = ({scope, setColor}) => {
    const [enable, setEnable] = useState(false);
    const menuRef = useRef(null);
    const enableString = enable ? "flex" : "none";

    useEffect(() => {
        document.addEventListener("contextmenu", (event) => {

            if(event.target != scope){
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
        <div ref={menuRef} style={{ display: enableString }} id="action-menu" className="block absolute z-50">
            <div className="flex p-2 bg-white rounded-md shadow-md flex-nowrap">
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
        </div>
    );
}
 
export default ActionMenu;