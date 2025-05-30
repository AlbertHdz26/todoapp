/**
 * @fileoverview Custom hook for managing state with localStorage persistence
 * @author [Alberto Hernandez]
 * @version 1.0.0
 */

import React from "react";

/**
 * Custom hook that manages state with localStorage persistence
 * @template T
 * @param {string} itemName - Key to use in localStorage
 * @param {T} initialValue - Initial value if no data exists in localStorage
 * @returns {Object} Storage operations and state
 * @returns {T} returns.item - Current stored value
 * @returns {function(T): void} returns.saveItem - Function to save new value
 * @returns {T} returns.itemTemp - Temporary stored value for filtering/sorting
 * @returns {function(T): void} returns.setItemTemp - Function to update temporary value
 * @returns {boolean} returns.loading - Loading state flag
 * @returns {boolean} returns.error - Error state flag
 */
function useLocalStorage(itemName, initialValue) {
   /**
   * State to manage the item stored in localStorage
   * @type {T}
   */
	const [item, setItem] = React.useState(initialValue);
	
	/**
   * State to manage the temporary item for filtering/sorting
   * @type {T}
   */
	const [itemFiltered, setItemFiltered] = React.useState(item);
	
	/**
   * State to manage loading state
   * @type {boolean}
   */
	const [loading, setLoading] = React.useState(true);
	
	/**
   * State to manage error state
   * @type {boolean}
   */
	const [error, setError] = React.useState(false);

	/**
   * State to manage synchronization state	
   * @type {boolean}
   */
	const [sincronizedItem, setSincronizedItem] = React.useState(true);

	/**
   * Effect to load item from localStorage on component mount
   * Sets loading state to false after 3 seconds
   */
	React.useEffect(() => {
		setTimeout(() => {
			try {
				// Get the item from localStorage
				const localStorageItem = localStorage.getItem(itemName);

				let parsedItem;

				// Check if the item doesn't exists in localStorage
				if (!localStorageItem) 
				{
					// If it doesn't exist, set the initial value
					// and store it in localStorage
					localStorage.setItem(itemName, JSON.stringify(initialValue));
					parsedItem = initialValue;
				} 
				// If the item exists, parse it
				else 
				{
					// Parse the item from localStorage
					// and set it to the states
					parsedItem = JSON.parse(localStorageItem);
					setItem(parsedItem);
					setItemFiltered(parsedItem);
				}
				setLoading(false);
				setSincronizedItem(true);
				
			} catch (error) {
				setLoading(false);
				setError(true);
			}
		}, 3000);
		
		// se pasa como argumento sincronizedItem para que se ejecute el useEffect cuando este estado cambie
		// si se coloca vacio [] solo se ejecuta una vez al montar el componente
	}, [sincronizedItem]);

	/**
	 * Persists new value to localStorage and updates state
	 * @param {T} newItem - New value to store
	 */
	const saveItem = (newItem) => {
		localStorage.setItem(itemName, JSON.stringify(newItem));
		setItem(newItem);
	};

	const sincronizeItem = () => {
		//se cambia el estado loading a true para mostrar el loading
		setLoading(true);

		//se cambia el estado de sincronización para que se vuelva a ejecutar el useEffect y sincronizar el localStorage
		setSincronizedItem(false);
	}	

	return {
		item,
		saveItem,
		itemFiltered,
		setItemFiltered,
		loading,
		error,
		sincronizeItem
	};
}

export { useLocalStorage };
