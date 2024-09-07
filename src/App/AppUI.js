import React from "react";
import { Container } from "react-bootstrap";
import { Row } from "react-bootstrap";
import { Col } from "react-bootstrap";
import { Title } from "../Title";
import { ToDoContext } from "../ToDoContext";
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

function AppUI() {

    const {
        List,
        loading,
        error,
        totalToDos
    } = React.useContext(ToDoContext);

    return (
        <Container>
            <Row>
                <Col>
                    <Title />
                    <ToDoCounter />
                </Col>
            </Row>
            <Row>
                <Col md={11}>
                    <ToDoSearch />
                </Col>
                <Col md={1}>
                    <CreateButton />
                </Col>
            </Row>
            <Row>
                <FilterOptions />
                <ToDoList>
                    {(!loading && totalToDos === 0) && <EmptyToDo />}
                    {loading && <LoadingToDoList/>}
                    {error && <TodoError />}

                    {List.map(todo => (
                        <ToDoItem
                            key={todo.id}
                            text={todo.text}
                            priority={todo.priority}
                            completed={todo.completed}
                        />
                    ))}
                </ToDoList>
                <ModalForm />
            </Row>
        </Container>
    );
}

export { AppUI }