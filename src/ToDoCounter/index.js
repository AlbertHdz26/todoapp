import React from "react";
import "./ToDoCounter.css"

function ToDoCounter({totalToDos, totalCompletedToDos}){

    return (
        <>
            <p className="ToDoCounter">
                Tienes <span className="TextBold">{totalCompletedToDos}</span> ToDos completados de <span className="TextBold">{totalToDos}</span> en total.
            </p>
        </>
    );

}

export { ToDoCounter };