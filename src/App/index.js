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
import PropTypes from 'prop-types';
import LoadingToDoCounter from "../LoadingToDoCounter";

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
        getCompleteToDos,       // Get completed todos function
        getIncompletedToDos,    // Get incomplete todos function
        filterOption,           // Current filter option
        filterByPriority,       // Priority filter function
        completeToDo,           // Toggle todo completion
        deleteToDo,             // Delete todo function
        addToDo,               // Add new todo function
        openModal: show,        // Modal visibility state
        setOpenModal: setShow,  // Modal visibility setter
        isEmpty                 // Text validation function
    } = useToDos();


    return (
        <Container>
            <ToDoHeader>
                <Row>
                    <Col>
                        <Title />
                        {loading && <LoadingToDoCounter />}
                        {!loading &&
                            <ToDoCounter 
                                totalToDos={totalToDos}
                                totalCompletedToDos={totalCompletedToDos}
                            />
                        }
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
                            setOpenModal={setShow}
                            loading={loading}
                        />
                    </Col>
                </Row>
            </ToDoHeader>
          
            <ToDoSection>
                <Row>
                    <FilterOptions 
                        getAllToDos={getAllToDos}
                        getCompleteToDos={getCompleteToDos}
                        getIncompletedToDos={getIncompletedToDos}
                        filterOption={filterOption}
                        filterByPriority={filterByPriority}
                        loading={loading}
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

                        // todo={todo => (
                        //     <ToDoItem
                        //         completeToDo={completeToDo}
                        //         deleteToDo={deleteToDo}
                        //         key={todo.id}
                        //         text={todo.text}
                        //         priority={todo.priority}
                        //         completed={todo.completed}
                        //     />
                        // )}
                    >
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
    getCompleteToDos: PropTypes.func.isRequired,
    getIncompletedToDos: PropTypes.func.isRequired,
    filterOption: PropTypes.number.isRequired,
    filterByPriority: PropTypes.func.isRequired
};

ToDoList.propTypes = {
    loading: PropTypes.bool.isRequired,
    totalToDos: PropTypes.number.isRequired,
    error: PropTypes.bool.isRequired,
    list: PropTypes.array.isRequired,
    searchValue: PropTypes.string.isRequired,
    children: PropTypes.func.isRequired
};

export default App;
