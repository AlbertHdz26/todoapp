import React from "react";
import Spinner from 'react-bootstrap/Spinner';
import './LoadingToDoCounter.css';

function LoadingToDoCounter() {
  return (
    <>
        <div className="loadingToDoCounter ">
            <Spinner animation="border" role="status" className="spinnerLoading2">
                <span className="visually-hidden">Loading...</span>
            </Spinner>
        </div>
    </>

  );
}

export default LoadingToDoCounter;