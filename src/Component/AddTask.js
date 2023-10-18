import React, { useState } from 'react';
import styles from "../styleModules/AddTask.module.css";
//This Component will focus on making A typeBox, In which the user gets
//an option to app a task through a button.

export default function AddTask({todoData,setTodoData}) {
  const[task,setTask]=useState('');

  //Below function is  making a POST method call
const handleAddItem=async()=>{
  try {
  const res=await fetch('https://jsonplaceholder.typicode.com/todos', {
  method: 'POST',
  body: JSON.stringify({
    title: task,
    completed: false,
    userId: 1,
  }),
  headers: {
    'Content-type': 'application/json; charset=UTF-8',
  },
});
  const data=await res.json();

  //Here we are Updating the State with new value
  let updatedData=[data,...todoData];
  setTodoData(updatedData);
  console.log(todoData);
  setTask('');
  } catch (error) {
    console.log(error);
  }
}
  return (
    <div className={styles.itemContainer}>
      <input type="text"
       placeholder='Enter the Task...'
       value={task}
       onChange={(e)=>setTask(e.target.value)}/>
      <button onClick={handleAddItem}>AddTask</button>
    </div>
  )
}
