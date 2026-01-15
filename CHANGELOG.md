# CHANGELOG - Task Manager

### Partie 1 : Migration vers MongoDB avec Mongoose

**Problème résolu :** Les données étaient stockées en mémoire et perdues à chaque redémarrage du serveur.

---

## Modifications effectuées

### 1. Création du schéma Mongoose
**Fichier :** `packages/backend/src/tasks/task.schema.ts`

- Utilisation des décorateurs `@Schema()` et `@Prop()` pour définir la structure des documents
- Option `timestamps: true` pour gérer automatiquement `createdAt` et `updatedAt`
- Validation avec `required`, `enum` et valeurs par défaut (`status: 'todo'`, `priority: 'medium'`)
- Type `TaskDocument` avec `HydratedDocument<Task>` pour le typage TypeScript complet
- Gestion des tableaux avec `type: [String]` pour les tags

### 2. Intégration dans le module
**Fichier :** `packages/backend/src/tasks/tasks.module.ts`

- Enregistrement du modèle avec `MongooseModule.forFeature([{ name: Task.name, schema: TaskSchema }])`
- Permet l'injection du modèle dans le service via `@InjectModel`

### 3. Migration du service
**Fichier :** `packages/backend/src/tasks/tasks.service.ts`

- Injection du modèle Mongoose dans le constructeur avec `@InjectModel(Task.name)`
- Remplacement du tableau en mémoire par les méthodes Mongoose
- Toutes les méthodes deviennent asynchrones (`async/await`)
- Utilisation de `.exec()` pour retourner de vraies Promises
- Méthodes optimisées :
  - `find()` : récupération de tous les documents
  - `findById()` : recherche par ID avec index (O(1) au lieu de O(n))
  - `create()` : création et sauvegarde en une opération
  - `findByIdAndUpdate()` : mise à jour atomique avec option `{ new: true }`
  - `findByIdAndDelete()` : suppression en une opération
- Tri et filtrage côté base de données avec `.sort()` et `.find({ status })`

### 4. Adaptation du contrôleur
**Fichier :** `packages/backend/src/tasks/tasks.controller.ts`

- Ajout de `async/await` sur toutes les méthodes
- Remplacement de `HttpException` par des exceptions spécifiques :
  - `NotFoundException` pour les ressources non trouvées (404)
  - `BadRequestException` pour les données invalides (400)
- Gestion des erreurs MongoDB avec try/catch :
  - Capture des `CastError` (ObjectId invalide)
  - Messages d'erreur explicites incluant l'ID
- Vérification `if (!task)` après chaque requête (Mongoose retourne `null` si non trouvé)

### 5. Configuration de l'environnement
**Fichier :** `packages/backend/.env`

- Création du fichier `.env` avec :
  - `MONGODB_URI=mongodb://localhost:27017/taskmanager`
  - `PORT=3000`
  - `CORS_ORIGIN=http://localhost:8080`
- Séparation de la configuration et du code pour faciliter le déploiement

---

## Résultats

### Avant
- ❌ Données perdues à chaque redémarrage
- ❌ Recherche linéaire O(n)
- ❌ Pas de validation
- ❌ Gestion manuelle des dates
- ❌ ID non sécurisés (`Date.now()`)

### Après
- ✅ **Persistance des données**
- ✅ Recherche optimisée avec index
- ✅ Validation automatique
- ✅ Timestamps automatiques
- ✅ ObjectId MongoDB sécurisés
- ✅ Gestion robuste des erreurs
- ✅ Code asynchrone moderne

---

## Choix techniques

### Architecture
- **Séparation des responsabilités** : Schéma → Service → Contrôleur
- **Injection de dépendances** : Pattern NestJS pour la testabilité
- **Typage strict** : `TaskDocument`, `Promise<TaskDocument>` pour la sécurité TypeScript

### Performance
- **Index MongoDB** : Recherche par `_id` en O(1)
- **Opérations atomiques** : `findByIdAndUpdate` évite les race conditions
- **Tri côté base** : `.sort()` dans MongoDB au lieu de la mémoire

### Maintenabilité
- **Validation déclarative** : `@Prop()` avec `required`, `enum`, `default`
- **Timestamps automatiques** : Évite les erreurs de gestion manuelle
- **Exceptions sémantiques** : `NotFoundException` plus clair que `HttpException`
- **Configuration externalisée** : `.env` pour les différents environnements

---

## Références

**Mongoose :**
- [Guide officiel](https://mongoosejs.com/docs/guide.html)
- [SchemaTypes](https://mongoosejs.com/docs/schematypes.html)
- [Queries](https://mongoosejs.com/docs/queries.html)
- [TypeScript Support](https://mongoosejs.com/docs/typescript.html)

**NestJS :**
- [MongoDB Integration](https://docs.nestjs.com/techniques/mongodb)
- [Exception Filters](https://docs.nestjs.com/exception-filters)
- [Configuration](https://docs.nestjs.com/techniques/configuration)

**MongoDB :**
- [ObjectId](https://www.mongodb.com/docs/manual/reference/method/ObjectId/)
- [Indexes](https://www.mongodb.com/docs/manual/indexes/)

---

**Auteur :** Thibaut  
**Date :** 15 janvier 2026  

