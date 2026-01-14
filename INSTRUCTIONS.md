# Instructions - Test Technique

**Durée estimée : 6-8 heures**

L'objectif de ce test est d'évaluer votre capacité à améliorer une application existante en identifiant et en résolvant des problématiques réelles de développement.

## Contexte

Vous disposez d'une application de gestion de tâches (Task Manager) avec :
- Un backend NestJS
- Un frontend React + TypeScript
- Une architecture monorepo avec pnpm

L'application fonctionne actuellement mais présente plusieurs problèmes de conception et d'implémentation.

## Tâches à réaliser

### 1. Migration vers une base de données MongoDB (5-6h)

**Problème actuel :** Les données sont stockées en mémoire et sont perdues à chaque redémarrage du serveur.

**Objectif :** Migrer le système de stockage vers MongoDB en utilisant Mongoose.

**Configuration déjà en place :**
- ✅ Dépendances MongoDB installées (`@nestjs/mongoose`, `mongoose`)
- ✅ Configuration de base dans `app.module.ts`
- ✅ Variables d'environnement configurées dans `.env`
- ✅ Connexion MongoDB prête à l'emploi

**Ce que nous attendons :**
- Création d'un schéma Mongoose pour les tâches
- Intégration du schéma dans le module Tasks
- Migration de toute la logique métier pour utiliser MongoDB
- Les données doivent persister entre les redémarrages
- Gestion appropriée des erreurs de base de données

**Points d'attention :**
- Utiliser les décorateurs Mongoose (`@Schema`, `@Prop`)
- Gérer correctement les types MongoDB (ObjectId)
- Opérations asynchrones avec async/await
- Types TypeScript cohérents entre interface et schéma

---

### 2. Validation des données d'entrée (1-2h)

**Problème actuel :** Aucune validation robuste des données envoyées par le client.

**Objectif :** Implémenter un système de validation complet pour toutes les données entrantes.

**Ce que nous attendons :**
- Validation des champs obligatoires
- Validation des types et formats
- Validation des valeurs autorisées (enums)
- Messages d'erreur clairs et exploitables
- Protection contre les données malformées

**Points d'attention :**
- Utilisation des bonnes pratiques NestJS
- Validation au bon niveau de l'architecture
- Cohérence des messages d'erreur

---

### 3. Gestion des erreurs API (1-2h)

**Problème actuel :** Les erreurs réseau et serveur ne sont pas gérées correctement dans le frontend.

**Objectif :** Créer un système centralisé de gestion des erreurs API.

**Ce que nous attendons :**
- Interception et traitement des erreurs HTTP
- Affichage de messages d'erreur compréhensibles pour l'utilisateur
- Gestion des différents codes d'erreur (400, 404, 500, etc.)
- Expérience utilisateur améliorée en cas d'échec

**Points d'attention :**
- Architecture propre et réutilisable
- Séparation des préoccupations
- UX : l'utilisateur doit comprendre ce qui s'est passé

---

## Critères d'évaluation

1. **Qualité du code** (30%)
   - Lisibilité et organisation
   - Respect des conventions
   - Commentaires pertinents

2. **Architecture** (30%)
   - Choix techniques appropriés
   - Séparation des responsabilités
   - Scalabilité de la solution

3. **Fonctionnalité** (25%)
   - L'application fonctionne correctement
   - Tous les cas d'usage sont couverts
   - Gestion des cas limites

4. **Compréhension** (15%)
   - Identification des problèmes
   - Choix des solutions
   - Capacité à naviguer dans le code existant

## Livrables

- Code source modifié avec vos améliorations
- Un fichier `CHANGELOG.md` décrivant brièvement vos modifications
- Instructions pour lancer l'application (si différentes de l'existant)
- (Optionnel) Un fichier expliquant vos choix techniques

## Notes

- Vous pouvez installer les dépendances nécessaires
- **MongoDB démarre automatiquement** avec la commande `pnpm dev`
- Si l'auto-démarrage échoue, utilisez : `bash scripts/start-mongodb.sh`
- N'hésitez pas à refactoriser le code existant si besoin
- La qualité est plus importante que la quantité
- En cas de blocage, documentez votre approche et les difficultés rencontrées

## Commandes utiles

```bash
# Installer les dépendances
pnpm install

# Lancer l'application (démarre automatiquement MongoDB avec Docker)
pnpm dev

# Si MongoDB ne démarre pas automatiquement :
bash scripts/start-mongodb.sh

# Gestion manuelle de MongoDB :
export DOCKER_HOST=unix:///var/run/docker.sock
docker compose up -d      # Démarrer MongoDB
docker compose ps         # Vérifier le statut
docker compose down       # Arrêter MongoDB

# Backend seul
pnpm --filter backend dev

# Frontend seul
pnpm --filter frontend dev
```

---

**Bonne chance ! 🚀**
