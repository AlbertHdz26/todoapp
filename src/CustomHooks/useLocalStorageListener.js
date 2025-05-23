import React from "react";

function useLocalStorageListener(sincronizeToDos) {

    const [storageChange, setStorageChange] = React.useState(false);

    // Con window.addEventListener escuchamos cambios que se hagan en otra pestaña del navegador donde se tenga abierta la App
    // En este caso cambios que se hagan en el localStorage enviando como primer argumento 'storage' 
    // y como segundo argumento pasamos una función que se ejecutará cuando haya un cambio en el localStorage y recibira el cambio en la variable change
    // verificamos si el key del cambio fué en 'TODOS_V1' y si es así, actualizamos el estado
    window.addEventListener('storage', (change) => {
        if (change.key === 'TODOS_V1') {
            console.log('Hubo cambios en TODOS_V1');
            setStorageChange(true);
        }
    });

    const toggleShow = () => {
        // sincronizamos los todos y cambiamos el estado de storageChange a false para que no se vuelva a mostrar el alert al cerrar el alert
        sincronizeToDos();
        setStorageChange(false);
    }

    return {
        storageChange,
        toggleShow
    }

}

export { useLocalStorageListener };