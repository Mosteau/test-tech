import { useCallback, useEffect, useState } from 'react';
import { api } from './api';
import type { Task } from './types';

// TODO AMÉLIORATION: Remplacer par React Query ou SWR
// - Gestion automatique du cache, revalidation, et synchronisation
// - Mutations optimistes pour une meilleure UX
// - Gestion intégrée du loading et des erreurs
// - Exemple: const { data, isLoading, error, mutate } = useSWR('/api/tasks', fetcher)
// Problème : hook qui fait trop de choses
// Problème : pas de cache, refetch à chaque utilisation
export function useTasks() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchTasks = useCallback(async () => {
    try {
      setLoading(true);
      const data = await api.getTasks();
      setTasks(data);
      setError(null);
    } catch (err) {
      setError('Failed to fetch tasks');
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  const createTask = async (title: string, description: string) => {
    try {
      const newTask = await api.createTask({ title, description });
      setTasks([...tasks, newTask]);
    } catch (err) {
      setError('Failed to create task');
      console.error(err);
    }
  };

  const updateTask = async (id: string, updates: Partial<Task>) => {
    try {
      const updatedTask = await api.updateTask(id, updates);
      setTasks(tasks.map((task) => (task.id === id ? updatedTask : task)));
    } catch (err) {
      setError('Failed to update task');
      console.error(err);
    }
  };

  const deleteTask = async (id: string) => {
    try {
      await api.deleteTask(id);
      setTasks(tasks.filter((task) => task.id !== id));
    } catch (err) {
      setError('Failed to delete task');
      console.error(err);
    }
  };

  return {
    tasks,
    loading,
    error,
    createTask,
    updateTask,
    deleteTask,
    refetch: fetchTasks,
  };
}
