import React from "react";
import './FilterOptions.css'
import Form from 'react-bootstrap/Form';
import Row from "react-bootstrap/Row";
import Col from 'react-bootstrap/Col';
import { Button, Badge } from "react-bootstrap";
import 'bootstrap-icons/font/bootstrap-icons.css';


function FilterOptions({getAllToDos,
                        filterByState,
                        filterStateOption,
                        filterByPriority,
                        loading,
                        orderAscDesc,
                        disabledOrderAscDesc
                    }) {

    /* Local state to manage selected priority and its ID */
    const [selectedPriority, setSelectedPriority] = React.useState('');

    /* Local state to manage selected priority ID */
    const [selectedIdPriority, setSelectedIdPriority] = React.useState('');

    // Handle priority change from the select dropdown
    const handlePriorityChange = (event) => {
        const value = parseInt(event.target.value);
        setSelectedIdPriority(value);

        const label = event.target.options[event.target.selectedIndex].text;
        setSelectedPriority(value === 0 ? '' : label);
    };

    // Reset the priority flag color and name when filtering by state or getting all todos
    const resetPriorityFlagColorAndName = () => {
        setSelectedPriority('');
        setSelectedIdPriority(0);
    };

    // Options for the priority select dropdown
    const PRIORITY_OPTIONS = [
        { value: '0', label: '- Select priority -' },
        { value: '1', label: 'High 🔴' },
        { value: '2', label: 'Medium 🟡' },
        { value: '3', label: 'Low 🔵' },
        { value: '4', label: 'High to Low ⬇️' },
        { value: '5', label: 'Low to High ⬆️' }
    ];

    // Labels for the filter state options
    const FILTER_STATE_LABELS = {
        0: "All ToDos",
        1: "Completed",
        2: "Incompleted ToDos"
    };

    return (
        <>
            <Form className="mt-2">
                <Row className="FilterOptions">
                    <Col sm={12} md="auto" className="FilterButtons">
                        
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
                                filterByState(true);
                                resetPriorityFlagColorAndName();
                            }}
                        >
                            Completed ToDos
                        </Button>
                        <Button size="sm" variant="secondary" className="FilterButton Incompleted" 
                            disabled={loading}
                            onClick={() => { 
                                filterByState(false);
                                resetPriorityFlagColorAndName();
                            }}
                        >
                            Incompleted ToDos
                        </Button>
                    </Col>
                    <Col sm={12} md="auto" className="priority-selector">
                        <Form.Label><b>Priority:</b></Form.Label>
                        <Form.Select
                            size="sm"
                            name="prioritySelect"
                            id="prioritySelect"
                            disabled={loading}
                            onChange={(event) => {
                                filterByPriority(parseInt(event.target.value));
                                handlePriorityChange(event);
                            }}
                        >
                            {PRIORITY_OPTIONS.map(({ value, label }) => (
                                <option 
                                    key={value} 
                                    value={value}>
                                    {label}
                                </option>
                            ))}
                        </Form.Select>                       
                    </Col>
                </Row>
                <Row>
                    <Col md={10} className="active-filters d-flex align-items-center">
                        {/* Ícono de embudo */}
                        <div className="d-flex align-items-center me-2">
                            <i className="bi bi-funnel-fill"></i>
                        </div>

                        {/* Badge de estado */}
                        <div className="d-flex align-items-center me-2">
                            <Badge
                                bg={filterStateOption === 1 ? 'success' :
                                    filterStateOption === 2 ? 'secondary' : 'primary'}
                            >
                                {FILTER_STATE_LABELS[filterStateOption]}
                            </Badge>
                        </div>

                        {/* Badge de prioridad (condicional) */}
                        {selectedPriority && (
                            <div className="d-flex align-items-center">

                                {/* Ícono de bandera con clase dinámica según la prioridad seleccionada */}
                                {selectedIdPriority < 4 && (
                                    //Ícono de bandera con clase dinámica según la prioridad seleccionada 
                                    <i className={`bi bi-flag-fill flag-${selectedIdPriority} me-2`}></i>
                                )}
                                
                                {/* Badge que muestra la prioridad seleccionada */}
                                <Badge bg="light" text="dark">{selectedPriority}</Badge>
                            </div>
                        )}
                    </Col>
                    <Col md={2} className={`orderBy ${!disabledOrderAscDesc && !loading ? '' : 'orderBy-disabled'}`}>
                        <i className="bi bi-caret-down-square-fill orderByAsc"
                            onClick={!disabledOrderAscDesc && !loading ? () => orderAscDesc(1) : undefined}
                        ></i>
                        <i className="bi bi-caret-up-square-fill orderByDesc"
                            onClick={!disabledOrderAscDesc && !loading ? () => orderAscDesc(2) : undefined}
                        ></i>
                    </Col>
                </Row>
            </Form >
        </>

    );

}

export { FilterOptions };