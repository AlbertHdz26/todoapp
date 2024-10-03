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
        itemTemp: ToDoListTemp,
        setItemTemp: setToDoListTemp,
        loading,
        error
    } = useLocalStorage('TODOS_V1', []);

    const [searchValue, setSearchValue] = React.useState('');

    const [openModal, setOpenModal] = React.useState(false);

    const [ToDoListTemp2, setToDoListTemp2] = React.useState('');

    const [ToDoListTemp3, setToDoListTemp3] = React.useState('');

    const [filterOption, setFilterOption] = React.useState(0);

    const [priority, setPriority] = React.useState(0);

    let List = '';

    const getAllToDos = () => {
        setToDoListTemp(ToDoList);
        setFilterOption(0);
        setPriority(0);
        setSearchValue('');
        document.getElementById('prioritySelect').selectedIndex = 0;
    };

    const getCompleteToDos = () => {
        List = completedToDos();
        setToDoListTemp(List);
        setFilterOption(1);
        setPriority(0);
        setSearchValue('');
        document.getElementById('prioritySelect').selectedIndex = 0;

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
        setPriority(0);
        setSearchValue('');
        document.getElementById('prioritySelect').selectedIndex = 0;
    }

    const incompletedToDos = () => {
        const incompletedToDosList = ToDoList.filter(
            (todo) => {
                return todo.completed === false;
            }
        );
        return incompletedToDosList;
    }

    const filterByPriority = (priorityOption) => {

        switch (priorityOption) {
            case 0:
                List = ToDoListTemp;
                setPriority(0);
                setSearchValue('');
                break;
            case 1:
                filterByDownPriority();
                break;
            case 2:
                filterByMediumPriority();
                break;
            case 3:
                filterByHighPriority();
                break;
            default:
                break;
        }
    }

    const filterByDownPriority = () => {
        const ListTemp = [...ToDoListTemp];
        const listByPriority = ListTemp.filter(
            (todo) => {
                return todo.priority === 1;
            }
        );
        setToDoListTemp2(listByPriority);
        setPriority(1);
        setSearchValue('');

    }

    const filterByMediumPriority = () => {

        const ListTemp = [...ToDoListTemp];
        const listByPriority = ListTemp.filter(
            (todo) => {
                return todo.priority === 2;
            }
        );
        setToDoListTemp2(listByPriority);
        setPriority(2);
        setSearchValue('');
    }

    const filterByHighPriority = () => {
        const ListTemp = [...ToDoListTemp];
        const listByPriority = ListTemp.filter(
            (todo) => {
                return todo.priority === 3;
            }
        );
        setToDoListTemp2(listByPriority);
        setPriority(3);
        setSearchValue('');
    }

    const findToDoByText = (Text) => {
        
        let ListToSearch = '';
        let searchedToDos = '';

        ListToSearch = determinateListByPrioririty();

        searchedToDos = ListToSearch.filter(
            (todo) => {
                const todoText = todo.text.toLowerCase();
                const searchText = Text.toLowerCase();
                return todoText.includes(searchText);
            }
        );
        setToDoListTemp3(searchedToDos);
        setSearchValue(Text);
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
        if (filterOption === 0 || filterOption === 2) {
            newToDoListTemp.push(ToDoObj); 
        }
        setToDoListTemp(newToDoListTemp);
       
        if( (filterOption === 0 || filterOption === 2) && 
            (priority === 0 || ToDo.priority === priority)
        ){
            let newToDoListTemp = [...ToDoListTemp2];
            newToDoListTemp.push(ToDoObj); 
            setToDoListTemp2(newToDoListTemp);
        }

        if(  (ToDoListTemp3.length > 0) &&
            (filterOption === 0 || filterOption === 2) && 
            (priority === 0 || ToDo.priority === priority)
        ){
            if(ToDo.text.includes(searchValue)){
                let newToDoListTemp = [...ToDoListTemp3];
                newToDoListTemp.push(ToDoObj); 
                setToDoListTemp3(newToDoListTemp);
            }
            
        }

    };

    const completeToDo = (text) => {

        const newToDoList = [...ToDoList];
        const index = newToDoList.findIndex((todo) => todo.text === text);
        newToDoList[index].completed = newToDoList[index].completed !== true ? true : false;
        saveToDos(newToDoList);

        if(filterOption === 1 || filterOption === 2){
            const newToDoListTemp = [...ToDoListTemp];
            const indexTemp = newToDoListTemp.findIndex((todo) => todo.text === text);
            newToDoListTemp.splice(indexTemp, 1);
            setToDoListTemp(newToDoListTemp);

            const newToDoListTemp2 = [...ToDoListTemp2];
            const indexTemp2 = newToDoListTemp2.findIndex((todo) => todo.text === text);
            newToDoListTemp2.splice(indexTemp2, 1);
            setToDoListTemp2(newToDoListTemp2);

            const newToDoListTemp3 = [...ToDoListTemp3];
            const indexTemp3 = newToDoListTemp3.findIndex((todo) => todo.text === text);
            newToDoListTemp3.splice(indexTemp3, 1);
            setToDoListTemp3(newToDoListTemp3);
        }
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

        if(ToDoListTemp2.length > 0){
            let newToDoListTemp = [...ToDoListTemp2];
            const indexTemp = newToDoListTemp.findIndex((todo) => todo.text === text);
            newToDoListTemp.splice(indexTemp, 1);
            setToDoListTemp2(newToDoListTemp);
        }

        if( ToDoListTemp3.length > 0 && 
            (filterOption === 0 || filterOption === 2)
        ){
            let newToDoListTemp = [...ToDoListTemp3];
            const indexTemp = newToDoListTemp.findIndex((todo) => todo.text === text);
            newToDoListTemp.splice(indexTemp, 1);
            setToDoListTemp3(newToDoListTemp);
        }
    };

    const isEmpty = (text) => {
        let value = "" + text.trim();
        if (value == null || value.length === 0 || /^\s+$/.test(value)) {
            return true;
        } else
            return false;
    };

    const determinateListByPrioririty = () => {
        let Lista = '';
        switch (priority) {
            case 0:
                Lista = ToDoListTemp;
                break;
            case 1: case 2: case 3:
                Lista = ToDoListTemp2;
                break;
            default:
                break;
        }
        return Lista;
    }

    //List Data Validation
    // console.log('==== Init Before validate ====');
    // console.log('ToDoList: ' + ToDoList.length);
    // if(ToDoList.length > 0){ let r=''; ToDoList.forEach(function(jsonObj) { r +=jsonObj.text+', '+jsonObj.completed+', '+jsonObj.priority+' | '; }); console.log(r); }
    // console.log('ToDoListTemp: ' + ToDoListTemp.length );
    // if(ToDoListTemp.length > 0){let r=''; ToDoListTemp.forEach(function(jsonObj) { r +=jsonObj.text+', '+jsonObj.completed+', '+jsonObj.priority+' | '; }); console.log(r); }
    // console.log('ToDoListTemp2: ' + ToDoListTemp2.length );
    // if(ToDoListTemp2.length > 0){ let r=''; ToDoListTemp2.forEach(function(jsonObj) { r +=jsonObj.text+', '+jsonObj.completed+', '+jsonObj.priority+' | '; }); console.log(r); }
    // console.log('ToDoListTemp3: ' + ToDoListTemp3.length);
    // if(ToDoListTemp3.length > 0){ let r=''; ToDoListTemp3.forEach(function(jsonObj) { r +=jsonObj.text+', '+jsonObj.completed+', '+jsonObj.priority+' | '; }); console.log(r); }
    // console.log('List: ' + List.length);
    // if(List.length > 0){ let r=''; List.forEach(function(jsonObj) { r +=jsonObj.text+', '+jsonObj.completed+', '+jsonObj.priority+' | '; }); console.log(r); }
    // console.log('filterOption: ' + filterOption);
    // console.log('priority: ' + priority);
    // console.log('searchValue: ' + searchValue.length + " " + searchValue);
    // console.log('==== End Before validate ====');

    if (ToDoListTemp.length > 0) 
    {
        if (filterOption === 0 ||
            filterOption === 1) 
        {
            if (searchValue.length > 0) {
                List = ToDoListTemp3;
            }else{
                List = determinateListByPrioririty();
            }     
        } else if (filterOption === 2) 
        {
            if (searchValue.length > 0) {
                List = ToDoListTemp3;
            }else{
                List = determinateListByPrioririty();
            }         
        }
    } else {
        if (filterOption === 0) {
            List = ToDoList;
        }

        if (List.length === 0) {
            List = [];
        }
    }   

    const totalToDos = ToDoList.length;
    const totalCompletedToDos = completedToDos().length;

    // console.log('List: ' + List.length);
    // if(List.length > 0){ let r=''; List.forEach(function(jsonObj) { r +=jsonObj.text+', '+jsonObj.completed+', '+jsonObj.priority+' | '; }); console.log(r) }
    // console.log('--------- End ToDoContextProvider ---------');
    return (
        <ToDoContext.Provider value={{
            List,
            getAllToDos,
            getCompleteToDos,
            getIncompletedToDos,
            filterOption,
            findToDoByText,
            searchValue,
            setSearchValue,
            filterByPriority,
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