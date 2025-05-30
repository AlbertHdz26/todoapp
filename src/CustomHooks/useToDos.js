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
 * @property {string} id - The todo text content
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
    const [ToDoListByPriority, setToDoListByPriority] = React.useState([]);

    /**
     * State to manage ordered todo list (ascending or descending)
     * @type {ToDo[]}
     */
    const [ToDoListOrderedAscDesc, setToDoListOrderedAscDesc] = React.useState([]);
    
    /**
     * State to manage filtered todo list by search text
     * @type {ToDo[]}
     */
    const [ToDoListFilteredBySearchValue, setToDoListFilteredBySearchValue] = React.useState([]);

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

    /**
     * State to manage the disabled state of the order ascending/descending buttons
     * @type {boolean}
     */
    const [disabledOrderAscDesc, setDisabledOrderAscDesc] = React.useState(false);

    /**
     * State to manage the todo being edited in the modal
     * @type {ToDo}
     */
    const [toDo, setToDo] = React.useState({
        id: 0,
        text: '',
        priority: 0, 
        completed: false
    });

    /**
     * State to manage the create or edit mode of the todo  
     * @type {boolean}
     */
    const [createOrEdit, setCreateOrEdit] = React.useState(true); // true for create, false for edit

    /** Lista de todos a mostrar en vista */
    let List = [];
    
    /**
     * Retrieves all todos and resets filters
     * @function
     * @returns {void}
     * @param {void}
     * @description Resets the todo list to show all todos and clears filters
     */
    const getAllToDos = () => {
        setValuesAfterFilterByState(ToDoList, 0);
    };   
    
    /**
     * Filters todos by their completion state
     * @param {boolean} state - True for completed todos, false for incompleted todos
     * @returns {void}
     */
    const filterByState = (state) => {
        List = filterByStateOption(state);
        setValuesAfterFilterByState(List, state === true ? 1 : 2);
    } 

    /**
     * Filters todos by their completion state
     * @param {boolean} state - True for completed todos, false for incompleted todos
     * @returns {ToDo[]} Filtered todo list
     */
    const filterByStateOption = (state) => {
        const filteredToDoList = ToDoList.filter(
            (todo) => {
                return todo.completed === state;
            }
        );
        return filteredToDoList;
    } 

    /**
     * Sets the filtered todo list and resets other filters
     * @param {ToDo[]} List - The todo list to set
     * @param {number} option - The filter option (0: All, 1: Completed, 2: Incompleted)
     * @returns {void}
     */
    const setValuesAfterFilterByState = (List, option) => {
        setToDoListFilteredByState(List);
        setFilterStateOption(option);
        setPriority(0);
        setToDoListByPriority([]);
        setToDoListOrderedAscDesc([]);
        setDisabledOrderAscDesc(false);
        setSearchValue('');
        document.getElementById('prioritySelect').selectedIndex = 0;
    }
    

    /**
     * Filters and Order todos by priority level
     * @param {number} priorityOption - Priority level (0: All, 1: Filter Low, 2: Filter Medium, 3: Filter High, 4: Order High to Low, 5: Order Low to High)
     */
    const filterByPriority = (priorityOption) => 
    {
        const ListTemp = [...ToDoListFilteredByState];
        let listByPriority = [];

        switch (priorityOption) {
            case 0:
                // Si se selecciona la opción de todos los ToDos, se deshabilita el botón de ordenación ascendente/descendente
                setDisabledOrderAscDesc(false);
                break;
            case 1: case 2: case 3:
                listByPriority = ListTemp.filter(
                    (todo) => {
                        return todo.priority === priorityOption;
                    }
                );
                // Si se selecciona una opción de filtrado por prioridad, se habilita el botón de ordenación ascendente/descendente
                setDisabledOrderAscDesc(false);
                break;
            case 4:
                // Ordena de High a Low
                listByPriority = ListTemp.sort((a, b) => a.priority - b.priority);
                // Si se selecciona la opción de ordenar High a Low, se deshabilita el botón de ordenación ascendente/descendente
                setDisabledOrderAscDesc(true);
                break;
            case 5:
                // Ordena de Low a High
                listByPriority = ListTemp.sort((a, b) => b.priority - a.priority);
                // Si se selecciona la opción de ordenar Low a High, se deshabilita el botón de ordenación ascendente/descendente
                setDisabledOrderAscDesc(true);
                break;
            default:
                break;
        }
        setToDoListByPriority(listByPriority);
        setPriority(priorityOption);
        setToDoListOrderedAscDesc([]);
        setSearchValue('');
    }

    /**
     * Orders the todo list by text in ascending or descending order
     * @param {number} orderOption - Order option (1: Ascending, 2: Descending)
     */
    const orderAscDesc = (orderOption) => {
        let ListTemp = [];
        
        // Determina la lista a ordenar según el estado de los filtros
        if(ToDoListFilteredBySearchValue.length > 0){  
            ListTemp = [...ToDoListFilteredBySearchValue];
        }
        else if(ToDoListByPriority.length > 0){
            ListTemp = [...ToDoListByPriority];
        }
        else if(ToDoListFilteredByState.length > 0){
            ListTemp = [...ToDoListFilteredByState];
        }
        
        switch (orderOption) {
            case 1:
                // Ordena de A a Z
                ListTemp.sort((a, b) => a.text.toLowerCase().localeCompare(b.text.toLowerCase()));
                break;
            case 2:
                // Ordena de Z a A
                ListTemp.sort((a, b) => b.text.toLowerCase().localeCompare(a.text.toLowerCase()));
                break;
            default:
                // No se realiza ninguna ordenación
                break;
        }
        // Actualiza el estado de la lista ordenada ascendente o descendente
        // dependiendo de la opción seleccionada
        setToDoListOrderedAscDesc(ListTemp);

        // Actualiza el estado de lista filtrada por búsqueda en base a la lista ordenada
        if(searchValue.length > 0){
            setToDoListFilteredBySearchValue(ListTemp);
        }
    }


    /**
     * Searches todos by text
     * @param {string} Text - Search text to filter todos
     */
    const findToDoByText = (Text) => {
        
        let ListToSearch = [];
        let searchedToDos = '';

        ListToSearch = determinateListByPrioririty();

        searchedToDos = ListToSearch.filter(
            (todo) => {
                const todoText = todo.text.toLowerCase();
                const searchText = Text.toLowerCase();
                return todoText.includes(searchText);
            }
        );
        // se actualiza el estado de lista filtrada por búsqueda con los resultados de la búsqueda
        setToDoListFilteredBySearchValue(searchedToDos);

        //Se actualiza el estado de lista ordenada ascendente o descendente en base a la lista filtrada por búsqueda
        setToDoListOrderedAscDesc(searchedToDos);

        //se actualiza el estado de la búsqueda con el texto ingresado
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
            id: (Math.floor(Math.random() * 1000) + Math.floor(Math.random() * 10000)),
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

        // Se actualiza ToDoListFilteredByState con la lista newToDoListTemp
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
            if(ToDo.id.includes(searchValue)){
                let newToDoListTemp = [...ToDoListFilteredBySearchValue];
                newToDoListTemp.push(ToDoObj); 
                setToDoListFilteredBySearchValue(newToDoListTemp);
            }
            
        }

    };

    /**
     * Updates an existing todo in the list
     * @param {ToDo} ToDo - The todo object to update
     */
    const updateToDo = (ToDo) => {

        const newToDoList = [...ToDoList];
                                           // Retornar el índice del primer elemento que coincida con el id buscado
        const index = newToDoList.findIndex((todo) => todo.id === ToDo.id);
        newToDoList[index].text = ToDo.text;
        newToDoList[index].priority = ToDo.priority;
        saveToDos(newToDoList);

        if(filterStateOption === 1 || filterStateOption === 2)
        {
            updateLists([...ToDoListFilteredByState], ToDo.id, 1);
            updateLists([...ToDoListByPriority], ToDo.id, 2);
            updateLists([...ToDoListFilteredBySearchValue], ToDo.id, 3);           
        }
    };

    /**
     * Completes a todo by toggling its completed status
     * @param {ToDo} ToDo - The todo object to complete
     */
    const completeToDo = (ToDo) => {

        const newToDoList = [...ToDoList];
                                           // Retornar el índice del primer elemento que coincida con el id buscado
        const index = newToDoList.findIndex((todo) => todo.id === ToDo.id);
        newToDoList[index].completed = newToDoList[index].completed !== true ? true : false;
        saveToDos(newToDoList);

        if(filterStateOption === 1 || filterStateOption === 2)
        {
            updateLists([...ToDoListFilteredByState], ToDo.id, 1);
            updateLists([...ToDoListByPriority], ToDo.id, 2);
            updateLists([...ToDoListFilteredBySearchValue], ToDo.id, 3);           
        }
    };

    /**
     * Deletes a todo from the list
     * @param {ToDo} ToDo - The todo object to delete
     */
    const deleteToDo = (ToDo) => {

        updateLists([...ToDoList], ToDo.id, 0);
        updateLists([...ToDoListFilteredByState], ToDo.id, 1);

        if(ToDoListByPriority.length > 0)
        {
            updateLists([...ToDoListByPriority], ToDo.id, 2);
        }

        if( ToDoListFilteredBySearchValue.length > 0 && 
            (filterStateOption === 0 || filterStateOption === 2) )
        {
            updateLists([...ToDoListFilteredBySearchValue], ToDo.id, 3);   
        }
    };


    /**
    * Updates the lists after updating, completing or deleting a todo
    * @param {ToDo[]} newToDoListTemp - Temporary list of todos
    * @param {number} id - id of the todo 
    * @param {number} listOption - Option to determine which list to update
    */
    function updateLists(newToDoListTemp, id, listOption) 
    {
        // Find the index of the todo to delete in the temporary list
        const indexTemp = newToDoListTemp.findIndex((todo) => todo.id === id);

        // splice removes the todo from the temporary list
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
        let Lista = [];
        switch (priority) {
            case 0:
                Lista = ToDoListFilteredByState;
                break;
            case 1: case 2: case 3: case 4: case 5:
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
            if (searchValue.length > 0) 
            {
                List = ToDoListFilteredBySearchValue; 
            }
            else if(ToDoListOrderedAscDesc.length > 0) 
            {
                List = ToDoListOrderedAscDesc;
            }
            else{
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
        toDo,
        setToDo,
        createOrEdit,
        setCreateOrEdit,
        addToDo,
        updateToDo,
        completeToDo,
        deleteToDo,
        isEmpty,
        totalToDos,
        totalCompletedToDos,
        loading,
        error,
        sincronizeToDos,
        orderAscDesc,
        disabledOrderAscDesc
    };
}

export { useToDos };