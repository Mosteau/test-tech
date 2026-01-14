import type { CreateTaskDto, Statistics, Task } from './types';

const API_BASE_URL = '/api';

export const api = {
  async getTasks(): Promise<Task[]> {
    const response = await fetch(`${API_BASE_URL}/tasks`);
    return response.json();
  },

  async getTasksByStatus(status: string): Promise<Task[]> {
    const response = await fetch(`${API_BASE_URL}/tasks?status=${status}`);
    return response.json();
  },

  async getStatistics(): Promise<Statistics> {
    const response = await fetch(`${API_BASE_URL}/tasks/statistics`);
    return response.json();
  },

  async createTask(task: CreateTaskDto): Promise<Task> {
    const response = await fetch(`${API_BASE_URL}/tasks`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(task),
    });
    return response.json();
  },

  async updateTask(id: string, updates: Partial<Task>): Promise<Task> {
    const response = await fetch(`${API_BASE_URL}/tasks/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updates),
    });
    return response.json();
  },

  async deleteTask(id: string): Promise<void> {
    await fetch(`${API_BASE_URL}/tasks/${id}`, {
      method: 'DELETE',
    });
  },
};
