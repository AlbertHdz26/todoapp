import React from 'react';
import './ToDoItemSkeleton.css';

function ToDoItemSkeleton() {
    return (
        <div>
            <div className="ToDoItem-skeleton">
                <i className="ToDoItem-skeleton-icon"/>
                <span className="ToDoItem-skeleton-text">---------------</span> 
            </div>
            <div className="ToDoItem-skeleton">
                <i className="ToDoItem-skeleton-icon"/>
                <span className="ToDoItem-skeleton-text">---------------</span> 
            </div>
            <div className="ToDoItem-skeleton">
                <i className="ToDoItem-skeleton-icon"/>
                <span className="ToDoItem-skeleton-text">---------------</span> 
            </div>
        </div>
               
    );
}

export { ToDoItemSkeleton };