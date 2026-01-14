import { useState } from 'react';
import './TaskForm.css';

interface TaskFormProps {
  onSubmit: (title: string, description: string) => void;
}

function TaskForm({ onSubmit }: TaskFormProps) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Problème : validation basique
    if (!title.trim()) {
      alert('Le titre est requis');
      return;
    }

    onSubmit(title, description);
    setTitle('');
    setDescription('');
  };

  return (
    <form className="task-form" onSubmit={handleSubmit}>
      <h2>Nouvelle tâche</h2>
      <div className="form-group">
        <label htmlFor="title">Titre</label>
        <input
          id="title"
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Entrez le titre de la tâche"
        />
      </div>
      <div className="form-group">
        <label htmlFor="description">Description</label>
        <textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Entrez la description"
          rows={3}
        />
      </div>
      <button type="submit" className="submit-btn">
        Créer la tâche
      </button>
    </form>
  );
}

export default TaskForm;
