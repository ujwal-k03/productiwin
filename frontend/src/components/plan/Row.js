const Row = ({time}) => {
    return (
        <div className="grid-row">
            <div className="absolute w-1/12 -top-0.5 text-center">
                {time}
            </div>
        </div>
    );
}
 
export default Row;