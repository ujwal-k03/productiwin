import { useEffect, useState } from "react";
import AddGrid from "./plan/AddGrid";
import Grid from "./plan/Grid";
import { isOverlap } from "./plan/Overlap";
import Task from "./plan/Task";
import { getTime } from "./plan/TimeTools";

const Plan = () => {
    const date= "2023-03-09T00:00:00.000Z";
    const [planName, setPlanName] = useState("Untitled Plan");
    const [planDate, setPlanDate] = useState(null);
    const [tasks, setTasks] = useState(null);
    const [hiddens, setHiddens] = useState(Array(48).fill(false));

    const modifyTask = (id, task) => {
        setTasks(tasks.map((tk) => {
            if(tk._id === id)
                return task;
            else
                return tk;
        }));
    };

    const addTask = (translate) => {
        const task = {
            _id: (Math.floor((Math.random()+1)*1e6)).toString(),
            taskName: "Untitled Task",
            color: "blue",
            startTime: getTime(translate),
            endTime: getTime(translate + 24)
        }
        setTasks([...tasks, task]);
    }

    const deleteTask = (id) => {
        const newTasks = tasks.filter((task) => {
            return (task._id !== id);
        });
        setTasks(newTasks);
    }

    const savePlan = () => {
        const newPlan = {
            name: planName,
            date: planDate,
            tasks: tasks
        }
        setTasks(null);
        const saveTasks = async () => {
            const response = await fetch('/api/plans/', {
                method: 'PUT',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(newPlan)
            })
        }
        saveTasks().then(() => fetchPlan());
    }

    const discardPlan = () => {
        setTasks(null);
        fetchPlan();
    }

    useEffect(() => {
        const addrows = document.querySelectorAll(".addrow");
        const newArr = Array(48).fill(false);

        for(let i=0; i<addrows.length; i++){
            if(isOverlap("canvas", "task", addrows[i]))
                newArr[i] = true;
        }
        setHiddens(newArr);
    }, [tasks])

    const fetchPlan = async () => {
        const response = await fetch(`/api/plans/${date}`);
        const json = await response.json();

        if(response.ok){
            const takses = json.tasks.map((task) => {
                return {
                    _id: task._id,
                    taskName: task.taskName,
                    color: task.color,
                    startTime: new Date(task.startTime),
                    endTime: new Date(task.endTime)
                }
            })
            setPlanName(json.name);
            setPlanDate(json.date);
            setTasks(takses);
        }
    }

    useEffect(() => {fetchPlan()}, []);

    return (
        <div className="plan col-span-4 flex">
            <div className="bg-white shadow-lg rounded-3xl m-4 flex-grow flex-col flex items-center relative">
                <div className="flex items-center mt-3 mb-2">
                    <label className="font-extrabold mx-2">Plan name: </label>
                    <input type="text"
                        maxLength={30}
                        className="bg-transparent rounded-sm" 
                        value={planName} 
                        onChange={(e) => setPlanName(e.target.value)}
                    />
                    <button 
                        onClick={savePlan}
                        className="p-1 px-2 rounded-lg ml-3 bg-green-500 shadow-md hover:shadow-xl hover:bg-green-600 transition duration-200">
                        Save
                    </button>
                    <button 
                        onClick={discardPlan}
                        className="p-1 px-2 rounded-lg ml-2 bg-red-500 shadow-md hover:shadow-xl hover:bg-red-600 transition duration-200">
                        Discard
                    </button>
                </div>
                <div className="canvas h-9/10 bg-pink-50 absolute w-11/12 left-1/2 top-[53%] -translate-x-1/2 -translate-y-1/2 overflow-scroll outline-gray-300 outline outline-2">
                    <div className="task dummy w-100 -top-[400px]"></div>
                    <div className="task dummy w-100 top-[1152px]"></div>
                    <Grid/>
                    {tasks && tasks.map((task) => 
                    <Task
                        tasks={tasks}
                        key={task._id} 
                        task={task} 
                        id={task._id} 
                        modifyTask={modifyTask}
                        deleteTask={deleteTask}
                    />)}
                    <AddGrid addTask={addTask} hiddens={hiddens}/>
                </div>
                
            </div>
        </div>
    );
}
 
export default Plan;