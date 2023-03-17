import { useState } from "react";
import { Navigate } from "react-router-dom";

const MiniTask = ({tskName, color, tim}) => {
    return <li className="flex flex-nowrap mx-2 items-center">
                <div className={`bg-${color}-500 dark:bg-${color}-600 rounded-full w-2 h-2 flex-shrink-0`}></div>
                <div className="text-xs mx-1 flex-shrink-0 text-ellipsis whitespace-nowrap overflow-hidden">
                    {
                        tim.toLocaleTimeString('en-US', {
                            hour:   '2-digit',
                            minute: '2-digit',
                        })
                    }
                </div>
                <div className="text-xs text-ellipsis whitespace-nowrap overflow-hidden flex-grow-0">
                    {tskName}
                </div>
            </li>
}

const Day = ({date, today, data}) => {

    const [clicked, setClicked] = useState(false);
    let todays = false;
    const year = date?.getFullYear();
    const month = date?.getMonth();
    const datE = date?.getDate();

    if(date?.getTime() === today.getTime())
        todays = true;


    if(clicked)
        return <Navigate to={`/do/plans/${year}/${month}/${datE}`}/>

    if(data && data.tasks){
        console.log(data.tasks)
        data.tasks.sort((a,b) => (new Date(a.startTime) - new Date(b.startTime)));
    }

    if(date)
        return (
            <div className="day">
                <button className="h-full w-full absolute z-50"
                    onClick={() => {setClicked(true)}}
                />
                <div className="flex flex-col justify-center">
                    <h1 className={`text-center text-sm ${todays? 'text-blue-500' : ''}`}>
                        {
                            date.getDate()
                        }
                    </h1>
                    <h1 className="text-center text-xs">
                        {   data &&
                            data.name
                        }
                    </h1>
                </div>
                <ul className="h-[60%] absolute overflow-scroll w-full">
                    {   data &&
                        data.tasks.map((task) => <MiniTask tskName={task.taskName} color={task.color} tim={new Date(task.startTime)}/>) 
                    }
                </ul>
            </div>
        )
    else 
        return <div className="relative"/> 
}
 
export default Day;