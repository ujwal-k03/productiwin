import { useRef } from "react";

const AddRow = ({hidden, translate, addTask}) => {
    const selfRef = useRef(null)
    const addTranslatedTask = () => addTask(translate);

    return (
        <div ref={selfRef}
            id={`t${translate}`} className={`addrow addrow-style`}>
            <button 
                disabled={hidden}
                className="h-full w-full" onClick={addTranslatedTask}>
            </button>
        </div>
    );
}
 
export default AddRow;