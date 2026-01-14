# Script de démarrage MongoDB

Ce script démarre automatiquement MongoDB avec Docker.

## Utilisation

```bash
bash scripts/start-mongodb.sh
```

## Résolution de problèmes

### Erreur: "Cannot connect to the Docker daemon"

Si vous utilisez Docker Desktop, vous devez exporter la variable `DOCKER_HOST` :

```bash
export DOCKER_HOST=unix:///var/run/docker.sock
```

Puis relancer le script.

### Docker Desktop vs Docker Engine

- **Docker Engine** (Linux natif) : Fonctionne directement avec `/var/run/docker.sock`
- **Docker Desktop** : Utilise son propre socket dans `~/.docker/desktop/docker.sock`

Ce script est configuré pour utiliser le socket système qui fonctionne dans les deux cas.

## Commandes utiles

```bash
# Vérifier que MongoDB fonctionne
export DOCKER_HOST=unix:///var/run/docker.sock
docker compose ps

# Voir les logs
docker compose logs mongodb

# Arrêter MongoDB
docker compose down

# Redémarrer MongoDB
docker compose restart mongodb
```
