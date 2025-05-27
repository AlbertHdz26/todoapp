import React from "react";
import './ToDoItem.css'
import 'bootstrap-icons/font/bootstrap-icons.css'


function ToDoItem(props) {

    return (
        <div className="ToDoItem">
            <i className={`bi bi-check-circle-fill IconItem ${props.completed && "IconItemCompleted"} `}
                onClick={ () => props.completeToDo(props.text) }
            ></i>
            <span className={`Text ${props.completed && "TextCompleted"}`}>{props.text}</span> 
            <i className="bi bi-trash-fill IconItemDelete"
                onClick={ () => props.deleteToDo(props.text) }
            ></i>
            <p className="priority"><b>Priority: </b>  
                {props.priority === 1 && "Low "} 
                {props.priority === 2 && "Medium "} 
                {props.priority === 3 && "High "} 
                <i className={`bi bi-flag-fill flag-${props.priority}`}></i>
            </p>
        </div>
    );
}

export { ToDoItem };