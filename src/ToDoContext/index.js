import React from "react";
import { useLocalStorage } from "./useLocalStorage";

const ToDoContext = React.createContext();
// let ToDoList = [
//     { id : 1, text : "Estudiar ReactJs", completed : false },
//     { id : 2, text : "Estudiar SpringBoot", completed : true },
//     { id : 3, text : "Estudiar Ingles", completed : false }
// ];

function ToDoContextProvider({ children }) {
    const {
        item: ToDoList,
        saveItem: saveToDos,
        loading,
        error
    } = useLocalStorage('TODOS_V1', []);

    const [searchValue, setSearchValue] = React.useState('');

    const [openModal, setOpenModal] = React.useState(false);

    const [ToDoListTemp, setToDoListTemp] = React.useState('');

    const [filterOption, setFilterOption] = React.useState(0);

    let List = '';

    const getAllToDos = () => {
        setToDoListTemp(ToDoList);
        setFilterOption(0);
        setSearchValue('');
    };

    const getCompleteToDos = () => {
        List = completedToDos();
        setToDoListTemp(List);
        setFilterOption(1);
        setSearchValue('');
    };

    const completedToDos = () => {
        const CompletedToDos = ToDoList.filter(
            (todo) => {
                return todo.completed === true;
            }
        );
        return CompletedToDos;
    }

    const getIncompletedToDos = () => {
        List = incompletedToDos();
        setToDoListTemp(List);
        setFilterOption(2);
        setSearchValue('');
    }

    const incompletedToDos = () => {
        const incompletedToDosList = ToDoList.filter(
            (todo) => {
                return todo.completed === false;
            }
        );
        return incompletedToDosList;
    }

    const findToDoByText = (Text) => {
        let ListToSearch = '';
        let searchedToDos = '';
    
        switch (filterOption) {
            case 0:
                ListToSearch = ToDoList;
                break;
            case 1:
                ListToSearch = completedToDos();
                break;
            case 2:
                ListToSearch = incompletedToDos();
                break;
            default:
                ListToSearch = getAllToDos();
                break;
        }

        searchedToDos = ListToSearch.filter(
            (todo) => {
                const todoText = todo.text.toLowerCase();
                const searchText = Text.toLowerCase();
                return todoText.includes(searchText);
            }
        );

        setToDoListTemp(searchedToDos);
        setSearchValue(Text);
    }

    const findIncompleteToDoByText = (Text) => {
        let searchedToDos = incompletedToDos().filter(
            (todo) => {
                const todoText = todo.text.toLowerCase();
                const searchText = Text.toLowerCase();
                return todoText.includes(searchText);
            }
        );
        return searchedToDos;
    }

    const addToDo = (ToDo) => {
        const newToDoList = [...ToDoList];
        let ToDoObj = {
            id: (Math.floor(Math.random() * 100) + Math.floor(Math.random() * 1000)),
            text: ToDo.text,
            priority: ToDo.priority,
            completed: false
        };
        newToDoList.push(ToDoObj);
        saveToDos(newToDoList);


        const newToDoListTemp = [...ToDoListTemp];
        if (filterOption === 0 || filterOption === 2){
            newToDoListTemp.push(ToDoObj);
        }  
        setToDoListTemp(newToDoListTemp);
    };

    const completeToDo = (text) => {
        const newToDoList = [...ToDoList];
        const index = newToDoList.findIndex((todo) => todo.text === text);
        newToDoList[index].completed = newToDoList[index].completed !== true ? true : false;
        saveToDos(newToDoList);
    };

    const deleteToDo = (text) => {
        const newToDoList = [...ToDoList];
        const index = newToDoList.findIndex((todo) => todo.text === text);
        newToDoList.splice(index, 1);
        saveToDos(newToDoList);

        const newToDoListTemp = [...ToDoListTemp];
        const indexTemp = newToDoListTemp.findIndex((todo) => todo.text === text);
        newToDoListTemp.splice(indexTemp, 1);
        setToDoListTemp(newToDoListTemp);
    };

    const isEmpty = (text) => {
        let value = "" + text.trim();
        if (value == null || value.length === 0 || /^\s+$/.test(value)) {
            return true;
        } else
            return false;
    };

    if (ToDoListTemp.length > 0) 
    {
        if (filterOption === 0){
            List = ToDoListTemp;
        }else if (filterOption === 1){
            List = ToDoListTemp;
        }else if (filterOption === 2)
        {
            if(searchValue.length === 0){
                List = incompletedToDos();
            }else{
                let Lista1 = findIncompleteToDoByText(searchValue);
                if(Lista1.length > ToDoListTemp.length)
                    List = Lista1;
                else
                    List = ToDoListTemp;
            }
        }
    } else if(searchValue.length > 0) {
        List = ToDoListTemp;
    } else{
        if (filterOption === 0)  
            List = ToDoList;

        if(List.length === 0)
            List = [];
    }
    
    const totalToDos = ToDoList.length;
    const totalCompletedToDos = completedToDos().length;
    return (
        <ToDoContext.Provider value={{
            List,
            getAllToDos,
            getCompleteToDos,
            getIncompletedToDos,
            findToDoByText,
            searchValue,
            setSearchValue,
            openModal,
            setOpenModal,
            addToDo,
            completeToDo,
            deleteToDo,
            isEmpty,
            totalToDos,
            totalCompletedToDos,
            loading,
            error
        }}>
            {children}
        </ToDoContext.Provider>
    );

}

export { ToDoContext, ToDoContextProvider };