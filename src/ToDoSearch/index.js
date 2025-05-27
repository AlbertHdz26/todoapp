import React from "react";
import './ToDoSearch.css'
import Form from 'react-bootstrap/Form';

function ToDoSearch({loading, searchValue, findToDoByText}){

    return(
        <>
            <Form.Control size="lg" type="text" className="ToDoSearch"
                placeholder="Type something to search ToDos" 
                autoFocus
                disabled={loading}
                value={searchValue}
                onChange={(event) => {
                    findToDoByText(event.target.value);
                }}
            />
        </>
    );
}

export { ToDoSearch };