import React from "react";
import { LoadingToDoList } from "../LoadingToDoList"
import { EmptyToDo } from "../EmptyToDo";
import { TodoError } from "../ToDoError";

function ToDoList(props){
    return (

        <div>
            {/* {console.log('%%% Init ToDoList %%%')} */}

            {(!props.loading && props.totalToDos === 0) && <EmptyToDo />}
            {/* {(!props.loading && props.totalToDos === 0) && props.EmptyToDo()}}*/}

            {props.loading && <LoadingToDoList/>}
            {/* {props.loading && props.LoadingToDoList()} */}

            {props.error && <TodoError />}
            {/* {props.error && props.TodoError()} */}

            {/* {console.log('List: '+List.length)} */}
            {/* {List.forEach(function(jsonObj) { console.log(jsonObj.text+', '+jsonObj.completed+', '+jsonObj.priority) } ) }  */}

            {props.list.map(props.todo)}

            {props.children}
        </div>
    );
}

export { ToDoList };