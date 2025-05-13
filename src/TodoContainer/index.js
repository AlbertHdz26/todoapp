import React from "react";

function ToDoContainer({children}) {
    return (
        <div className="ToDoContainer">
            {children}
        </div>
    );
}

export { ToDoContainer };