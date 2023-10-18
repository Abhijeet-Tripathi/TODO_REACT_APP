import { useEffect, useState } from 'react';
import './App.css';
import TaskContainer from './Component/TaskContainer';

function App() {
  const [todoData,setTodoData]=useState([]);//This state will store the array data fetched through API get call

  useEffect(() => {
    async function fetchData() {
      //using try catch to handle the errors
      try {
        const response = await fetch("https://jsonplaceholder.typicode.com/todos");
        if (response.ok) {
          const data = await response.json();
          const updatedData = [...data]; // Create a new array with the updated data
          setTodoData(updatedData); // Update the state with the new array
        } else {
          console.error("Failed to fetch data");
        }
      } catch (error) {
        console.error("Error:", error);
      }
    }

    fetchData();
  }, []);

  return (
    <>

      <h1><u>TODO-APP</u></h1>
      <TaskContainer todoData={todoData} setTodoData={setTodoData}/>
      
    </>
  );
}

export default App;
