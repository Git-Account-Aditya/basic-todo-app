import { deleteTodo } from "../api";

export default function TodoItem({ todo, onDelete }) {
  const handleDelete = async () => {
    await deleteTodo(todo.id);
    onDelete(todo.id);
  };

  return (
    <li>
      <strong>{todo.title}</strong> - {todo.description}
      <button onClick={handleDelete}>Delete</button>
    </li>
  );
}
