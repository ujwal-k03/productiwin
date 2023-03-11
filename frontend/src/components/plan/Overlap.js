const elementOverlap = (task, element) => {
    const taskRect = task.getBoundingClientRect();
    const elementRect = element.getBoundingClientRect();

    if(element.id === task.id)
        return false;

    if(taskRect.bottom - elementRect.top > 1 &&  1 < elementRect.bottom - taskRect.top)
        return true;
    
    return false;
}

export const isOverlap = (clsCanvas, clsTask, element) => {
    const canvas = document.getElementsByClassName(clsCanvas)[0];
    const tasks = canvas.getElementsByClassName(clsTask);

    for(let i = 0; i<tasks.length; i++){
        const task = tasks[i];
        
        if(elementOverlap(task, element, clsCanvas))
            return true;
    }

    return false;

}

