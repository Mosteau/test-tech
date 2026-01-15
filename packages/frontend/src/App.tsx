import { useState } from 'react';
import { Toaster } from 'react-hot-toast';
import Statistics from './components/Statistics';
import TaskForm from './components/TaskForm';
import TaskList from './components/TaskList';
import { useTasks } from './useTasks';
import './App.css';

function App() {
  // configuration du toaster pour afficher les erreurs à l'utilisateur
  const { tasks, loading, createTask, updateTask, deleteTask } = useTasks();
  const [filter, setFilter] = useState<'all' | 'todo' | 'in-progress' | 'done'>('all');

  const filteredTasks = filter === 'all' ? tasks : tasks.filter((task) => task.status === filter);

  const handleCreateTask = async (title: string, description: string) => {
    await createTask(title, description);
  };

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  return (
    <div className="app">
      {/* Composant Toaster pour afficher les notifications */}
      {/* Position top-right, durée par défaut 4s */}
      <Toaster 
        position="top-right"
        toastOptions={{
          duration: 4000,
          style: {
            background: '#363636',
            color: '#fff',
            fontSize: '14px',
          },
          success: {
            duration: 3000,
            iconTheme: {
              primary: '#4ade80',
              secondary: '#fff',
            },
          },
          error: {
            duration: 5000,
            iconTheme: {
              primary: '#ef4444',
              secondary: '#fff',
            },
          },
        }}
      />
      
      <header className="app-header">
        <h1>Task Manager</h1>
        <p>Gérez vos tâches efficacement</p>
      </header>

      <main className="app-main">
        <div className="content">
          <section className="form-section">
            <TaskForm onSubmit={handleCreateTask} />
          </section>

          <section className="stats-section">
            <Statistics tasks={tasks} />
          </section>

          <section className="filter-section">
            <div className="filter-buttons">
              <button
                type="button"
                className={filter === 'all' ? 'active' : ''}
                onClick={() => setFilter('all')}
              >
                Toutes
              </button>
              <button
                type="button"
                className={filter === 'todo' ? 'active' : ''}
                onClick={() => setFilter('todo')}
              >
                À faire
              </button>
              <button
                type="button"
                className={filter === 'in-progress' ? 'active' : ''}
                onClick={() => setFilter('in-progress')}
              >
                En cours
              </button>
              <button
                type="button"
                className={filter === 'done' ? 'active' : ''}
                onClick={() => setFilter('done')}
              >
                Terminées
              </button>
            </div>
          </section>

          <section className="tasks-section">
            <TaskList tasks={filteredTasks} onUpdate={updateTask} onDelete={deleteTask} />
          </section>
        </div>
      </main>
    </div>
  );
}

export default App;
