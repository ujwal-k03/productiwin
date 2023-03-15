import { useState } from "react";
import { Navigate } from "react-router-dom";

const Day = ({date, today}) => {
    const [clicked, setClicked] = useState(false);
    let todays = false;
    const year = date?.getFullYear();
    const month = date?.getMonth();
    const datE = date?.getDate();

    if(date?.getTime() === today.getTime())
        todays = true;

    if(clicked)
        return <Navigate to={`/do/plans/${year}/${month}/${datE}`}/>

    if(date)
        return (
            <div className="day">
                <button className="h-full w-full absolute"
                    onClick={() => {setClicked(true)}}
                />
                <h1 className={`text-center ${todays? 'text-blue-500' : ''}`}>
                    {
                        date.getDate()
                    }
                </h1>
            </div>
        )
    else 
        return <div className="relative"/> 
}
 
export default Day;