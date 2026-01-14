# Configuration MongoDB

Ce projet est pré-configuré pour utiliser MongoDB avec Mongoose.

## 🚀 Démarrage rapide avec Docker (Recommandé)

La solution la plus simple pour démarrer MongoDB :

```bash
# Utiliser le script fourni
bash scripts/start-mongodb.sh

# Ou manuellement
export DOCKER_HOST=unix:///var/run/docker.sock
docker compose up -d

# Vérifier que MongoDB fonctionne
docker compose ps

# Voir les logs
docker compose logs mongodb

# Arrêter MongoDB
docker compose down
```

**Note :** Si vous utilisez Docker Desktop, vous devrez peut-être exporter `DOCKER_HOST` avant chaque commande Docker.

MongoDB sera accessible sur `mongodb://localhost:27017/taskmanager`

## Configuration

La configuration est gérée via des variables d'environnement dans le fichier `.env` :

```env
MONGODB_URI=mongodb://localhost:27017/taskmanager
PORT=3000
NODE_ENV=development
CORS_ORIGIN=http://localhost:5173
```

## Installation de MongoDB

### Option 1 : Docker Compose (Recommandé) ⭐

Le projet inclut un fichier `docker-compose.yml` à la racine :

```bash
docker compose up -d
```

C'est tout ! MongoDB sera disponible sur le port 27017.

### Option 2 : Docker manuel

```bash
# Installation (Ubuntu/Debian)
sudo apt-get update
sudo apt-get install -y mongodb-org

# Démarrage du service
sudo systemctl start mongod
sudo systemctl enable mongod

# Vérification
sudo systemctl status mongod
```

### Option 2 : Docker manuel

```bash
docker run -d -p 27017:27017 --name mongodb mongo:7
```

### Option 3 : MongoDB local (Linux)

```bash
# Installation (Ubuntu/Debian)
sudo apt-get update
sudo apt-get install -y mongodb-org

# Démarrage du service
sudo systemctl start mongod
sudo systemctl enable mongod

# Vérification
sudo systemctl status mongod
```

### Option 4 : MongoDB Atlas (Cloud - gratuit)

1. Créer un compte sur [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Créer un cluster gratuit
3. Obtenir l'URI de connexion
4. Mettre à jour `MONGODB_URI` dans `.env` :
   ```
   MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/taskmanager
   ```

## Structure de la configuration

La configuration MongoDB est déjà en place dans :

- **`app.module.ts`** : Configuration du module Mongoose avec `MongooseModule.forRootAsync()`
- **`main.ts`** : Utilisation de `ConfigService` pour charger les variables d'environnement
- **`.env`** : Variables de configuration (ne pas commiter ce fichier)
- **`.env.example`** : Template des variables d'environnement

## Prochaines étapes

Pour utiliser MongoDB dans le projet :

1. Assurez-vous que MongoDB est démarré
2. Créez un schéma Mongoose pour vos entités (exemple : `task.schema.ts`)
3. Enregistrez le schéma dans votre module avec `MongooseModule.forFeature()`
4. Injectez le modèle dans votre service avec `@InjectModel()`

### Exemple de schéma

```typescript
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true })
export class Task extends Document {
  @Prop({ required: true })
  title: string;

  @Prop()
  description: string;

  @Prop({ enum: ['todo', 'in-progress', 'done'], default: 'todo' })
  status: string;

  @Prop({ enum: ['low', 'medium', 'high'], default: 'medium' })
  priority: string;

  @Prop({ type: [String], default: [] })
  tags: string[];
}

export const TaskSchema = SchemaFactory.createForClass(Task);
```

### Enregistrement dans le module

```typescript
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Task, TaskSchema } from './task.schema';
import { TasksService } from './tasks.service';
import { TasksController } from './tasks.controller';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Task.name, schema: TaskSchema }])
  ],
  controllers: [TasksController],
  providers: [TasksService],
})
export class TasksModule {}
```

### Injection dans le service

```typescript
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Task } from './task.schema';

@Injectable()
export class TasksService {
  constructor(
    @InjectModel(Task.name) private taskModel: Model<Task>
  ) {}

  async findAll(): Promise<Task[]> {
    return this.taskModel.find().exec();
  }

  async create(taskDto: CreateTaskDto): Promise<Task> {
    const task = new this.taskModel(taskDto);
    return task.save();
  }
}
```

## Vérification de la connexion

Si la connexion à MongoDB échoue, vérifiez :
- MongoDB est démarré : `sudo systemctl status mongod`
- L'URI est correct dans `.env`
- Le port 27017 n'est pas bloqué par le firewall
- Vous avez les permissions d'accès (pour MongoDB Atlas)
