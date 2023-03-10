export const getTimeString = (val) => {
    let mult = 75000;
    let time = new Date('2023-02-25T00:00:00.000');
    time.setTime(time.getTime() + val*mult);

    return time.toLocaleTimeString('en-US', {
        hour:   '2-digit',
        minute: '2-digit',
    })
}

export const getTime = (val) => {
    const mult = 75000;
    let time = new Date('2023-02-25T00:00:00.000');
    time.setTime(time.getTime() + val*mult);

    return time;
}

export const getTranslate = (startTime) => {
    const mult = 75000;
    let tempTime = new Date(startTime);
    tempTime.setFullYear(2023,1,25);
    const temp = new Date('2023-02-25T00:00:00.000');
    const val = (tempTime.getTime() - temp.getTime()) / mult;
    return val;
    
}

export const getHeight = (startTime, endTime) => {
    const mult = 75000;
    
    return (new Date(endTime).getTime() - new Date(startTime).getTime()) / mult;
}


