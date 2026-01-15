// ici on va gérer toutes les erreurs API

// classe de base pour toutes les erreurs API
export class ApiError extends Error {
  constructor(
    message: string,
    public statusCode: number,
    public details?: unknown
  ) {
    super(message);
    this.name = 'ApiError';
  }
}

// erreur de validation (400)
export class ValidationError extends ApiError {
  constructor(message: string, public validationErrors: string[]) {
    super(message, 400, validationErrors);
    this.name = 'ValidationError';
  }
}

// ressource non trouvée (404)
export class NotFoundError extends ApiError {
  constructor(message: string) {
    super(message, 404);
    this.name = 'NotFoundError';
  }
}

// erreur serveur (500, 502, 503)
export class ServerError extends ApiError {
  constructor(message: string) {
    super(message, 500);
    this.name = 'ServerError';
  }
}

// erreur réseau (pas de connexion internet)
export class NetworkError extends Error {
  constructor(message: string = 'Network error. Please check your connection.') {
    super(message);
    this.name = 'NetworkError';
  }
}
