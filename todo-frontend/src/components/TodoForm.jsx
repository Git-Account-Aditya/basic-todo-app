import { useState } from 'react';
import { Plus, Loader2 } from 'lucide-react';

export default function TodoForm({ onSubmit, isLoading = false }) {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.title.trim()) return;

    await onSubmit(formData);
    setFormData({ title: '', description: '' });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div className="card animate-fade-in">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">Add New Todo</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
            Title *
          </label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="Enter todo title..."
            className="input-field"
            required
            disabled={isLoading}
          />
        </div>
        
        <div>
          <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
            Description
          </label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Enter todo description..."
            rows={3}
            className="input-field resize-none"
            disabled={isLoading}
          />
        </div>
        
        <button
          type="submit"
          disabled={!formData.title.trim() || isLoading}
          className="btn-primary w-full flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoading ? (
            <Loader2 className="w-4 h-4 animate-spin" />
          ) : (
            <Plus className="w-4 h-4" />
          )}
          {isLoading ? 'Adding...' : 'Add Todo'}
        </button>
      </form>
    </div>
  );
}