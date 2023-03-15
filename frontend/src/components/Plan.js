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
        const saveTasks = async () => {
            const json = await authPUT('/api/plans/', newPlan, setUserId, navigate);
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
    }

    useEffect(() => {fetchPlan()}, []);

    return (
            <div className="bg-gray-50 border border-gray-300 rounded-sm m-4 w-[720px] md:w-[960px] flex flex-col items-center relative h-[88vh]">
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
                            className="p-1 px-2 rounded-lg ml-3 bg-green-500 shadow-md hover:shadow-xl hover:bg-green-600 transition duration-200">
                            Save
                        </button>
                        <button 
                            onClick={discardPlan}
                            className="p-1 px-2 rounded-lg ml-2 bg-red-500 shadow-md hover:shadow-xl hover:bg-red-600 transition duration-200">
                            Discard
                        </button>
                    </div>
                </div>
                <div className="canvas h-[78%] md:h-9/10 bg-pink-50 absolute w-11/12 left-1/2 md:top-[53%] top-[60%] -translate-x-1/2 -translate-y-1/2 overflow-scroll outline-gray-300 outline outline-2">
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
    );
}
 
export default Plan;