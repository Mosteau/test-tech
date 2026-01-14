import { useMemo } from 'react';
import type { Task } from '../types';
import './Statistics.css';

interface StatisticsProps {
  tasks: Task[];
}

function Statistics({ tasks }: StatisticsProps) {
  const stats = useMemo(() => {
    const total = tasks.length;
    const todo = tasks.filter(t => t.status === 'todo').length;
    const inProgress = tasks.filter(t => t.status === 'in-progress').length;
    const done = tasks.filter(t => t.status === 'done').length;

    const highPriority = tasks.filter((t) => t.priority === 'high').length;
    const mediumPriority = tasks.filter((t) => t.priority === 'medium').length;
    const lowPriority = tasks.filter((t) => t.priority === 'low').length;

    return {
      total,
      todo,
      inProgress,
      done,
      highPriority,
      mediumPriority,
      lowPriority,
    };
  }, [tasks]);

  return (
    <div className="statistics">
      <h2>Statistiques</h2>

      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-value">{stats.total}</div>
          <div className="stat-label">Total</div>
        </div>

        <div className="stat-card todo">
          <div className="stat-value">{stats.todo}</div>
          <div className="stat-label">À faire</div>
        </div>

        <div className="stat-card in-progress">
          <div className="stat-value">{stats.inProgress}</div>
          <div className="stat-label">En cours</div>
        </div>

        <div className="stat-card done">
          <div className="stat-value">{stats.done}</div>
          <div className="stat-label">Terminées</div>
        </div>
      </div>

      <div className="priority-stats">
        <h3>Par priorité</h3>
        <div className="priority-bars">
          <div className="priority-bar">
            <span className="priority-label high">Haute</span>
            <div className="bar-container">

              <div
                className="bar high"
                style={{ width: `${(stats.highPriority / stats.total) * 100}%` }}
              />
            </div>
            <span className="priority-count">{stats.highPriority}</span>
          </div>

          <div className="priority-bar">
            <span className="priority-label medium">Moyenne</span>
            <div className="bar-container">
              <div
                className="bar medium"
                style={{ width: `${(stats.mediumPriority / stats.total) * 100}%` }}
              />
            </div>
            <span className="priority-count">{stats.mediumPriority}</span>
          </div>

          <div className="priority-bar">
            <span className="priority-label low">Basse</span>
            <div className="bar-container">
              <div
                className="bar low"
                style={{ width: `${(stats.lowPriority / stats.total) * 100}%` }}
              />
            </div>
            <span className="priority-count">{stats.lowPriority}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Statistics;
