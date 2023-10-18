import React from 'react';
import styles from "../styleModules/TaskContainer.module.css";
import AddTask from './AddTask';
import TaskItem from './TaskItem';
//This Component holds AddTask and TaskItem Components and passes them the data fetched through API.
export default function TaskContainer({todoData,setTodoData}) {
  return (
    <>

    <div className={styles.container}>
    <AddTask todoData={todoData} setTodoData={setTodoData}/>
    <TaskItem todoData={todoData} setTodoData={setTodoData} />
    </div>
    
    </>
  )
}
