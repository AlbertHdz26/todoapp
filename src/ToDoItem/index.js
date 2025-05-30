import React from "react";
import './ToDoItem.css'
import 'bootstrap-icons/font/bootstrap-icons.css'


function ToDoItem(props) {

    // eslint-disable-next-line no-new-object
    let todo = new Object();
    todo.id = props.id;
    todo.text = props.text;
    todo.priority = props.priority;
    todo.completed = props.completed;

    return (
        <div className="ToDoItem">

            <i className={`bi bi-check-circle-fill IconItem ${props.completed && "IconItemCompleted"} `}
                onClick={ () => props.completeToDo(todo) }
            ></i>

            <span className={`Text ${props.completed && "TextCompleted"}`}>{props.text}</span> 

            <i className="bi bi-trash-fill IconItemDelete"
                onClick={ () => props.deleteToDo(todo) }
            ></i>

            <i className="bi bi-arrow-up-right-square-fill IconItemEdit"
                onClick={() => {
                    props.setToDo(todo);
                    props.setCreateOrEdit(false); // false means edit
                    props.setOpenModal(state => !state); 
                }}
            ></i>

            <p className="priority"><b>Priority: </b>  
                {props.priority === 1 && "High "} 
                {props.priority === 2 && "Medium "} 
                {props.priority === 3 && "Low "} 
                <i className={`bi bi-flag-fill flag-${props.priority}`}></i>
            </p>

        </div>
    );
}

export { ToDoItem };