import React from "react";

function ToDoList(props){
    return (
        <div>
            {props.children}
        </div>
    );
}

export { ToDoList };