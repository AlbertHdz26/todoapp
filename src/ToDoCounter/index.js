import React from "react";
import "./ToDoCounter.css"

function ToDoCounter({totalToDos, totalCompletedToDos}){

    return (
        <>
            <p className="ToDoCounter">
                You have <span className="TextBold">{totalCompletedToDos} </span> 
                ToDos completed from <span className="TextBold">{totalToDos} </span> 
            </p>
        </>
    );

}

export { ToDoCounter };