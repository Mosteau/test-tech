// fichier créé pour les toasts
import toast from 'react-hot-toast';
import {
  ValidationError,
  NotFoundError,
  NetworkError,
  ServerError,
  ApiError
} from './errors';

// analyse le type d'erreur et affiche un toast approprié
export function handleApiError(error: unknown, context?: string): void {
  console.error('API Error:', error);

  // erreur de validation (400)
  if (error instanceof ValidationError) {
    error.validationErrors.forEach(msg => {
      toast.error(msg, { id: msg });
    });
    return;
  }

  // ressource non trouvée (404)
  if (error instanceof NotFoundError) {
    toast.error(error.message);
    return;
  }

  // erreur réseau (pas de connexion)
  if (error instanceof NetworkError) {
    toast.error('Pas de connexion internet. Vérifiez votre réseau.', {
      icon: '📡',
      duration: 5000,
    });
    return;
  }

  // erreur serveur (500, 502, 503)
  if (error instanceof ServerError) {
    toast.error('Erreur serveur. Veuillez réessayer plus tard.', {
      icon: '⚠️',
      duration: 5000,
    });
    return;
  }

  // autre erreur API
  if (error instanceof ApiError) {
    toast.error(error.message);
    return;
  }

  // erreur inconnue - message générique avec contexte
  const message = context
    ? `Échec de l'opération : ${context}`
    : 'Une erreur inattendue est survenue';
  toast.error(message);
}

// helper pour afficher les messages de succès
export function showSuccess(message: string): void {
  toast.success(message, {
    duration: 3000,
  });
}
