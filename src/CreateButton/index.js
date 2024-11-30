import React from "react";
import Button from 'react-bootstrap/Button';
import './CreateButton.css'

function CreateButton({setOpenModal}) {
    console.log("log1 - setOpenModal: "+setOpenModal);
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