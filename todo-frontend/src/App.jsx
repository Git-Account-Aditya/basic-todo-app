import { CheckSquare } from 'lucide-react';
import TodoForm from './components/TodoForm';
import TodoList from './components/TodoList';
import LoadingSpinner from './components/LoadingSpinner';
import ErrorMessage from './components/ErrorMessage';
import { useTodos } from './hooks/useTodos';

export default function App() {
  const {
    todos,
    isLoading,
    error,
    actionLoading,
    createTodo,
    updateTodo,
    deleteTodo,
    refetch,
  } = useTodos();

  const handleCreateTodo = async (todoData) => {
    try {
      await createTodo(todoData);
    } catch (err) {
      // Error is handled in the hook
    }
  };

  const handleUpdateTodo = async (todoId, updateData) => {
    try {
      await updateTodo(todoId, updateData);
    } catch (err) {
      // Error is handled in the hook
    }
  };

  const handleDeleteTodo = async (todoId) => {
    try {
      await deleteTodo(todoId);
    } catch (err) {
      // Error is handled in the hook
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <CheckSquare className="w-8 h-8 text-blue-600" />
            <h1 className="text-3xl font-bold text-gray-900">Todo App</h1>
          </div>
          <p className="text-gray-600 max-w-md mx-auto">
            Stay organized and productive with your personal todo manager
          </p>
        </div>

        {/* Main Content */}
        <div className="grid gap-8 lg:grid-cols-2">
          {/* Todo Form */}
          <div>
            <TodoForm onSubmit={handleCreateTodo} isLoading={actionLoading} />
          </div>

          {/* Todo List */}
          <div>
            {isLoading ? (
              <LoadingSpinner message="Loading your todos..." />
            ) : error ? (
              <ErrorMessage message={error} onRetry={refetch} />
            ) : (
              <TodoList
                todos={todos}
                onUpdate={handleUpdateTodo}
                onDelete={handleDeleteTodo}
                isLoading={actionLoading}
              />
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-12 pt-8 border-t border-gray-200">
          <p className="text-gray-500 text-sm">
            Built with React, Vite, and Tailwind CSS
          </p>
        </div>
      </div>
    </div>
  );
}