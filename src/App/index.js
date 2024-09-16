import { ToDoContextProvider } from '../ToDoContext';
import { AppUI } from './AppUI'

 
function App() {
  return (
    <ToDoContextProvider>
      <AppUI/>
    </ToDoContextProvider>
  );
}

export default App;
