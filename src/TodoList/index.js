import React from "react";
import { ToDoItemSkeleton } from "../ToDoItemSkeleton"
import { MessageComponent } from "../MessageComponent";
import { TodoError } from "../ToDoError";

function ToDoList(props){
                    //***Render prop***  - Render function
    const render = props.todo || props.children; 

    return (

        <div>
            {/* {console.log('%%% Init ToDoList %%%')} */}

            {(!props.loading && props.totalToDos === 0) && <MessageComponent message="¡The ToDo list is empty, create a ToDo!" />}
            {/* {(!props.loading && props.totalToDos === 0) && props.EmptyToDo()}}*/}

            {props.loading && <ToDoItemSkeleton/>}
            {/* props.loading && <LoadingToDoList/>*/}
            {/* {props.loading && props.LoadingToDoList()} */}

            {(props.list.length === 0 && props.searchValue.length > 0) && <MessageComponent message={`No results found for ${props.searchValue}`} />}
            {/* {props.list.length === 0 && props.searchValue.length > 0 && props.EmptySearchResult(props.searchValue)} */}

            {props.error && <TodoError />}
            {/* {props.error && props.TodoError()} */}

            {/* {console.log('List: '+List.length)} */}
            {/* {List.forEach(function(jsonObj) { console.log(jsonObj.text+', '+jsonObj.completed+', '+jsonObj.priority) } ) }  */}

            {/* si loading es false y error es falso, entonces recorremos la lista de ToDos */}
            {(!props.loading && !props.error) && props.list.map(render)}

            {/* Para pasar propiedas a componentes hijos */}
            {props.children}
        </div>
    );
}

export { ToDoList };