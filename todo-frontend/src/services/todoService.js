import axios from 'axios';

const API_BASE_URL = 'http://localhost:8000';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add request interceptor for error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('API Error:', error.response?.data || error.message);
    return Promise.reject(error);
  }
);

export const todoService = {
  // Get all todos
  async getAllTodos() {
    try {
      const response = await api.get('/api/routes/todos/');
      return response.data.todos || [];
    } catch (error) {
      throw new Error('Failed to fetch todos');
    }
  },

  // Create a new todo
  async createTodo(todoData) {
    try {
      const response = await api.post('/api/routes/create_todo/', todoData);
      return response.data.todo;
    } catch (error) {
      throw new Error('Failed to create todo');
    }
  },

  // Update a todo
  async updateTodo(todoId, updateData) {
    try {
      const response = await api.put(`/api/routes/modify_todo/${todoId}`, updateData);
      return response.data;
    } catch (error) {
      throw new Error('Failed to update todo');
    }
  },

  // Delete a todo
  async deleteTodo(todoId) {
    try {
      const response = await api.delete(`/api/routes/delete_todo/${todoId}`);
      return response.data;
    } catch (error) {
      throw new Error('Failed to delete todo');
    }
  },
};