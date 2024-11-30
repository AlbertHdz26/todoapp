import React from "react";
import { Container } from "react-bootstrap";
import { Row } from "react-bootstrap";
import { Col } from "react-bootstrap";
import { Title } from "../Title";
import { useToDos } from "../CustomHooks/useToDos";
import { ToDoSearch } from "../ToDoSearch";
import { ToDoList } from "../TodoList";
import { ToDoItem } from "../ToDoItem";
import { CreateButton } from "../CreateButton";
import { ModalForm } from "../ModalForm";
import { ToDoCounter } from "../ToDoCounter";
import { FilterOptions } from "../FilterOptions";
import { LoadingToDoList } from "../LoadingToDoList"
import { EmptyToDo } from "../EmptyToDo";
import { TodoError } from "../ToDoError";
import { ToDoHeader } from "../ToDoHeader";
import { ToDoSection } from "../ToDoSection";


function App() {
    const {
        List,
        loading,
        error,
        totalToDos,
        totalCompletedToDos,
        searchValue,
        findToDoByText,
        getAllToDos,
        getCompleteToDos,
        getIncompletedToDos,
        filterOption,
        filterByPriority,
        completeToDo,
        deleteToDo,
        addToDo,
        openModal: show,
        setOpenModal: setShow,
        isEmpty
    } = useToDos();


    return (
      <Container>
          <ToDoHeader>
              <Row>
                  <Col>
                      <Title />
                      <ToDoCounter 
                          totalToDos={totalToDos}
                          totalCompletedToDos={totalCompletedToDos}
                      />
                  </Col>
              </Row>
              <Row>
                  <Col md={11}>
                      <ToDoSearch 
                          searchValue={searchValue}
                          findToDoByText={findToDoByText}
                      />
                  </Col>
                  <Col md={1}>
                      <CreateButton 
                          setOpenModal={setShow}
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
                  />
                  <ToDoList>
                      {/* {console.log('%%% Init ToDoList %%%')} */}
                      {(!loading && totalToDos === 0) && <EmptyToDo />}
                      {loading && <LoadingToDoList/>}
                      {error && <TodoError />}
                      {/* {console.log('List: '+List.length)} */}

                      {/* {List.forEach(function(jsonObj) { console.log(jsonObj.text+', '+jsonObj.completed+', '+jsonObj.priority) } ) }  */}

                      {List.map(todo => (
                          <ToDoItem
                              completeToDo={completeToDo}
                              deleteToDo={deleteToDo}
                              key={todo.id}
                              text={todo.text}
                              priority={todo.priority}
                              completed={todo.completed}
                          />
                      ))}
                      {/* {console.log('%%% End ToDoList %%%')} */}
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

export default App;
