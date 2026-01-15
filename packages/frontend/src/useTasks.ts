import { useCallback, useEffect, useState } from 'react';
import { api } from './api';
import type { Task } from './types';
import { handleApiError, showSuccess } from './utils/errorHandler';

// Utilise le gestionnaire d'erreurs centralisé avec toasts
export function useTasks() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);

  // récupère toutes les tâches depuis l'API
  const fetchTasks = useCallback(async () => {
    try {
      setLoading(true);
      const data = await api.getTasks();
      setTasks(data);
    } catch (err) {
      // gestion d'erreur centralisée - affiche un toast
      handleApiError(err, 'récupérer les tâches');
    } finally {
      setLoading(false);
    }
  }, []);

  // charge les tâches au montage du composant
  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  // crée une nouvelle tâche
  const createTask = async (title: string, description: string) => {
    try {
      const newTask = await api.createTask({ title, description });
      setTasks([...tasks, newTask]);
      // affiche un toast de succès
      showSuccess('Tâche créée avec succès !');
    } catch (err) {
      handleApiError(err, 'créer la tâche');
    }
  };

  // met à jour une tâche existante
  const updateTask = async (id: string, updates: Partial<Task>) => {
    try {
      const updatedTask = await api.updateTask(id, updates);
      setTasks(tasks.map((task) => (task.id === id ? updatedTask : task)));
      // affiche un toast pour la mise à jour
      showSuccess('Tâche mise à jour !');
    } catch (err) {
      handleApiError(err, 'mettre à jour la tâche');
    }
  };

  // supprime une tâche
  const deleteTask = async (id: string) => {
    try {
      await api.deleteTask(id);
      setTasks(tasks.filter((task) => task.id !== id));
      //affiche un toast de suppression
      showSuccess('Tâche supprimée !');
    } catch (err) {
      handleApiError(err, 'supprimer la tâche');
    }
  };

  return {
    tasks,
    loading,
    createTask,
    updateTask,
    deleteTask,
    refetch: fetchTasks,
  };
}
