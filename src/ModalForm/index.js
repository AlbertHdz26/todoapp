/**
 * @fileoverview Modal form component for creating new todos
 * @author [Alberto Hernandez]
 * @version 1.0.0
 */

import React from "react";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import './ModalForm.css';

/**
 * @typedef {Object} ToDo
 * @property {string} text - The todo text content
 * @property {number} priority - Priority level (1: Low, 2: Medium, 3: High)
 */

/**
 * Modal form component for creating new todos
 * @param {Object} props Component props
 * @param {function(ToDo): void} props.addToDo - Function to add a new todo
 * @param {boolean} props.show - Controls modal visibility
 * @param {function(boolean): void} props.setShow - Function to update modal visibility
 * @param {function(string): boolean} props.isEmpty - Function to validate if text is empty
 * @returns {JSX.Element} Modal form component
 */
function ModalForm({addToDo,
                   show,
                   setShow,
                   isEmpty}) {

    /**
     * Handles modal close and form reset
     */
    const handleClose = () => {
        setShow(false);
        setNewTodoValue('');
        setValidated(false);
    }

    const [newTodoValue, setNewTodoValue] = React.useState('');
    const [validated, setValidated] = React.useState(false);

    /**
     * Handles form submission
     * @param {React.FormEvent} event - Form submission event
     */
    const onSubmit = (event) => {
        event.preventDefault();

        if (!isEmpty(newTodoValue)) {
            let text = newTodoValue;
            let priority = document.querySelector('input[name="prioridad"]:checked').value;
            let ToDo = {
                text: text,
                priority: parseInt(priority)
            };
            addToDo(ToDo);
            setShow(false);
            setNewTodoValue('');
            setValidated(false);
        } else {
            setValidated(true);
        }
    };

    /**
     * Handles input change
     * @param {React.ChangeEvent<HTMLInputElement>} event - Input change event
     */
    const onChange = (event) => {
        setNewTodoValue(event.target.value);
    };

    return (
        <>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Create ToDo</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={onSubmit} noValidate validated={validated}>

                        <Form.Group className="mb-3" controlId="text">
                            <Form.Label>Text</Form.Label>
                            <Form.Control
                                type="text"
                                value={newTodoValue}
                                onChange={onChange}
                                required
                                placeholder="Type ToDo Text"
                                autoFocus
                            />
                            <Form.Control.Feedback type="invalid">
                                Please type a text.
                            </Form.Control.Feedback>
                            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                        </Form.Group>

                        <Form.Label>Prioridad</Form.Label>
                        <br></br>

                        <div className="form-check">
                            <input className="form-check-input radio" type="radio" name="prioridad" id="radio1" value="1" defaultChecked/>
                                <label className="form-check-label" htmlFor="radio1">
                                    Baja <i className="bi bi-flag-fill flag-1"></i>
                                </label>
                        </div>
                        <div className="form-check">
                            <input className="form-check-input radio" type="radio" name="prioridad" id="" value="2"/>
                                <label className="form-check-label" htmlFor="radio2">
                                    Media <i className="bi bi-flag-fill flag-2"></i>
                                </label>
                        </div>
                        <div className="form-check">
                            <input className="form-check-input radio" type="radio" name="prioridad" id="radio3" value="3"/>
                                <label className="form-check-label" htmlFor="radio3">
                                    Alta <i className="bi bi-flag-fill flag-3"></i>
                                </label>
                        </div>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button type="submit" variant="primary" onClick={onSubmit}>
                        Add ToDo
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export { ModalForm };