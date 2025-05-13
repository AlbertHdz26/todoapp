import React from "react";
import { Button } from "react-bootstrap";
import './FilterOptions.css'
import Form from 'react-bootstrap/Form';
import Row from "react-bootstrap/Row";
import Col from 'react-bootstrap/Col';
import 'bootstrap-icons/font/bootstrap-icons.css';


function FilterOptions({getAllToDos,
                        getCompleteToDos,
                        getIncompletedToDos,
                        filterOption,
                        filterByPriority,
                        loading
                    }) {

    const [selectedPriority, setSelectedPriority] = React.useState('');
    const [selectedIdPriority, setSelectedIdPriority] = React.useState('');

    const handlePriorityChange = (event) => {
        const value = parseInt(event.target.value);
        setSelectedIdPriority(value);

        const label = event.target.options[event.target.selectedIndex].text;
        setSelectedPriority(value === 0 ? '' : label);
    };

    const resetPriorityFlagColorAndName = () => {
        setSelectedPriority('');
        setSelectedIdPriority(0);
    };

    return (
        <>
            <Form className="mt-2">
                <Row className="FilterOptions">
                    <Col sm={12} md={5} className="FilterButtons">
                        
                        <Button size="sm" variant="primary" className="FilterButton All" 
                            disabled={loading}
                            onClick={() => { 
                                getAllToDos(); 
                                resetPriorityFlagColorAndName();
                            }}
                        >
                            All ToDos
                        </Button>
                        
                        <Button size="sm" variant="success" className="FilterButton Completed" 
                            disabled={loading}
                            onClick={() => { 
                                getCompleteToDos();
                                resetPriorityFlagColorAndName();
                            }}
                        >
                            Completed ToDos
                        </Button>
                        <Button size="sm" variant="secondary" className="FilterButton Incompleted" 
                            disabled={loading}
                            onClick={() => { 
                                getIncompletedToDos();
                                resetPriorityFlagColorAndName();
                            }}
                        >
                            Incompleted ToDos
                        </Button>
                    </Col>
                    <Col sm={12} md={7} className="priority-selector">
                        <label><b>Priority:</b></label>
                        <select 
                            name="prioritySelect"
                            id="prioritySelect"
                            className="form-select form-select-sm" 
                            aria-label=".form-select-sm example"
                            disabled={loading}
                            onChange={(event) => {
                                filterByPriority(parseInt(event.target.value));
                                handlePriorityChange(event);
                            }}
                        >
                            <option value="0" defaultValue>- Select priority -</option>
                            <option value="1">Baja</option>
                            <option value="2">Media</option>
                            <option value="3">Alta</option>
                        </select>                       
                    </Col>
                </Row>
                <Row>
                    <Col md={12} className="active-filters">
                        <div className="filter-labels">
                            <span className="filter-type">
                                <i className="bi bi-funnel-fill me-2"></i>
                                <label className={`ToDoFilterOption ToDoFilterOption-${filterOption}`}>
                                    {filterOption === 0 && "All ToDos - "}
                                    {filterOption === 1 && "Completed - "}
                                    {filterOption === 2 && "Incompleted ToDos - "}
                                </label>
                                <span className="filter-priority">
                                    <i className={`bi bi-flag-fill flag-${selectedIdPriority}`}></i>
                                    <label>{selectedPriority}</label>
                                </span>
                            </span>
                        </div>
                    </Col>
                </Row>
            </Form >
        </>

    );

}

export { FilterOptions };