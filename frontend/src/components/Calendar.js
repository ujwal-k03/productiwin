import { useEffect, useState } from "react";
import Day from "./calender/Day";
import { authGET, authPOST } from "../HandleAuth";

const monthNames = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December'
]

const Calendar = () => {
    const temp = new Date();
    const today = new Date(temp.getFullYear(), temp.getMonth(), temp.getDate());
   
    const [month, setMonth] = useState(new Date().getMonth());
    const [data, setData] = useState([]);
    const [isLoaded, setIsLoaded] = useState(false);
    
    // Get the date month is referring to
    const curDate = new Date(new Date().getFullYear(), month, 1);
    const startDay = curDate.getDay();
    
    const endDate = new Date(new Date().getFullYear(), month + 1, 1);

    const numDays = new Date(curDate.getFullYear(), month+1, 0).getDate();
    const year = curDate.getFullYear();
    const monthName = monthNames[curDate.getMonth()];
    const arr = [];

    useEffect(() => {
        if(isLoaded)
            return;
        const f1 = async () => {
            const data = await authPOST(`/api/plans/plans`, {
                beginDate: curDate.toJSON(),
                endDate: endDate.toJSON(),
            });
            console.log("hi");
            if(data.plans){
                setData(data.plans);
                setIsLoaded(true);
            }
        }
        f1();
    }, [isLoaded])

    let j = numDays + startDay > 35 ? 42 : 35;
    for(let i=0; i<j; i++){
        const bozo = new Date(curDate.getFullYear(), month, i - startDay + 1);
        if(bozo.getMonth() !== curDate.getMonth())
            arr.push(null);
        else
            arr.push(bozo);
    }

    const plansData = Array(j).fill(null);
    data.forEach((val) => {
        const dat = new Date(val.date);
        plansData[dat.getDate() - 1 + startDay] = val;
    })

    const goRight = () => {
        setMonth(month+1);
        setData([]);
        setIsLoaded(false);
    }

    const goLeft = () => {
        setMonth(month-1);
        setData([]);
        setIsLoaded(false);
    }

    return (
        <div className="border border-gray-300 bg-white dark:bg-gray-700 dark:text-white rounded-sm m-4 w-full flex flex-col relative h-[88vh]">
            <div className="flex gap-2 items-center justify-around w-1/2 mx-auto my-3">
                <button onClick={goLeft}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
                    </svg>
                </button>
                <h1 className="font-semibold flex text-ellipsis whitespace-nowrap overflow-hidden">{monthName} {year}</h1>
                <button onClick={goRight}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                    </svg>
                </button>
            </div>

            <div className="grid grid-cols-7 mx-2 my-1 bg-blue-400 dark:bg-blue-600">
                <div className="text-center">Sun<span className="hidden md:inline">day</span></div>
                <div className="text-center">Mon<span className="hidden md:inline">day</span></div>
                <div className="text-center">Tue<span className="hidden md:inline">sday</span></div>
                <div className="text-center">Wed<span className="hidden md:inline">nesday</span></div>
                <div className="text-center">Thu<span className="hidden md:inline">rsday</span></div>
                <div className="text-center">Fri<span className="hidden md:inline">day</span></div>
                <div className="text-center">Sat<span className="hidden md:inline">urday</span></div>
            </div>
            <div>
                {
                    isLoaded &&
                    <div className={`grid grid-cols-7 auto-rows-[${j > 35 ? 92 : 110}px] gap-1 h-[75vh] mx-2`}>
                        { arr.map((date, idx) => <Day date={date} today={today} data={plansData[idx]}/>) }
                    </div>
                }
                {
                    !isLoaded &&
                    <div className="w-100 h-[75vh] flex items-center justify-center">
                        <span className="text-lg font-extrabold text-gray-600 dark:text-gray-500">Loading...</span>
                    </div>
                }
            </div>
        </div>
    );
}
 
export default Calendar;