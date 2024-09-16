import React from "react";
import Spinner from 'react-bootstrap/Spinner';
import './LoadingToDoList.css'

function LoadingToDoList() {
    return (
        <>
            <div className="loading">
                <Spinner className="spinnerLoading"
                    as="span"
                    animation="grow"
                    size="lg"
                    role="status"
                    aria-hidden="true"
                    variant="secondary"
                />
                
            </div>
            <div className="loading">Loading...</div>
        </>

    );

};

export { LoadingToDoList };