import { useEffect, useRef, useState } from "react";
import ActionMenu from "./ActionMenu";
import { Interactive } from './Interactive';
import { getHeight, getTime, getTimeString, getTranslate} from './TimeTools';

const Task = ({task, id, modifyTask, deleteTask}) => {
    
    const resizeRef = useRef(null);
    const inputRef = useRef(null);
    const [translate, setTranslate] = useState(getTranslate(task.startTime));
    const [height, setHeight] = useState(getHeight(task.startTime, task.endTime));
    const [color, setColor] = useState(task.color);
    const [taskName, setTaskName] = useState(task.taskName);
    const interactive = useRef(null);

    const Task = {
        _id: id,
        taskName: taskName,
        color: color,
        startTime: getTime(translate),
        endTime: getTime(translate + height)
    };
    
    useEffect(() => {
        inputRef.current.addEventListener("focusout", (event) => {
            if(event.target.value.length === 0)
                setTaskName("Untitled Task");
        });
    }, []);

    useEffect(() => {
        interactive.current = new Interactive(resizeRef.current, 24, setTranslate, setHeight, 24);
        interactive.current.handleDrag();
        interactive.current.handleResize();
    }, []);

    useEffect(() => {
        modifyTask(id, Task);
    }, [taskName, color, translate, height]);

    return (
        <div style={{
                transform: `translateY(${translate}px)`,
                height: `${height}px`
            }} 
            ref={resizeRef}
            id={id}
            className={`flex items-start task right-0 top-0 w-11/12 dark:bg-${color}-600 bg-${color}-500 rounded-md text-center z-50`}>

                <div className="task-badge">
                    {getTimeString(translate)} - {getTimeString(height + translate)}
                </div>
                <div className="self-center px-2">
                    <input type="text" 
                        ref={inputRef}  
                        maxLength={50}
                        value={taskName}
                        style={{
                            width: `${taskName.length}ch`,
                            maxWidth: `100%`,
                        }}
                        className="bg-transparent rounded-sm"
                        onChange={(e)=> setTaskName(e.target.value)}                        
                        />
                    
                </div>
                {resizeRef.current && <ActionMenu scope={resizeRef.current} id={id} deleteTask={deleteTask} setColor={setColor}/>}
                <div className="resizer resizer-t z-10"></div>
                <div className="resizer resizer-b z-10"></div>
        </div>
    )
}
 
export default Task;