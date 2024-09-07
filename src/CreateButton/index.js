import React from "react";
import Button from 'react-bootstrap/Button';
import './CreateButton.css'
import { ToDoContext } from "../ToDoContext";

function CreateButton() {

    const {
        setOpenModal
    } = React.useContext(ToDoContext);

    return (
        <>
            <Button
                className="CreateButton"
                onClick={() => {setOpenModal(state => !state); }}
            > + </Button>{' '}
        </>
    );
}

export { CreateButton };