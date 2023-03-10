import { useEffect, useState } from "react";
import Grid from "./plan/Grid";
import Task from "./plan/Task";
import { getHeight, getTranslate } from "./plan/TimeTools";

const Plan = () => {
    
    // const [plan, setPlan] = useState(null);
    const [tasks, setTasks] = useState(null);

    let taken = Array(96).fill(0);
    tasks?.forEach((task) => {
        let i = getTranslate(task.startTime)/12;
        const l = getHeight(task.startTime, task.endTime)/12;

        for(let j=i; j<i+l; j++)
            taken[j]++;
    })

    const modifyTask = (id, task) => {
        setTasks(tasks.map((tk) => {
            if(tk._id === id)
                return task;
            else
                return tk;
        }));
    };

    let date= "2023-03-09T00:00:00.000Z";

    useEffect(() => {
        const fetchPlan = async () => {
            const response = await fetch(`/api/plans/${date}`);
            const json = await response.json();

            if(response.ok){
                // setPlan(json);
                const takses = json.tasks.map((task) => {
                    return {
                        _id: task._id,
                        taskName: task.taskName,
                        color: task.color,
                        startTime: new Date(task.startTime),
                        endTime: new Date(task.endTime)
                    }
                })
                setTasks(takses);
            }
        }
        fetchPlan();
    }, []);

    return (
        <div className="plan col-span-4 flex">
            <div className="bg-white shadow-lg rounded-3xl m-4 flex-grow flex-col flex items-center relative">
                <div className="flex mt-3 mb-2">
                    <label className="font-extrabold">Plan name: </label>
                    <input type="text" className="border-b-2"/>
                    <button className="p-1 outline outline-2 outline-green-400 rounded-lg ml-3">Save</button>
                    <button className="p-1 outline outline-2 outline-red-600 rounded-lg ml-2">Discard</button>
                </div>
                <div className="canvas h-9/10 bg-pink-50 absolute w-11/12 left-1/2 top-[53%] -translate-x-1/2 -translate-y-1/2 overflow-scroll outline-gray-300 outline outline-2">
                    <Grid/>
                    {tasks && tasks.map((task, index) => 
                        <Task
                            tasks={tasks}
                            key={index} 
                            task={task} 
                            id={task._id} 
                            modifyTask={modifyTask}
                        />)}
                </div>
                
            </div>
        </div>
    );
}
 
export default Plan;