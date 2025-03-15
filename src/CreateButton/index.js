import React from "react";
import Button from 'react-bootstrap/Button';
import './CreateButton.css'

function CreateButton({setOpenModal, loading}) {
    console.log("log1 - setOpenModal: "+setOpenModal);
    return (
        <>
            <Button
                className="CreateButton"
                disabled={loading}
                onClick={() => {setOpenModal(state => !state); }}
            > + </Button>{' '}
        </>
    );
}

export { CreateButton };