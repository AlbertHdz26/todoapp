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

    return (
        <>
            <Form className="FilterOptions">
                <Row className="d-flex align-items-end">
                    <Col md={4} className="FilterButtons">
                        
                        <Button size="sm" variant="primary" className="FilterButton All" 
                            disabled={loading}
                            onClick={() => { getAllToDos() }}
                        >
                            All ToDos
                        </Button>
                        
                        <Button size="sm" variant="success" className="FilterButton Completed" 
                            disabled={loading}
                            onClick={() => { getCompleteToDos() }}
                        >
                            Completed ToDos
                        </Button>
                        <Button size="sm" variant="secondary" className="FilterButton Incompleted" 
                            disabled={loading}
                            onClick={() => { getIncompletedToDos() }}
                        >
                            Incompleted ToDos
                        </Button>

                    </Col>
                    <Col md={2}>
                        <label><b>Priority</b></label>
                        <select 
                            name="prioritySelect"
                            id="prioritySelect"
                            className="form-select form-select-sm" 
                            aria-label=".form-select-sm example"
                            disabled={loading}
                            onChange={(event) => {
                                filterByPriority(parseInt(event.target.value));
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
                <Col md={4}>
                    <label className={`ToDoFilterOption ToDoFilterOption-${filterOption}`}>
                        {filterOption === 0 && "All ToDos"}
                        {filterOption === 1 && "Completed ToDos"}
                        {filterOption === 2 && "Incompleted ToDos"}
                    </label>
                </Col>
                </Row>
            </Form >
        </>

    );

}

export { FilterOptions };