import { Injectable } from '@nestjs/common';
// imports pour injecter mongoose, models pour avoir (find, create ..)
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import type { CreateTaskDto, Task, UpdateTaskDto } from './task.interface';
import { Task as TaskSchema, TaskDocument } from './task.schema';

@Injectable()
export class TasksService {
  // Injection du modèle Mongoose dans le constructeur
  // Model<TaskDocument> : type pour l'autocomplétion (méthodes Mongoose disponibles)
  constructor(
    @InjectModel(TaskSchema.name) private taskModel: Model<TaskDocument>
  ) {}

  // récupère toutes les tâches depuis MongoDB
  // async : la méthode est asynchrone (opération réseau vers MongoDB)
  // Promise<TaskDocument[]> : retourne une promesse de tableau de documents
  // .find() : récupère tous les documents de la collection "tasks"
  // .exec() : exécute la requête et retourne une Promise
  async getAllTasks(): Promise<TaskDocument[]> {
    return this.taskModel.find().exec();
  }

  // récupère une tâche par id
  async getTaskById(id: string): Promise<TaskDocument | null> {
    return this.taskModel.findById(id).exec();
  }

  // création et sauvegarde le document en une seule opération
  async createTask(createTaskDto: CreateTaskDto): Promise<TaskDocument> {
    return this.taskModel.create(createTaskDto);
  }

  // mise à jour une tâche existante
  async updateTask(id: string, updateTaskDto: UpdateTaskDto): Promise<TaskDocument | null> {
    return this.taskModel.findByIdAndUpdate(id, updateTaskDto, { new: true }).exec();
  }

  // supprime une tâche
  async deleteTask(id: string): Promise<boolean> {
    const result = await this.taskModel.findByIdAndDelete(id).exec();
    return result !== null;
  }

  // récupère les tâches filtrées par statut
  async getTasksByStatus(status: string): Promise<TaskDocument[]> {
    return this.taskModel.find({ status }).sort({ createdAt: -1 }).exec();
  }

  // calcule les statistiques sur toutes les tâches
  async getStatistics() {
    const tasks = await this.taskModel.find().exec();
    
    // initialise l'objet de statistiques
    const stats = {
      total: tasks.length,
      todo: 0,
      inProgress: 0,
      done: 0,
      byPriority: { low: 0, medium: 0, high: 0 },
    };

    // parcourt toutes les tâches et incrémente les compteurs
    for (const task of tasks) {
      if (task.status === 'todo') stats.todo++;
      if (task.status === 'in-progress') stats.inProgress++;
      if (task.status === 'done') stats.done++;
      stats.byPriority[task.priority]++;
    }

    return stats;
  }
}
