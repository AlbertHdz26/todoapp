import React from 'react';

function MessageComponent(props) {
    return (
        <div>
            <p>{props.message}</p>
        </div>
    );
}

export { MessageComponent };