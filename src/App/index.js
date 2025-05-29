/**
 * @fileoverview Main application component that orchestrates todo management
 * @author 
 * @version 1.0.0
 */

import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { Title } from "../Title";
import { useToDos } from "../CustomHooks/useToDos";
import { ToDoSearch } from "../ToDoSearch";
import { ToDoList } from "../TodoList";
import { ToDoItem } from "../ToDoItem";
import { CreateButton } from "../CreateButton";
import { ModalForm } from "../ModalForm";
import { ToDoCounter } from "../ToDoCounter";
import { FilterOptions } from "../FilterOptions";
import { ToDoHeader } from "../ToDoHeader";
import { ToDoSection } from "../ToDoSection";
import { LocalStorageChangeAlert } from "../LocalStorageChangeAlert";
import PropTypes from 'prop-types';


/**
 * Main application component that provides todo management functionality
 * Handles:
 * - Todo list rendering
 * - Filtering and search
 * - Todo creation through modal
 * - Todo status updates
 * - Loading and error states
 * 
 * @returns {JSX.Element} The main application UI
 */
function App() {
    /**
     * Custom hook that provides todo management functionality
     * @type {Object} Todo management state and functions
     */
    const {
        List,                    // Current filtered/searched todo list
        loading,                 // Loading state flag
        error,                   // Error state flag
        totalToDos,             // Total number of todos
        totalCompletedToDos,    // Number of completed todos
        searchValue,            // Current search term
        findToDoByText,         // Search function
        getAllToDos,            // Get all todos function
        filterByState,         // Filter todos by state (completed/incompleted)
        filterStateOption,           // Current filter priority option
        filterByPriority,       // Priority filter function
        completeToDo,           // Toggle todo completion
        deleteToDo,             // Delete todo function
        addToDo,               // Add new todo function
        openModal: show,        // Modal visibility state
        setOpenModal: setShow,  // Modal visibility setter
        isEmpty,                 // Text validation function
        sincronizeToDos,     // Synchronize todos with localStorage
        orderAscDesc,         // Order todos ascending/descending by Name
        disabledOrderAscDesc  // Disable order asc/desc buttons based on order high to low or low to high
    } = useToDos();


    return (
        <Container>
            <ToDoHeader>
                <Row>
                    <Col>
                        <Title />
                        {/*
                            {loading && <LoadingToDoCounter />}
                            {!loading &&
                                <ToDoCounter 
                                    loading={loading}
                                    totalToDos={totalToDos}
                                    totalCompletedToDos={totalCompletedToDos}
                                />
                            }
                        */}
                        <ToDoCounter
                            loading={loading}
                            totalToDos={totalToDos}
                            totalCompletedToDos={totalCompletedToDos}
                        />
                    </Col>
                </Row>
                <Row>
                    <Col md={11}>
                        <ToDoSearch
                            loading={loading}
                            searchValue={searchValue}
                            findToDoByText={findToDoByText}
                        />
                    </Col>
                    <Col md={1}>
                        <CreateButton
                            loading={loading}
                            setOpenModal={setShow}
                        />
                    </Col>
                </Row>
            </ToDoHeader>

            <ToDoSection>
                <Row>
                    <FilterOptions
                        getAllToDos={getAllToDos}
                        filterByState={filterByState}
                        filterStateOption={filterStateOption}
                        filterByPriority={filterByPriority}
                        loading={loading}
                        orderAscDesc={orderAscDesc}
                        disabledOrderAscDesc={disabledOrderAscDesc}
                    />

                    <LocalStorageChangeAlert 
                        sincronizeToDos={sincronizeToDos}
                    />

                    <ToDoList
                        loading={loading}
                        totalToDos={totalToDos}
                        error={error}
                        list={List}
                        searchValue={searchValue}
                        /* EmptyToDo={() => <EmptyToDo />} */
                        /* LoadingToDoList={() => <LoadingToDoList />} */
                        /* EmptySearchResult={(searchValue) => <p> No results found for {searchValue} </p> } */
                        /* TodoError={() => <TodoError />} */

                        //Render prop to render each todo item
                        todo={todo => (
                            <ToDoItem
                                completeToDo={completeToDo}
                                deleteToDo={deleteToDo}
                                key={todo.id}
                                text={todo.text}
                                priority={todo.priority}
                                completed={todo.completed}
                            />
                        )}
                    >
                        {/* 
                            Render function to render each todo item 
                            {todo => (
                                <ToDoItem
                                    completeToDo={completeToDo}
                                    deleteToDo={deleteToDo}
                                    key={todo.id}
                                    text={todo.text}
                                    priority={todo.priority}
                                    completed={todo.completed}
                                />
                            )}
                            */}
                    </ToDoList>


                    <ModalForm
                        addToDo={addToDo}
                        show={show}
                        setShow={setShow}
                        isEmpty={isEmpty}
                    />

                </Row>
            </ToDoSection>
        </Container>
    );


}

/**
 * PropTypes validation for child components
 */
ToDoCounter.propTypes = {
    totalToDos: PropTypes.number.isRequired,
    totalCompletedToDos: PropTypes.number.isRequired
};

ToDoSearch.propTypes = {
    searchValue: PropTypes.string.isRequired,
    findToDoByText: PropTypes.func.isRequired
};

CreateButton.propTypes = {
    setOpenModal: PropTypes.func.isRequired
};

FilterOptions.propTypes = {
    getAllToDos: PropTypes.func.isRequired,
    filterByState: PropTypes.func.isRequired,
    filterStateOption: PropTypes.number.isRequired,
    filterByPriority: PropTypes.func.isRequired
};

ToDoList.propTypes = {
    loading: PropTypes.bool.isRequired,
    totalToDos: PropTypes.number.isRequired,
    error: PropTypes.bool.isRequired,
    list: PropTypes.array.isRequired,
    searchValue: PropTypes.string.isRequired,
    todo: PropTypes.func.isRequired
};

export default App;
