const Row = ({time}) => {
    return (
        <div className="relative w-100 text-xs h-12 flex items-center font-light uppercase border-t-2 outline-gray-300">
            <div className="absolute w-1/12 -top-0.5 justify-center flex">
                {time}
            </div>
        </div>
    );
}
 
export default Row;