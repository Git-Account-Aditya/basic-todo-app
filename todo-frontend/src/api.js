import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:8000", // your FastAPI server URL
});

// Get all todos
export const getTodos = () => API.get("api/routes/todos/");

// Create todo
export const createTodo = (data) => API.post("api/routes/create_todo/", data);

// Modify todo
export const modifyTodo = (id, data) => API.put(`api/routes/modify_todo/${id}`, data);

// Delete todo
export const deleteTodo = (id) => API.delete(`api/routes/delete_todo/${id}`);
