"use client";

import { useEffect, useRef, useState } from "react";


const Task = ({todo, handleDeleteTask, handleEditTask, handleSaveTodos})=>{
    const paragraphRef = useRef();
    const [todos, setTodos] = useState([]);
    const [updateTodo, setUpdateTodo] =  useState("");
    useEffect(() =>{
        // save todos to local storage
       const todosItems =  JSON.parse(localStorage.getItem("todoList"));
       setTodos(todosItems);
      }, [updateTodo])

    const handleFocus = (id) => {
        handleEditTask(id);
        paragraphRef.current.focus();
    };
    const handleGetValue = (e, id)=>{
        if (e.key === 'Enter') {
            paragraphRef.current.blur();
        }
        const inputValue = e.target.innerText;
        if(inputValue.length > 0) {
            const udatedTodos =  todos.map((todo) =>{
                if(todo.id == id){
                    return {...todo, title:inputValue, editable:false};
                }
                return todo;
           });
           handleSaveTodos(udatedTodos);
        }
    }


    return(
        <div className="task flex items-center justify-between px-2 py-1 rounded-lg mb-3">
        <input type="checkbox" />
        <div className="task-text flex-1 ms-3 me-5">
          <p  onBlur={(e)=> handleGetValue(e, todo.id)} onKeyDown={(e)=> handleGetValue(e, todo.id)} onk className="focus:outline-green-500 p-1" ref={paragraphRef} tabIndex="0" contentEditable={true}>{todo.title}</p>
        </div>
        <div className="flex items-center">
          <button onClick={()=> handleFocus(todo.id)} className="py-1 px-2 rounded-sm bg-green-600 text-white">Edit</button>
          <button onClick={()=> handleDeleteTask(todo.id)} className="py-1 px-2 rounded-sm bg-red-600 text-white ms-3">Delete</button>
        </div>
      </div>
    )
}

export default Task;