"use client";
import { useEffect, useState } from "react";
import Task from "./TodoList/Task";

export default function Home() {
  const [newTodo, setNewTodo] = useState("");
  const [todoList, setTodoList] = useState([]);

  useEffect(() =>{
    // save todos to local storage
   const todos =  JSON.parse(localStorage.getItem("todoList"));
   setTodoList(todos);
  }, [])

  const handleChange = (e)=>{
    setNewTodo(e.target.value);
  }

  // add todo
 const handleSumbit = (e)=>{
    e.preventDefault();
    if(!newTodo.length ){
      alert("Please Enter Task")
      return;
    }
    const newTodos = [...todoList, {id:Date.now(), title:newTodo, editable:false}]
    setTodoList(newTodos);
    handleSaveTodos(newTodos);
    setNewTodo("");
  }

// delete task
const handleDeleteTask = (id) =>{
  // filter todo by id
  const updatedTodos =todoList.filter(todo => todo.id != id);
  setTodoList(updatedTodos);
  handleSaveTodos(updatedTodos);
}

// Edit task
const handleEditTask = (id) =>{
  const updatedTodos =todoList.filter(todo => {
    if(todo.id == id){
     return todo.editable = true;
    }
    return todo
  });
  setTodoList(updatedTodos);
  handleSaveTodos(updatedTodos);
}
// handle save todos into localstorage
const handleSaveTodos = (todos)=>{
   // save updated todos
   localStorage.setItem("todoList", JSON.stringify(todos));
}

  return (
    <main className='w-full h-screen flex items-center justify-center p-3'>
      <div className='max-w-[650px] w-full mx-auto bg-white rounded p-5'>
          <h3 className='text-black text-3xl font-medium text-center mb-10'>Task Manager</h3>
          <div className="input-form">
            <form onSubmit={handleSumbit}  className='flex items-center justify-between'>
              <input onChange={handleChange} className='bg-[#EDEEF0] w-[62%] md:w-[78%] focus:outline-none w-full py-2 px-4 rounded-lg mr-3' type="text" placeholder='Task Name' value={newTodo}  />
              <button className='bg-[#EDEEF0]  py-2 px-4 rounded-lg mr-3'>Add Task</button>
            </form>
          </div>
          <div className="todo-list mt-5">
            {
            todoList.length > 0 ? 
            todoList.map(todo =>  <Task todo={todo} handleDeleteTask={handleDeleteTask} handleEditTask={handleEditTask} handleSaveTodos={handleSaveTodos}/>)
            :
            <p className="text-center text-[#ddd] font-normal">There are no tasks available!</p>
            }
          
          </div>
      </div>

    </main>
  )
}
