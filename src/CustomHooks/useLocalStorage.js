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

  const [item, setItem] = React.useState(initialValue);
  const [itemTemp, setItemTemp] = React.useState(item);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState(false);

  React.useEffect(() => {
    setTimeout(() => {
      try {
        const localStorageItem = localStorage.getItem(itemName);

        let parsedItem;

        if (!localStorageItem) {
          localStorage.setItem(itemName, JSON.stringify(initialValue));
          parsedItem = initialValue;
        } else {
          parsedItem = JSON.parse(localStorageItem);
          setItem(parsedItem);
          setItemTemp(parsedItem);
        }
        setLoading(false);
        
      } catch (error) {
        setLoading(false);
        setError(true);
      }
    }, 3000);
  }, []);

  /**
   * Persists new value to localStorage and updates state
   * @param {T} newItem - New value to store
   */
  const saveItem = (newItem) => {
    localStorage.setItem(itemName, JSON.stringify(newItem));
    setItem(newItem);
  };

  return {
    item,
    saveItem,
    itemTemp,
    setItemTemp,
    loading,
    error
  };
}

export { useLocalStorage };
