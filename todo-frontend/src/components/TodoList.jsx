import { CheckCircle2 } from 'lucide-react';
import TodoItem from './TodoItem';

export default function TodoList({ todos, onUpdate, onDelete, isLoading = false }) {
  if (todos.length === 0) {
    return (
      <div className="card text-center py-12 animate-fade-in">
        <CheckCircle2 className="w-16 h-16 text-gray-300 mx-auto mb-4" />
        <h3 className="text-lg font-medium text-gray-500 mb-2">No todos yet</h3>
        <p className="text-gray-400">Create your first todo to get started!</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold text-gray-800">
          Your Todos ({todos.length})
        </h2>
      </div>
      
      <div className="space-y-4">
        {todos.map((todo) => (
          <TodoItem
            key={todo.id}
            todo={todo}
            onUpdate={onUpdate}
            onDelete={onDelete}
            isLoading={isLoading}
          />
        ))}
      </div>
    </div>
  );
}