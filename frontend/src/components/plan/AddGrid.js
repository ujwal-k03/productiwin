import AddRow from "./AddRow";

const AddGrid = ({addTask, hiddens}) => {
    const translates = Array(48);
    for(let i=0; i<48; i++){
        translates[i] = i*24;
    }   
    
    return (
        <div className="flex flex-col items-end add-grid w-100 absolute top-0 left-0 right-0 z-25">
            { translates.map((val, idx) => <AddRow key={idx} translate={val} addTask={addTask} hidden={hiddens[idx]}/>)}
        </div>
    );
}
 
export default AddGrid;