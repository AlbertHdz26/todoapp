import { ToDoContextProvider } from '../ToDoContext';
import { AppUI } from './AppUI'

 
function App() {
  return (
    <ToDoContextProvider>
      {console.log('>>> Init App  - ToDoContextProvider <<<')}
      <AppUI/>
      {console.log('>>> End App - ToDoContextProvider <<<')}
    </ToDoContextProvider>
  );
}

export default App;
