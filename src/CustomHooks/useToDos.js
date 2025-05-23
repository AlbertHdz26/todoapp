import React from "react";
import { useLocalStorage } from "./useLocalStorage";

// let ToDoList = [
//     { id : 1, text : "Estudiar ReactJs", completed : false },
//     { id : 2, text : "Estudiar SpringBoot", completed : true },
//     { id : 3, text : "Estudiar Ingles", completed : false }
// ];

/**
 * @typedef {Object} ToDo
 * @property {number} id - Unique identifier for the todo
 * @property {string} text - The todo text content
 * @property {number} priority - Priority level (1: Low, 2: Medium, 3: High)
 * @property {boolean} completed - Completion status
 */

/**
 * Custom hook for managing todos with filtering, search and CRUD operations
 * @returns {Object} Todo operations and state
 */
function useToDos() {
    
    
    const {
        item: ToDoList,
        saveItem: saveToDos,
        itemFiltered: ToDoListFilteredByState, //State to manage To Dos filtered by state: all todos, completed and incompleted
        setItemFiltered: setToDoListFilteredByState,
        loading,
        error,
        sincronizeItem: sincronizeToDos
    } = useLocalStorage('TODOS_V1', []);

    /**
    * State to manage the search value in the Todo list
    * @type {T}
    */
    const [searchValue, setSearchValue] = React.useState('');

    /**
    * State to manage the modal visibility
    * @type {boolean}
    */
    const [openModal, setOpenModal] = React.useState(false);

    /**
    * State to manage filtered todo list by priority      
    * @type {ToDo[]}
    */
    const [ToDoListByPriority, setToDoListByPriority] = React.useState('');

    /**
     * State to manage filtered todo list by search text
     * @type {ToDo[]}
     */
    const [ToDoListFilteredBySearchValue, setToDoListFilteredBySearchValue] = React.useState('');

    /**
     * State to manage the filter option (0: All, 1: Completed, 2: Incompleted)
     * @type {number}
     */
    const [filterStateOption, setFilterStateOption] = React.useState(0);

    /**
     * State to manage the priority level (0: All, 1: Low, 2: Medium, 3: High)
     * @type {number}
     */
    const [priority, setPriority] = React.useState(0);

    
    let List = '';

    /**
     * Retrieves all todos and resets filters
     * @function
     * @returns {void}
     * @param {void}
     * @description Resets the todo list to show all todos and clears filters
     * // Usage: Call this function to reset the todo list to show all todos
     * // and clear any applied filters.
     */
    const getAllToDos = () => {
        setValuesAfterFilterByState(ToDoList, 0);
    };   
    

    const filterByState = (state) => {
        List = filterByStateOption(state);
        setValuesAfterFilterByState(List, state === true ? 1 : 2);
    } 

    const filterByStateOption = (state) => {
        const filteredToDoList = ToDoList.filter(
            (todo) => {
                return todo.completed === state;
            }
        );
        return filteredToDoList;
    } 

    const setValuesAfterFilterByState = (List, option) => {
        setToDoListFilteredByState(List);
        setFilterStateOption(option);
        setPriority(0);
        setSearchValue('');
        document.getElementById('prioritySelect').selectedIndex = 0;
    }
    

    /**
     * Filters todos by priority level
     * @param {number} priorityOption - Priority level (0: All, 1: Low, 2: Medium, 3: High)
     */
    const filterByPriority = (priorityOption) => 
    {
        switch (priorityOption) {
            case 0:
                filterByPriorityOption(priorityOption);
                break;
            case 1:
                filterByPriorityOption(priorityOption);
                break;
            case 2:
                filterByPriorityOption(priorityOption);
                break;
            case 3:
                filterByPriorityOption(priorityOption);
                break;
            default:
                break;
        }
    }

    /**
     * Filters todos by a specific priority option  
     * @param {number} priorityOption - Priority level (1: Low, 2: Medium, 3: High)
     * @returns {void}
     * and updates the state accordingly.
     * // Usage: Call this function to filter the todo list by a specific
     * // priority option (1, 2, or 3) and update the state with the filtered list. 
     * */
    const filterByPriorityOption = (priorityOption) => 
    {
        if(priorityOption !== 0)
        {
            const ListTemp = [...ToDoListFilteredByState];
            const listByPriority = ListTemp.filter(
                (todo) => {
                    return todo.priority === priorityOption;
                }
            );
            setToDoListByPriority(listByPriority);
        }

        setPriority(priorityOption);
        setSearchValue('');
    }
    


    /**
     * Searches todos by text
     * @param {string} Text - Search text to filter todos
     */
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
        setToDoListFilteredBySearchValue(searchedToDos);
        setSearchValue(Text);
    }


    /**
     * Adds a new todo to the list
     * @param {ToDo} ToDo - The todo object to add
     */
    const addToDo = (ToDo) => {

        //Se hace una copia de ToDoList y se guarda en la nueva constante newToDoList.
        const newToDoList = [...ToDoList];

        //Se crea un nuevo objeto ToDoObj con los valores del ToDo recibido como parametro.
        //Se genera un id aleatorio para el nuevo ToDo.
        let ToDoObj = {
            id: (Math.floor(Math.random() * 100) + Math.floor(Math.random() * 1000)),
            text: ToDo.text,
            priority: ToDo.priority,
            completed: false
        };

        // Se agrega el nuevo ToDo a la lista newToDoList.
        newToDoList.push(ToDoObj);

        // Se guarda el nuevo ToDo dentro de la lista newToDoList en el LocalStorage.
        saveToDos(newToDoList);



        
        /***** Logica para actualizar el listado de ToDos en la vista. *****/

        //Se hace una copia de ToDoListTemp y se guarda en la nueva constante newToDoListTemp.
        const newToDoListTemp = [...ToDoListFilteredByState];
        
        // Se valida si el listado de ToDos esta en la opcion de filtrado de AllToDos o IncompletedToDos
        // Si es AllToDos o IncompletedToDos se agrega el nuevo ToDo a la lista newToDoListTemp
        if (filterStateOption === 0 || filterStateOption === 2) {
            newToDoListTemp.push(ToDoObj); 
        }

        // Se actualiza toDoListTemp con la lista newToDoListTemp
        setToDoListFilteredByState(newToDoListTemp);
       
        if( (filterStateOption === 0 || filterStateOption === 2) && 
            (priority === 0 || ToDo.priority === priority)
        ){
            let newToDoListTemp = [...ToDoListByPriority];
            newToDoListTemp.push(ToDoObj); 
            setToDoListByPriority(newToDoListTemp);
        }

        if(  (ToDoListFilteredBySearchValue.length > 0) &&
            (filterStateOption === 0 || filterStateOption === 2) && 
            (priority === 0 || ToDo.priority === priority)
        ){
            if(ToDo.text.includes(searchValue)){
                let newToDoListTemp = [...ToDoListFilteredBySearchValue];
                newToDoListTemp.push(ToDoObj); 
                setToDoListFilteredBySearchValue(newToDoListTemp);
            }
            
        }

    };


    /**
     * Toggles the completion status of a todo
     * @param {string} text - Text of the todo to complete
     */
    const completeToDo = (text) => {

        const newToDoList = [...ToDoList];
                                           // Retornar el índice del primer elemento que coincida con el texto buscado
        const index = newToDoList.findIndex((todo) => todo.text === text);
        newToDoList[index].completed = newToDoList[index].completed !== true ? true : false;
        saveToDos(newToDoList);

        if(filterStateOption === 1 || filterStateOption === 2)
        {
            updateLists([...ToDoListFilteredByState], text, 1);
            updateLists([...ToDoListByPriority], text, 2);
            updateLists([...ToDoListFilteredBySearchValue], text, 3);           
        }
    };

    function updateLists(newToDoListTemp, text, listOption) 
    {
        const indexTemp = newToDoListTemp.findIndex((todo) => todo.text === text);
        newToDoListTemp.splice(indexTemp, 1);

        switch(listOption)
        {
            case 0:
                saveToDos(newToDoListTemp);
                break;
            case 1:
                setToDoListFilteredByState(newToDoListTemp);
                break;
            case 2:
                setToDoListByPriority(newToDoListTemp);
                break;
            case 3:
                setToDoListFilteredBySearchValue(newToDoListTemp);
                break;
            default:
                break;
        }
    }


    /**
     * Removes a todo from all lists
     * @param {string} text - Text of the todo to delete
     */
    const deleteToDo = (text) => {

        updateLists([...ToDoList], text, 0);

        updateLists([...ToDoListFilteredByState], text, 1);

        if(ToDoListByPriority.length > 0)
        {
            updateLists([...ToDoListByPriority], text, 2);
        }

        if( ToDoListFilteredBySearchValue.length > 0 && 
            (filterStateOption === 0 || filterStateOption === 2)
        ){
            updateLists([...ToDoListFilteredBySearchValue], text, 3);   
        }
    };


    /**
     * Checks if a string is empty or contains only whitespace
     * @param {string} text - Text to validate
     * @returns {boolean} True if empty, false otherwise
     */
    const isEmpty = (text) => {
        let value = "" + text.trim();
        if (value == null || value.length === 0 || /^\s+$/.test(value)) {
            return true;
        } else
            return false;
    };


    /**
     * Determines which list to use based on current priority filter
     * @returns {ToDo[]} Filtered list of todos
     */
    const determinateListByPrioririty = () => {
        let Lista = '';
        switch (priority) {
            case 0:
                Lista = ToDoListFilteredByState;
                break;
            case 1: case 2: case 3:
                Lista = ToDoListByPriority;
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

    if (ToDoListFilteredByState.length > 0) 
    {
        if (filterStateOption === 0 ||
            filterStateOption === 1 ||
            filterStateOption === 2) 
        {
            if (searchValue.length > 0) {
                List = ToDoListFilteredBySearchValue;
            }else{
                List = determinateListByPrioririty();
            }     
        } 
    } 
    else 
    {
        if (filterStateOption === 0) {
            List = ToDoList;
        }

        if (List.length === 0) {
            List = [];
        }
    }   

    const totalToDos = ToDoList.length;
    const totalCompletedToDos = filterByStateOption(true).length;

    // console.log('List: ' + List.length);
    // if(List.length > 0){ let r=''; List.forEach(function(jsonObj) { r +=jsonObj.text+', '+jsonObj.completed+', '+jsonObj.priority+' | '; }); console.log(r) }
    // console.log('--------- End ToDoContextProvider ---------');
    return {
        /**
         * Current filtered and processed list of todos
         * @type {ToDo[]}
         */
        List,
        getAllToDos,
        filterByState,
        filterStateOption,
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
        error,
        sincronizeToDos
    };
}

export { useToDos };