import React from "react";
import "./ToDoCounter.css"
import LoadingToDoCounter from "../LoadingToDoCounter";

function ToDoCounter({loading, totalToDos, totalCompletedToDos}){

    return (
        <>
            {loading && <LoadingToDoCounter />}

            {!loading && 
                <p className="ToDoCounter">
                    You have <span className="TextBold">{totalCompletedToDos} </span> 
                    ToDos completed from <span className="TextBold">{totalToDos} </span> 
                </p>
            }
        </>
    );

}

export { ToDoCounter };