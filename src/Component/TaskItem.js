import React, { useState} from 'react';
import styles from "../styleModules/TaskItem.module.css";

export default function TaskItem({ todoData,setTodoData }) {
  const [checkboxes, setCheckboxes] = useState(Array(todoData.length).fill(true));//this state makes an array with size of todoData.length and fill it with "true"
  const[showEditBox,setShowEditBox]=useState(Array(todoData.length).fill(false));
  const[editValue,setEditValue]=useState('');

//this function helps in conditional Rendering of  editbox
  function handleShowEdit(index){
    const updatededitboxes=[...showEditBox];
    updatededitboxes[index]=!updatededitboxes[index];
    setShowEditBox(updatededitboxes);

    
  }
//this function below changes the checkBoxes to true,which signifies task Completed
  function handleCheckBox(index) {
    const updatedCheckboxes = [...checkboxes];
    updatedCheckboxes[index] = true;
    setCheckboxes(updatedCheckboxes);

    //setting the completed to false
    let updatedData=[...todoData];
    updatedData[index].completed=true;
    setTodoData(updatedData);

  }
// this Arraow-function Deletes the task at the Index given,and also Performs DELETE method of API  
  const handleDelete=async(index)=>{
    const idToDelete=todoData[index].id;
    try {
      const res=await fetch(`https://jsonplaceholder.typicode.com/todos/${idToDelete}`,{
        method:'DELETE',
      });
      if(res.ok){//updatingTODO
        let updatedData=[...todoData];
        updatedData.splice(index,1);
        setTodoData(updatedData);
      }else{
        console.log("failed to delete item");
      }
      
    } catch (error) {
      console.log(error);
    }
  }

  //This function helps us in Editing the value of the task at the given Index,Also uses 'PATCH' Method of API.
  async function handleEdit(index){
      //editValue has the edited text
      const idToEdit=todoData[index].id;
     
      try {
        const res=await fetch(`https://jsonplaceholder.typicode.com/todos/${idToEdit}`, {
      method: 'PATCH',
      body: JSON.stringify({
        title: editValue,
      }),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    });

    if(res.ok){//updatingTODO
      let updatedData=[...todoData];
      updatedData[index].title=editValue;
      setTodoData(updatedData);
      handleShowEdit(index);
    }else{
      console.log("failed to Edit/Update Item.");
    }
      } catch (error) {
        console.log(error);
      }  
  }

  return (
    <div className={styles.mainContainer}>
      {todoData.map((todo, index) => (
        <div key={index}>
          <div  className={styles.itemContainer}>
            <div
              className={styles.checkboxContainer}
              onClick={() =>{handleCheckBox(index)}}
            >
              {/* Conditional Rendering->Default blank checkbox icon changes to Checked box on clicking */}
              {(checkboxes[index] || todo.completed) ? (
                <img
                  src="https://cdn0.iconfinder.com/data/icons/social-messaging-ui-color-shapes-3/3/31-64.png"
                  className={styles.checkbox}
                  alt="checkbox"
                />
              ) : (
                <img
                  src="https://cdn3.iconfinder.com/data/icons/remixicon-system/24/checkbox-blank-circle-line-64.png"
                  className={styles.checkbox}
                  alt="checkbox"
                />
              )}
            </div>
            {/* Conditional Rendering->When checkbox is Clciked the content style changes */}
            {
              (checkboxes[index]||todo.completed)?(
                <p style={{textDecoration:"line-through"}}
            >{todo.title}</p>
              ):(
                <p style={{textDecoration:"none"}}
            >{todo.title}</p>
              )
            }
            {/* Edit Functionalities */}
            <img
              src="https://cdn2.iconfinder.com/data/icons/boxicons-solid-vol-2/24/bxs-edit-64.png"
              className={styles.edit}
              alt="edit"
              onClick={()=>todo.completed?window.alert("Cannot Edit, as the Task is Already Completed!"):handleShowEdit(index)}
            />
            {/* Delete Functionalities */}
            <img
              src="https://cdn4.iconfinder.com/data/icons/essentials-74/24/039_-_Cross-64.png"
              className={styles.delete}
              alt="delete"
              onClick={()=>handleDelete(index)}
            />      
          </div>
            {/* The Edit box section which renders when user wants to edit a taak */}
        {showEditBox[index] && (
            <div className={styles.editbox}>
              <input type="text"
                     value={editValue}
                     onChange={(e)=>setEditValue(e.target.value)}
              />
              <button onClick={()=>handleEdit(index)}>Edit</button>
              </div>
          )}
        </div>
      ))}
    </div>
  );
}
