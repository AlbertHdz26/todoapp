import React from "react";
import { Button } from "react-bootstrap";
import './FilterOptions.css'
import { ToDoContext } from "../ToDoContext";
import Form from 'react-bootstrap/Form';
import Row from "react-bootstrap/Row";
import Col from 'react-bootstrap/Col';
import 'bootstrap-icons/font/bootstrap-icons.css';


function FilterOptions() {

    const {
        getAllToDos,
        getCompleteToDos,
        getIncompletedToDos
    } = React.useContext(ToDoContext);

    return (
        <>
            <Form className="FilterOptions">
                <Row className="d-flex align-items-end">
                    <Col md={4} className="FilterButtons">

                        <Button size="sm" variant="primary" className="FilterButton All"
                            onClick={() => { getAllToDos() }}
                        >
                            All ToDos
                        </Button>
                        <Button size="sm" variant="success" className="FilterButton Completed"
                            onClick={() => { getCompleteToDos() }}
                        >
                            Completed ToDos
                        </Button>
                        <Button size="sm" variant="secondary" className="FilterButton Incompleted"
                            onClick={() => { getIncompletedToDos() }}
                        >
                            Incompleted ToDos
                        </Button>

                    </Col>
                </Row>
            </Form >
        </>

    );

}

export { FilterOptions };