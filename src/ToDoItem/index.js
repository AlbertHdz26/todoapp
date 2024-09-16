import React from "react";
import './ToDoItem.css'
import 'bootstrap-icons/font/bootstrap-icons.css'
import { ToDoContext } from "../ToDoContext";



function ToDoItem(props) {

    const {
        completeToDo,
        deleteToDo
    } = React.useContext(ToDoContext);

    return (
        <div className="ToDoItem">
            <i className={`bi bi-check-circle-fill IconItem ${props.completed && "IconItemCompleted"} `}
                onClick={ () => completeToDo(props.text) }
            ></i>
            <span className={`Text ${props.completed && "TextCompleted"}`}>{props.text}</span> 
            <i className="bi bi-trash-fill IconItemDelete"
                onClick={ () => deleteToDo(props.text) }
            ></i>
            <p className="priority"><b>Priority: </b>  
                {props.priority === 1 && "baja "} 
                {props.priority === 2 && "media "} 
                {props.priority === 3 && "alta "} 
                <i className={`bi bi-flag-fill flag-${props.priority}`}></i>
            </p>
        </div>
    );
}

export { ToDoItem };