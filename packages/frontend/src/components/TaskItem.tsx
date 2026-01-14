import type { Task } from '../types';
import './TaskItem.css';

interface TaskItemProps {
  task: Task;
  onUpdate: (id: string, updates: Partial<Task>) => void;
  onDelete: (id: string) => void;
}

function TaskItem({ task, onUpdate, onDelete }: TaskItemProps) {
  const handleStatusChange = () => {
    const statusFlow: Record<Task['status'], Task['status']> = {
      todo: 'in-progress',
      'in-progress': 'done',
      done: 'todo',
    };
    onUpdate(task.id, { status: statusFlow[task.status] });
  };

  const handlePriorityChange = () => {
    const priorityFlow: Record<Task['priority'], Task['priority']> = {
      low: 'medium',
      medium: 'high',
      high: 'low',
    };
    onUpdate(task.id, { priority: priorityFlow[task.priority] });
  };

  const getPriorityColor = () => {
    const colors = { high: '#e53e3e', medium: '#dd6b20', low: '#38a169' };
    return colors[task.priority];
  };

  const getStatusLabel = () => {
    const labels = { todo: 'À faire', 'in-progress': 'En cours', done: 'Terminé' };
    return labels[task.status];
  };

  return (
    <div className={`task-item priority-${task.priority} status-${task.status}`}>
      <div className="task-header">
        <h3>{task.title}</h3>
        <button type="button" className="delete-btn" onClick={() => onDelete(task.id)}>
          ✕
        </button>
      </div>

      <p className="task-description">{task.description}</p>

      <div className="task-meta">
        <span className="priority-badge" style={{ backgroundColor: getPriorityColor() }}>
          {task.priority}
        </span>
        {task.tags && task.tags.length > 0 && (
          <div className="tags">
            {task.tags.map((tag) => (
              <span key={tag} className="tag">
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>

      <div className="task-actions">
        <button type="button" className="status-btn" onClick={handleStatusChange}>
          {getStatusLabel()}
        </button>
        <button type="button" className="priority-btn" onClick={handlePriorityChange}>
          Priorité
        </button>
      </div>

      <div className="task-footer">
        <small>Créé: {new Date(task.createdAt).toLocaleDateString('fr-FR')}</small>
      </div>
    </div>
  );
}

export default TaskItem;
