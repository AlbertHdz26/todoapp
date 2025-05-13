import React from "react"

function ToDoHeader( {children, loading} ){
    return (
        <div>
            {children}
        </div>
        /*
        <header>
            {
                React.Children
                .toArray(children)
                .map(child => React.cloneElement(child, { loading }))
            }       
        </header>
        */
    );
}

export { ToDoHeader };