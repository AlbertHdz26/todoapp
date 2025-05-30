import React from "react";
import Button from 'react-bootstrap/Button';
import './CreateButton.css'

function CreateButton({setOpenModal, 
                        loading,
                        setCreateOrEdit}) {
    return (
        <>
            <Button
                className="CreateButton"
                disabled={loading}
                onClick={() => {
                    setCreateOrEdit(true); // true means create
                    setOpenModal(state => !state); 

                }}
            > + </Button>{' '}
        </>
    );
}

export { CreateButton };