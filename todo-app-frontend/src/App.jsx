import { useState, useEffect } from "react";
import { fetchTodos, addTodo , updateTodo, deleteTodo } from "./services/todoServices";
import "./index.css"

function App() {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState("");

  useEffect(() => {
    const getTodos = async () => {
      try {
        const data = await fetchTodos();
        setTodos(data.map(todo => ({ ...todo, isCompleted: todo.isCompleted || false }))); // Default false if undefined
      } catch (error) {
        console.error("Error fetching todos:", error);
      }
    };
    getTodos();
  }, []);

  const handleAddTodo = async (e) => {
    e.preventDefault();
    if (!newTodo.trim()) return; // Prevent empty submission


    try {
      const addedTodo = await addTodo(newTodo);
      if (addedTodo) {
        setTodos((prevTodos) => [...prevTodos, addedTodo]); // Update the list
        setNewTodo(""); // Clear the input
      }
    } catch (error) {
      console.error("Error adding todo:", error);
    }
  };


  const handleToggleCompletion = async (id, isCompleted) => {
    try {
      const updatedTodo = await updateTodo(id, { isCompleted: !isCompleted });
      if (updatedTodo) {
        setTodos((prevTodos) =>
          prevTodos.map((todo) =>
            todo._id === id ? { ...todo, isCompleted: updatedTodo.isCompleted } : todo
          )
        );
      }
    } catch (error) {
      console.error('Error toggling todo completion:', error);
    }
  };

  const handleDeleteTodo = async (id) => {
    const deletedTodo = await deleteTodo(id);
    if (deletedTodo) {
      setTodos((prevTodos) => prevTodos.filter((todo) => todo._id !== id));
    }
  };
  

  











  return (
    <div className="min-h-screen p-5 bg-gray-100">
      <h1 className="text-3xl font-bold text-center mb-6">To-Do List</h1>
      <div className="max-w-xl mx-auto bg-white p-4 rounded shadow">
        <form onSubmit={handleAddTodo} className="mb-4 flex space-x-3">
          <input
            type="text"
            value={newTodo}
            onChange={(e) => setNewTodo(e.target.value)}
            placeholder="Add a new task..."
            className="flex-1 p-2 border rounded"
          />
          <button
            type="submit"
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Add
          </button>
        </form>
        {todos.length > 0 ? (
          <ul className="space-y-3">
            {todos.map((todo) => (
              <li
                key={todo._id}
                className="flex justify-between items-center p-3 rounded bg-gray-100"
              >
                <span
                  onClick={() => handleToggleCompletion(todo._id, todo.isCompleted)}
                  className={`cursor-pointer ${
                    todo.isCompleted ? 'line-through text-gray-400' : ''
                  }`}
                >
                  {todo.title}
                </span>
                <button
                  onClick={() => handleDeleteTodo(todo._id)}
                  className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                >
                  Delete
                </button>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-center text-gray-500">No To-Do items found.</p>
        )}
      </div>
    </div>
  );
}
export default App;
