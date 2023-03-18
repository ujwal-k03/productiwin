import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AuthContext, authGET, authPUT } from "../HandleAuth";
import AddGrid from "./plan/AddGrid";
import Grid from "./plan/Grid";
import { isOverlap } from "./plan/Overlap";
import Task from "./plan/Task";
import { getTime } from "./plan/TimeTools";

const Plan = () => {
    const {year, month, date: dateE} = useParams();
    let date;
    const dummy = new Date();
    if(!year)  
        date = new Date(dummy.getFullYear(), dummy.getMonth(), dummy.getDate());
    else
        date = new Date(year, month, dateE);

    const [planName, setPlanName] = useState("Untitled Plan");
    const [planDate, setPlanDate] = useState(date.toJSON());
    const [tasks, setTasks] = useState([]);
    const [loaded, setLoaded] = useState(false);
    const [hiddens, setHiddens] = useState(Array(48).fill(false));
    const navigate = useNavigate();
    const { setUserId } = useContext(AuthContext);
    
    const modifyTask = (id, task) => {
        setTasks(tasks.map((tk) => {
            if(tk._id === id)
                return task;
            else
                return tk;
        }));
    };

    // if()
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
        setLoaded(false);
        const saveTasks = async () => {
            const json = await authPUT('/api/plans/', newPlan, setUserId, navigate);
        }
        saveTasks().then(() => fetchPlan());
    }

    const discardPlan = () => {
        setTasks(null);
        setLoaded(false);
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

        const json = await authGET(`/api/plans/${planDate}`, setUserId, navigate);
        if(json.plan){
            const takses = json.plan.tasks.map((task) => {
                return {
                    _id: task._id,
                    taskName: task.taskName,
                    color: task.color,
                    startTime: new Date(task.startTime),
                    endTime: new Date(task.endTime)
                }
            })
            setPlanName(json.plan.name);
            setPlanDate(json.plan.date);
            setTasks(takses);
        }
        setLoaded(true);
    }

    useEffect(() => {fetchPlan()}, []);

    return (
            <div className="plan">
                {
                    loaded &&
                    <div>
                        <div className="flex flex-col md:flex-row items-center justify-center mt-3 mb-2">
                            <span>{date.toDateString()}</span>
                            <h1 className="font-extrabold mx-2">Plan name: </h1>
                            <div className="relative h-6 justify-center">
                                <input type="text"
                                maxLength={30}
                                className="bg-transparent rounded-sm text-center" 
                                value={planName} 
                                onChange={(e) => setPlanName(e.target.value)}
                                />
                            </div>
                            
                            <div>
                                <button 
                                    onClick={savePlan}
                                    className="p-1 px-2 rounded-lg ml-3 bg-green-500 hover:bg-green-600 dark:bg-green-600 dark:hover:bg-green-500 transition duration-200">
                                    Save
                                </button>
                                <button 
                                    onClick={discardPlan}
                                    className="p-1 px-2 rounded-lg ml-2 bg-red-500 hover:bg-red-600 dark:bg-red-600 dark:hover:bg-red-500 transition duration-200">
                                    Discard
                                </button>
                            </div>
                        </div>
                        <div className="plan-canvas canvas">
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
                }
                {
                    !loaded &&
                    <span className="text-lg font-extrabold text-gray-600 dark:text-gray-500 relative top-1/3">Loading...</span>
                }
                   
            </div>
    );
}
 
export default Plan;