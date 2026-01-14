import { Injectable } from '@nestjs/common';
import type { CreateTaskDto, Task, UpdateTaskDto } from './task.interface';

@Injectable()
export class TasksService {
  private tasks: Task[] = [
    {
      id: '1',
      title: 'Implémenter authentification',
      description: 'Ajouter JWT et guards',
      status: 'todo',
      priority: 'high',
      createdAt: new Date('2024-01-10'),
      updatedAt: new Date('2024-01-10'),
      tags: ['backend', 'security'],
    },
    {
      id: '2',
      title: 'Optimiser les requêtes',
      description: 'Résoudre le problème N+1',
      status: 'in-progress',
      priority: 'high',
      createdAt: new Date('2024-01-11'),
      updatedAt: new Date('2024-01-12'),
      tags: ['backend', 'performance'],
    },
    {
      id: '3',
      title: 'Améliorer UI',
      description: 'Refactoriser les composants',
      status: 'todo',
      priority: 'medium',
      createdAt: new Date('2024-01-12'),
      updatedAt: new Date('2024-01-12'),
      tags: ['frontend', 'ux'],
    },
  ];

  getAllTasks(): Task[] {
    return this.tasks.sort((a, b) => {
      const priorityWeight = { high: 3, medium: 2, low: 1 };
      return priorityWeight[b.priority] - priorityWeight[a.priority];
    });
  }

  getTaskById(id: string): Task | undefined {
    return this.tasks.find((task) => task.id === id);
  }

  createTask(createTaskDto: CreateTaskDto): Task {
    const newTask: Task = {
      id: Date.now().toString(),
      title: createTaskDto.title,
      description: createTaskDto.description,
      status: 'todo',
      priority: createTaskDto.priority || 'medium',
      createdAt: new Date(),
      updatedAt: new Date(),
      tags: createTaskDto.tags || [],
    };

    this.tasks.push(newTask);
    return newTask;
  }

  updateTask(id: string, updateTaskDto: UpdateTaskDto): Task | undefined {
    const task = this.getTaskById(id);
    if (!task) {
      return undefined;
    }

    Object.assign(task, updateTaskDto);
    task.updatedAt = new Date();

    return task;
  }

  deleteTask(id: string): boolean {
    const index = this.tasks.findIndex((task) => task.id === id);
    if (index === -1) {
      return false;
    }

    this.tasks.splice(index, 1);
    return true;
  }

  getTasksByStatus(status: string): Task[] {
    return this.tasks
      .filter((task) => task.status === status)
      .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
  }

  getStatistics() {
    const stats = {
      total: this.tasks.length,
      todo: 0,
      inProgress: 0,
      done: 0,
      byPriority: { low: 0, medium: 0, high: 0 },
    };

    for (const task of this.tasks) {
      if (task.status === 'todo') stats.todo++;
      if (task.status === 'in-progress') stats.inProgress++;
      if (task.status === 'done') stats.done++;

      stats.byPriority[task.priority]++;
    }

    return stats;
  }
}
