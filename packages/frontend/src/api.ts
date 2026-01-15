import type { CreateTaskDto, Statistics, Task } from './types';
import { ApiError, ValidationError, NotFoundError, ServerError, NetworkError } from './utils/errors';

const API_BASE_URL = '/api';

// fonction helper pour gérer les réponses HTTP
// vérifie le status code et lance l'erreur appropriée
async function handleResponse<T>(response: Response): Promise<T> {
  if (response.ok) {
    return response.json();
  }
  let errorData;
  try {
    errorData = await response.json();
  } catch {
    errorData = { message: 'An error occurred' };
  }

  // créer l'erreur appropriée selon le status code
  switch (response.status) {
    case 400:
      // erreur de validation - Le backend retourne un tableau de messages
      const validationMessages = Array.isArray(errorData.message)
        ? errorData.message
        : [errorData.message];
      throw new ValidationError(
        'Validation failed',
        validationMessages
      );
    
    case 404:
      throw new NotFoundError(errorData.message || 'Resource not found');
    
    case 500:
    case 502:
    case 503:
      throw new ServerError(errorData.message || 'Server error');
    
    default:
      throw new ApiError(
        errorData.message || 'An error occurred',
        response.status,
        errorData
      );
  }
}

// wrapper pour gérer les erreurs réseau (pas de connexion)
async function fetchWithErrorHandling<T>(
  url: string,
  options?: RequestInit
): Promise<T> {
  try {
    const response = await fetch(url, options);
    return handleResponse<T>(response);
  } catch (error) {
    // Si c'est déjà une de nos erreurs typées, la relancer
    if (error instanceof ApiError || error instanceof NetworkError) {
      throw error;
    }
    // Sinon, c'est probablement une erreur réseau (fetch failed)
    throw new NetworkError();
  }
}

// API client avec gestion d'erreur centralisée
export const api = {
  async getTasks(): Promise<Task[]> {
    return fetchWithErrorHandling<Task[]>(`${API_BASE_URL}/tasks`);
  },

  async getTasksByStatus(status: string): Promise<Task[]> {
    return fetchWithErrorHandling<Task[]>(
      `${API_BASE_URL}/tasks?status=${status}`
    );
  },

  async getStatistics(): Promise<Statistics> {
    return fetchWithErrorHandling<Statistics>(
      `${API_BASE_URL}/tasks/statistics`
    );
  },

  async createTask(task: CreateTaskDto): Promise<Task> {
    return fetchWithErrorHandling<Task>(`${API_BASE_URL}/tasks`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(task),
    });
  },

  async updateTask(id: string, updates: Partial<Task>): Promise<Task> {
    return fetchWithErrorHandling<Task>(`${API_BASE_URL}/tasks/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updates),
    });
  },

  async deleteTask(id: string): Promise<void> {
    return fetchWithErrorHandling<void>(`${API_BASE_URL}/tasks/${id}`, {
      method: 'DELETE',
    });
  },
};
