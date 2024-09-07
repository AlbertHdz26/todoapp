import React from "react";
import { ToDoContext } from "../ToDoContext";
import "./ToDoCounter.css"

function ToDoCounter(){
    const {
        totalToDos,
        totalCompletedToDos
    } = React.useContext(ToDoContext);

    return (
        <>
            <p className="ToDoCounter">
                Tienes <span className="TextBold">{totalCompletedToDos}</span> ToDos completados de <span className="TextBold">{totalToDos}</span> en total.
            </p>
        </>
    );

}

export { ToDoCounter };