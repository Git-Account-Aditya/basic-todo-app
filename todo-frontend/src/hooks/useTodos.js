import { useState, useEffect, useCallback } from 'react';
import { todoService } from '../services/todoService';

export function useTodos() {
  const [todos, setTodos] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [actionLoading, setActionLoading] = useState(false);

  const fetchTodos = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);
      const todosData = await todoService.getAllTodos();
      setTodos(todosData);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const createTodo = async (todoData) => {
    try {
      setActionLoading(true);
      setError(null);
      const newTodo = await todoService.createTodo(todoData);
      setTodos(prev => [...prev, newTodo]);
      return newTodo;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setActionLoading(false);
    }
  };

  const updateTodo = async (todoId, updateData) => {
    try {
      setActionLoading(true);
      setError(null);
      await todoService.updateTodo(todoId, updateData);
      
      // Update the todo in the local state
      setTodos(prev => prev.map(todo => 
        todo.id === todoId 
          ? { ...todo, ...updateData }
          : todo
      ));
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setActionLoading(false);
    }
  };

  const deleteTodo = async (todoId) => {
    try {
      setActionLoading(true);
      setError(null);
      await todoService.deleteTodo(todoId);
      setTodos(prev => prev.filter(todo => todo.id !== todoId));
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setActionLoading(false);
    }
  };

  useEffect(() => {
    fetchTodos();
  }, [fetchTodos]);

  return {
    todos,
    isLoading,
    error,
    actionLoading,
    createTodo,
    updateTodo,
    deleteTodo,
    refetch: fetchTodos,
  };
}