import React from "react";
import { ToDoContext } from "../ToDoContext";
import './ToDoSearch.css'
import Form from 'react-bootstrap/Form';

function ToDoSearch(){
    const {searchValue, 
        findToDoByText,
        List
    } = React.useContext(ToDoContext);

    return(
        <>
            <Form.Control size="lg" type="text" className="ToDoSearch"
                placeholder="Type something to search ToDos" 
                autoFocus
                value={searchValue}
                onChange={(event) => {
                    findToDoByText(event.target.value, List);
                }}
            />
        </>
    );
}

export { ToDoSearch };