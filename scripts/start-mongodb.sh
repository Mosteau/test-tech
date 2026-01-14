#!/bin/bash
# Script pour démarrer MongoDB avec Docker

# Définir le socket Docker approprié
export DOCKER_HOST=unix:///var/run/docker.sock

# Démarrer MongoDB
echo "🐳 Démarrage de MongoDB..."
docker compose up -d --wait

if [ $? -eq 0 ]; then
    echo "✅ MongoDB démarré avec succès sur le port 27017"
else
    echo "❌ Erreur: impossible de démarrer MongoDB"
    echo "Assurez-vous que Docker est installé et démarré"
    exit 1
fi
