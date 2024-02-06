import { useEffect, useRef, useState } from "react";
import { MdDone, MdDelete, MdClose } from "react-icons/md";
import { FaRegEdit } from "react-icons/fa";

import "./todo.css";
function Todo() {
  const [todo, setTodo] = useState("");
  const [todos, setTodos] = useState([]);
  const [editId, setEditId] = useState(0)

  let completedTodo = 0;

  const addTodo = () => {
    setTodos([...todos, { list: todo, id: Date.now(), status: false }]);
    console.log(todos);


    if(editId){
      const editTodo = todos.find((todo) => todo.id === editId )
      const updateTodo = todos.map((to) => to.id === editTodo.id
    ? (to = {id : to.id , list : todo})
    : (to = {id : to.id , list : to.list}))
    setTodos(updateTodo)
    setEditId(0)
    setTodo('')
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setTodo("");
  };

  const inputRef = useRef("null");

  useEffect(() => {
    inputRef.current.focus();
  });
  const onDelete = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };
  const onCompleted = (id) => {
    let complete = todos.map((list) => {
      if (list.id === id) {
        return { ...list, status: !list.status };
      }
      return list;
    });
    setTodos(complete);
  };


  const editHandler = (id) => {
    let editTodo = todos.find((list) => list.id === id)
    setTodo(editTodo.list)
    setEditId(editTodo.id)
  }

  return (
    <div className="Todo-container">
      <h1>Todo</h1>
      <form className="todo-form" onSubmit={handleSubmit}>
        <input
          type="text"
          ref={inputRef}
          placeholder="Add Todo"
          value={todo}
          onChange={(e) => setTodo(e.target.value)}
        />
        <button
          onClick={addTodo}
          //disabled={todo.length === 0}
          style={todo.length === 0 ? { display: "none" } : { display: "block" }}>
          {editId ? "Edit" : "Add Todo"}
        </button>
      </form>
      <div className="todo-list">
        <ul className="todo-items">
          {todos.map((todo) => (
            <li className="todo-item" key={todo.id}>
              <div className={todo.status && "completed"}>{todo.list}</div>
              <span>
                {todo.status ? (
                  <MdClose
                    className="todo-icon inComplete"
                    onClick={() => onCompleted(todo.id)}
                  />
                ) : (
                  <MdDone
                    className="todo-icon done"
                    onClick={() => onCompleted(todo.id)}
                  />
                )}
                <FaRegEdit className="todo-icon edit" 
                onClick={()=>editHandler(todo.id)}/>


                <MdDelete
                  className="todo-icon delete"
                  onClick={() => onDelete(todo.id)}
                />
              </span>
            </li>
          ))}
        </ul>


        {todos.length !== 0 && (
          <div className="status">
            {todos.map((todo) => {
              todo.status && completedTodo++;
            })}
            <p>Incompleted Todos: {todos.length - completedTodo}</p>
            <p>Completed Todos: {completedTodo}</p>
            <p>Total Todos : {todos.length}</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Todo;
