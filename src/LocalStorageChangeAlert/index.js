import React from "react";  
import { useLocalStorageListener } from "../CustomHooks/useLocalStorageListener";

function LocalStorageChangeAlert(props) {
    
    const { storageChange: show, 
            toggleShow
    } = useLocalStorageListener(props.sincronizeToDos);

    if(show){
        return (
            <div className="alert alert-warning alert-dismissible fade show" role="alert">
                <strong>Local Storage Changed!</strong> Please refresh the page to see the changes. or <strong><a href="#" onClick={toggleShow}>click here</a></strong> to synchronize.
                <button type="button" className="btn-close" onClick={toggleShow} aria-label="Close"></button>
            </div>
        );
    }else{
        return null;
    }
}

export { LocalStorageChangeAlert };