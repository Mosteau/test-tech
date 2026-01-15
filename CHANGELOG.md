# CHANGELOG - Task Manager

Toutes les modifications du projet sont documentées dans ce fichier selon les 3 étapes de l'exercice.

## [1.0.0] - 2026-01-15

### 🎯 Migration vers MongoDB avec Mongoose

**Problème :** Données stockées en mémoire, perdues à chaque redémarrage.

**Objectif :** Persistance des données avec MongoDB.

**Choix technique :** Mongoose pour son système de schémas typés, validation intégrée et intégration native avec NestJS via `@nestjs/mongoose`.

**Modifications :**

| Fichier | Action | Description |
|---------|--------|-------------|
| `src/tasks/task.schema.ts` | Créé | Schéma Mongoose avec décorateurs |
| `src/tasks/tasks.module.ts` | Modifié | Enregistrement du modèle |
| `src/tasks/tasks.service.ts` | Modifié | Migration vers méthodes Mongoose |
| `src/tasks/tasks.controller.ts` | Modifié | Gestion async + exceptions NestJS |

**Schéma Mongoose :**
- Décorateurs `@Schema()` et `@Prop()`
- Timestamps automatiques (createdAt, updatedAt)
- Validation avec enums et valeurs par défaut
- Type `TaskDocument` pour TypeScript

**Résultats :**
- ✅ Persistance des données entre redémarrages
- ✅ Recherche optimisée avec index MongoDB (O(1) vs O(n))
- ✅ Validation automatique au niveau du schéma
- ✅ ObjectId sécurisés
- ✅ Gestion robuste des erreurs (CastError, NotFoundException)



## 🔗 Références

**Mongoose :**
- [Guide officiel](https://mongoosejs.com/docs/guide.html)
- [TypeScript Support](https://mongoosejs.com/docs/typescript.html)

**NestJS :**
- [MongoDB Integration](https://docs.nestjs.com/techniques/mongodb)
- [Validation](https://docs.nestjs.com/techniques/validation)
- [Exception Filters](https://docs.nestjs.com/exception-filters)

**React :**
- [react-hot-toast](https://react-hot-toast.com/)

---

---

## [1.1.0] - 2026-01-15

### 🎯 Validation des données d'entrée

**Problème :** Aucune validation robuste des données. Données malformées acceptées.

**Objectif :** Validation automatique avec class-validator.

**Choix technique :** `class-validator` + `class-transformer` pour validation déclarative via décorateurs, intégration native avec NestJS ValidationPipe.

**Modifications :**

| Fichier | Action | Description |
|---------|--------|-------------|
| `src/main.ts` | Modifié | Activation du ValidationPipe global |
| `src/tasks/task.interface.ts` | Modifié | Enums + décorateurs de validation |
| `src/tasks/tasks.controller.ts` | Modifié | Suppression validation manuelle |

**Règles de validation :**
- **title** : obligatoire, 3-100 caractères
- **description** : obligatoire, 10-500 caractères
- **status** : enum (todo, in-progress, done)
- **priority** : enum (low, medium, high)
- **tags** : tableau de strings optionnel

**Résultats :**
- ✅ Validation automatique de tous les champs
- ✅ Messages d'erreur détaillés (format JSON)
- ✅ Rejet des propriétés inconnues
- ✅ 7/7 tests de validation réussis

---

---

## [1.2.0] - 2026-01-15

### 🎯 Gestion des erreurs API (Frontend)

**Problème :** Aucune gestion des erreurs réseau et serveur. Messages génériques sans affichage visuel.

**Objectif :** Système centralisé de gestion des erreurs avec toasts.

**Choix technique :** Architecture en 3 couches (errors.ts pour typage, api.ts pour interception HTTP, errorHandler.ts pour UI) + `react-hot-toast` pour notifications non intrusives.

**Modifications :**

| Fichier | Action | Description |
|---------|--------|-------------|
| `src/errors.ts` | Créé | Classes d'erreur typées (ValidationError, NetworkError, etc.) |
| `src/utils/errorHandler.ts` | Créé | Gestionnaire centralisé avec react-hot-toast |
| `src/api.ts` | Modifié | Interception des erreurs HTTP (400, 404, 500) |
| `src/useTasks.ts` | Modifié | Utilisation du gestionnaire d'erreurs |
| `src/App.tsx` | Modifié | Configuration du Toaster |

**Résultats :**
- ✅ Messages d'erreur spécifiques par type (validation, réseau, serveur)
- ✅ Toasts non intrusifs avec react-hot-toast
- ✅ Messages de succès pour les actions utilisateur
- ✅ Architecture centralisée et réutilisable

---

---

## [1.3.0] - 2026-01-15

### 🔧 Correction : Transformation _id → id

**Problème :** Le backend retournait `_id` (MongoDB) mais le frontend attendait `id`, causant des erreurs sur les requêtes PUT/DELETE.

**Solution :** Ajout d'une transformation automatique dans le schéma Mongoose via `toJSON.transform`.

**Choix technique :** Transformation au niveau du schéma plutôt que dans le controller pour centraliser la logique et éviter la duplication de code.

**Fichier modifié :**
- `packages/backend/src/tasks/task.schema.ts`

**Résultat :**
- ✅ L'API retourne maintenant `id` au lieu de `_id`
- ✅ Suppression de `__v` (champ interne Mongoose)
- ✅ Compatibilité avec le frontend

