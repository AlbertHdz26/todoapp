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
function ModalForm({toDo,
                    setToDo,
                    addToDo,
                    updateToDo,
                    show,
                    setShow,
                    isEmpty,
                    createOrEdit}) {

    /**
    * Local state to manage form validation
    * @type {[boolean, React.Dispatch<React.SetStateAction<boolean>>]}
    */
    const [validated, setValidated] = React.useState(false);

    /**
    * Local state to manage priority error
    * @type {[boolean, React.Dispatch<React.SetStateAction<boolean>>]}
    */                
    const [priorityRadioSelectedError, setPriorityRadioSelectedError] = React.useState(false);

    /**
    * Handles modal close and form reset
    */
    const handleClose = () => {
        // Cierra el modal
        setShow(false);

        // Resetea el estado del ToDo a su valor inicial
        setToDo({
            text: '',
            priority: 0 // Reset to default priority
        });

        // Resetea el estado de validación del formulario
        // Esto es útil si el usuario abre el modal nuevamente
        setValidated(false);

        // Resetea el estado de error de prioridad
        setPriorityRadioSelectedError(false);
    }

    /**
    * Validates the input fields of the form
    * @param {React.FormEvent} event - Form submission event
    * @returns {boolean} True if the form is valid, false otherwise
    */
    const validateInput = (event) => {
        
        // prevenir el comportamiento por defecto de un evento en el navegador.
        // 1. Hacer clic en un enlace (<a>) normalmente lleva al usuario a otra página.
        // 2. Enviar un formulario (<form>) normalmente recarga la página o navega a otra URL.
        // 3. Enviar un formulario con un botón de tipo "submit" normalmente recarga la página.
        event.preventDefault();

        let validate = true;

        // Verifica si el campo de texto está vacío
        if (isEmpty(toDo.text)) {

            // Si el texto está vacío, se establece el estado de validación para mostrar mensajes de error en el campo de texto
            setValidated(true);

            validate = false;
        }

        // Verifica si se ha seleccionado una prioridad
        if (!document.querySelector('input[name="RadioPriority"]:checked')) {
            //if (toDo.priority === 0)

            // Si no se ha seleccionado una prioridad, se muestra un mensaje de error
            // se establece el estado de error para mostrar un mensaje
            setPriorityRadioSelectedError(true);

            validate = false;
        }

        return validate;
    }

    /**
    * Creates a new ToDo item
    * @param {React.FormEvent} event - Form submission event
    * @returns {void}
    * */
    const createToDo = (event) => {

        if(validateInput(event))
        {
            // Si el formulario es válido, se procede a crear un nuevo ToDo

            // Se obtiene el valor de la prioridad seleccionada en el formulario y se actualiza el campo priority del objeto toDo
            toDo.priority = parseInt(document.querySelector('input[name="RadioPriority"]:checked').value);
            setToDo(toDo);

            // Llama a la función addToDo para agregar el nuevo ToDo, se pasa el objeto toDo que contiene el texto y la prioridad
            addToDo(toDo);

            // Cierra el modal y resetea el estado del ToDo
            // Esto es útil para limpiar el formulario después de agregar un nuevo ToDo
            resetFormAndData();
        } 
    };

    /**
    * Updates an existing ToDo item
    * @param {React.FormEvent} event - Form submission event
    * @returns {void}
    * */
    const updateToDoData = (event) => {

        if(validateInput(event))
        {
            // Si el formulario es válido, se procede a crear un nuevo ToDo

            // Se obtiene el valor de la prioridad seleccionada en el formulario y se actualiza el campo priority del objeto toDo
            toDo.priority = parseInt(document.querySelector('input[name="RadioPriority"]:checked').value);
            setToDo(toDo);

            // actualiza los valores del ToDo con los datos ingresados en el formulario
            updateToDo(toDo);

            // Cierra el modal y resetea el estado del ToDo
            // Esto es útil para limpiar el formulario después de editar un ToDo
            resetFormAndData();
        }
    }

    /**
     * Resets the form and data
     * This function is called when the modal is closed or after a ToDo is created
     * It resets the ToDo state to its initial values and clears the validation state
     * @returns {void}
     * */
    function resetFormAndData() {

        // Cierra el modal
        // Esto es útil para ocultar el modal después de agregar o editar un ToDo
        setShow(false);

        // Resetea el estado del ToDo a su valor inicial
        // Esto es útil para limpiar el formulario después de agregar un nuevo ToDo o editar un ToDo existente
        setToDo({
            text: '',
            priority: 0 // Reset to default priority
        });

        // Resetea el estado de validación del formulario
        // Esto es útil si el usuario abre el modal nuevamente
        setValidated(false);
    }

    /**
    * Handles input text change
    * @param {React.ChangeEvent<HTMLInputElement>} event - Input change event
    */
    const onTextChange = (event) => {
        // Actualiza el campo de texto del ToDo con el valor ingresado por el usuario
        // event.target.value contiene el valor actual del campo de texto
        setToDo({
            ...toDo,
            text: event.target.value
        });
    };

    /**
    * Handles priority change
    * @param {React.ChangeEvent<HTMLInputElement>} event - Radio button change event
    */
    const handlePriorityChange = (event) => {
        // Actualiza el campo de prioridad del ToDo con el valor seleccionado por el usuario
        // event.target.value contiene el valor del radio button seleccionado
        setToDo({
            ...toDo,
            priority: parseInt(event.target.value)
        });

        // Resetea el estado de error de prioridad al cambiar la selección
        // Esto es útil para limpiar el mensaje de error si el usuario selecciona una prioridad después de haber intentado enviar el formulario sin seleccionar una
        setPriorityRadioSelectedError(false);
    }


    // Opciones de prioridad
    const PRIORITY_OPTIONS = [
        { id: 1, label: 'High' },
        { id: 2, label: 'Medium' },
        { id: 3, label: 'Low' }
    ];

    // Componente para el label del radio button
    const PriorityLabel = ({ label, flagClass }) => (
        <span className="d-flex align-items-center gap-2">
            {label}
            <i className={`bi bi-flag-fill ${flagClass}`} />
        </span>
    );

    return (
        <>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>
                        {createOrEdit ? 'Create ToDo' : 'Edit ToDo'}
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={undefined} noValidate validated={validated}>

                        <Form.Group className="mb-3" controlId="textGroup">
                            <Form.Label>ToDo Action</Form.Label>
                            <Form.Control
                                type="text"
                                value={toDo.text}
                                onChange={onTextChange}
                                required
                                placeholder="Type ToDo Action"
                                autoFocus
                            />
                            <Form.Control.Feedback type="invalid">
                                Please type a ToDo action.
                            </Form.Control.Feedback>
                            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                        </Form.Group>

                        <Form.Label>Priority</Form.Label>
                        <br></br>

                        <Form.Group className="mb-3" controlId="RadioPriorityGroup">
                            {PRIORITY_OPTIONS.map(({ id, label }) => (
                                <Form.Check
                                    key={id}
                                    type='radio'
                                    id={`priority${id}`}
                                    value={id}
                                    checked={toDo.priority === id}
                                    name="RadioPriority"
                                    onChange={handlePriorityChange}
                                    label={
                                        <PriorityLabel
                                            label={label}
                                            flagClass={`flag-${id}`}
                                        />
                                    }
                                />
                            ))}

                            {priorityRadioSelectedError && (
                                <Form.Text className="text-danger">
                                    Please select a priority level
                                </Form.Text>
                            )}
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                        <Button 
                            type="submit"
                            variant="primary"
                            onClick={createOrEdit ? createToDo : updateToDoData}
                        >
                            {createOrEdit ? "Create ToDo" : "Update ToDo"}
                        </Button>
                </Modal.Footer>
            </Modal>
        </>
    );


}

export { ModalForm };