# Task Manager - Projet d'entretien technique

Application monorepo de gestion de tâches construite avec React (frontend) et NestJS (backend).

## 🎯 Objectif

Ce projet sert de base pour des entretiens techniques. Il contient **volontairement** des problèmes de performance, d'architecture et de qualité de code à identifier et corriger.

Consultez [INSTRUCTIONS.md](INSTRUCTIONS.md) pour les détails du test technique.

## 🏗️ Structure du projet

```
Entretien/
├── packages/
│   ├── backend/          # API NestJS + MongoDB
│   │   └── src/
│   │       ├── main.ts
│   │       ├── app.module.ts
│   │       └── tasks/    # Module de gestion des tâches
│   └── frontend/         # Application React
│       └── src/
│           ├── components/
│           ├── App.tsx
│           ├── api.ts
│           └── useTasks.ts
├── docker-compose.yml    # Configuration MongoDB
├── INSTRUCTIONS.md       # Instructions du test
├── package.json
├── pnpm-workspace.yaml
└── biome.json
```

## 🚀 Installation

### Prérequis

- Node.js 20+
- pnpm 9+
- Docker (pour MongoDB - optionnel si MongoDB installé localement)

### Installation des dépendances

```bash
pnpm install
```

## 💻 Développement

### Lancer le projet complet

```bash
# MongoDB démarre automatiquement avec Docker !
pnpm dev
```

Le script `pnpm dev` :
1. ✅ Démarre MongoDB automatiquement (avec Docker)
2. ✅ Lance le backend (port 3000)
3. ✅ Lance le frontend (port 5173)

**Si MongoDB ne démarre pas automatiquement :**
```bash
bash scripts/start-mongodb.sh
```

**Note Docker :** Si vous utilisez Docker Desktop, vous pouvez avoir besoin d'exécuter :
```bash
export DOCKER_HOST=unix:///var/run/docker.sock
```

- Frontend : http://localhost:8080
- Backend : http://localhost:3000

### Lancer les services séparément

```bash
# Backend uniquement
pnpm dev:backend

# Frontend uniquement
pnpm dev:frontend
```

### Linting et formatage

```bash
# Vérifier le code
pnpm lint

# Corriger automatiquement
pnpm lint:fix

# Formater le code
pnpm format
```

## 🔍 Points d'amélioration à identifier

### Backend (NestJS)

#### 🐌 Performance
- [ ] Stockage en mémoire (données perdues au redémarrage)
- [ ] Pas de pagination sur `GET /tasks`
- [ ] Tri inefficace effectué à chaque requête
- [ ] Recherche linéaire O(n) pour trouver une tâche
- [ ] Statistiques recalculées à chaque appel sans cache
- [ ] Génération d'ID non sécurisée avec `Date.now()`

#### 🏛️ Architecture
- [ ] Pas de couche de persistance (repository pattern)
- [ ] Pas de validation des DTOs (class-validator)
- [ ] Mutation directe des objets sans immutabilité
- [ ] Logique métier mélangée avec le service
- [ ] Pas de gestion des transactions
- [ ] CORS trop permissif (`origin: '*'`)

#### 🧪 Tests
- [ ] Aucun test unitaire
- [ ] Aucun test d'intégration

#### 📝 Documentation
- [ ] Pas de documentation Swagger/OpenAPI
- [ ] Pas de validation des schémas

### Frontend (React)

#### 🐌 Performance
- [ ] Pas de mémoïsation (`useMemo`, `useCallback`)
- [ ] Tri effectué à chaque render dans `TaskList`
- [ ] Calculs de statistiques refaits même si les données ne changent pas
- [ ] Filtrage côté client au lieu du serveur
- [ ] Re-renders inutiles des composants

#### 🏛️ Architecture
- [ ] Hook `useTasks` fait trop de choses (God Object)
- [ ] Pas de gestion d'état global (Context/Redux)
- [ ] Logique métier dans les composants (statut flow, priority flow)
- [ ] Pas de séparation des préoccupations
- [ ] Couplage fort entre composants et API

#### 🔒 Sécurité & Qualité
- [ ] Pas de gestion d'erreur robuste
- [ ] Validation basique avec `alert()`
- [ ] Pas de retry logic sur les requêtes
- [ ] Pas de debounce sur les inputs
- [ ] Pas de loading states granulaires

#### ♿ Accessibilité
- [ ] Pas de labels ARIA
- [ ] Pas de gestion du focus
- [ ] Pas de support clavier complet

#### 🧪 Tests
- [ ] Aucun test de composants
- [ ] Aucun test d'intégration

### Architecture globale

- [ ] Pas de variables d'environnement (`.env`)
- [ ] Pas de gestion des logs structurés
- [ ] Pas de monitoring/observabilité
- [ ] Pas de CI/CD
- [ ] Pas de containerisation (Docker)
- [ ] Pas de types partagés entre frontend et backend

## 💡 Suggestions d'amélioration

### Court terme
1. Ajouter une base de données (PostgreSQL/MongoDB)
2. Implémenter la pagination
3. Ajouter la validation avec class-validator
4. Optimiser les performances React (memo, useMemo, useCallback)
5. Centraliser la gestion d'état
6. Améliorer la gestion des erreurs

### Moyen terme
1. Ajouter l'authentification (JWT)
2. Implémenter le caching (Redis)
3. Ajouter les tests
4. Documentation API avec Swagger
5. Websockets pour les mises à jour en temps réel
6. Recherche et filtres avancés

### Long terme
1. Microservices architecture
2. Event sourcing / CQRS
3. Monitoring et alerting
4. CI/CD complet
5. Multi-tenancy
6. Internationalisation (i18n)

## 🛠️ Technologies utilisées

- **Frontend**: React 18, TypeScript, Vite
- **Backend**: NestJS, TypeScript
- **Linter**: Biome
- **Package Manager**: pnpm
- **Monorepo**: pnpm workspaces

## 📚 Ressources

- [React Documentation](https://react.dev/)
- [NestJS Documentation](https://docs.nestjs.com/)
- [Biome Documentation](https://biomejs.dev/)
- [pnpm Documentation](https://pnpm.io/)

## 📝 License

Ce projet est destiné à un usage éducatif pour des entretiens techniques.
