import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  NotFoundException, // gérer les ressources non trouvées, 404
  BadRequestException, // gère les données invalides, 400
  InternalServerErrorException // gère erreur serveur, 500
} from '@nestjs/common';
import { CreateTaskDto, UpdateTaskDto } from './task.interface';
import { TasksService } from './tasks.service';

@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) { }

  // ajour async pour rendre asyncrone et retourner directementla promise
  @Get()
  async getAllTasks(@Query('status') status?: string) {
    if (status) {
      return this.tasksService.getTasksByStatus(status);
    }
    return this.tasksService.getAllTasks();
  }

  @Get('statistics')
  async getStatistics() {
    return this.tasksService.getStatistics();
  }

  @Get(':id')
  async getTaskById(@Param('id') id: string) {
    try {
      // attend la résolution de la Promise
      const task = await this.tasksService.getTaskById(id);

      // si la tâche n'existe pas, Mongoose retourne null
      if (!task) {
        throw new NotFoundException(`Task with ID ${id} not found`);
      }

      return task;
    } catch (error) {
      // si l'ID n'est pas un ObjectId valide, MongoDB lance une erreur
      // on la transforme en BadRequestException
      if (error.name === 'CastError') {
        throw new BadRequestException(`Invalid task ID format: ${id}`);
      }
      // si c'est déjà une exception NestJS, on la relance
      throw error;
    }
  }

  @Post()
  async createTask(@Body() createTaskDto: CreateTaskDto) {
    // vplus besoin de validation manuelle
    // if (!createTaskDto.title || !createTaskDto.description) {
    //   throw new BadRequestException('Title and description are required');
    // }

    // crée la tâche dans MongoDB
    return this.tasksService.createTask(createTaskDto);
  }

  @Put(':id')
  async updateTask(@Param('id') id: string, @Body() updateTaskDto: UpdateTaskDto) {
    try {
      // met à jour la tâche dans MongoDB
      // findByIdAndUpdate retourne null si la tâche n'existe pas
      const task = await this.tasksService.updateTask(id, updateTaskDto);

      if (!task) {
        throw new NotFoundException(`Task with ID ${id} not found`);
      }

      return task;
    } catch (error) {
      // gère les ID invalides
      if (error.name === 'CastError') {
        throw new BadRequestException(`Invalid task ID format: ${id}`);
      }
      throw error;
    }
  }

  @Delete(':id')
  async deleteTask(@Param('id') id: string) {
    try {
      // supprime la tâche de MongoDB
      // le service retourne true si supprimé, false si non trouvé
      const deleted = await this.tasksService.deleteTask(id);

      if (!deleted) {
        throw new NotFoundException(`Task with ID ${id} not found`);
      }

      // retourne un message de confirmation
      return { message: 'Task deleted successfully' };
    } catch (error) {
      // gère les ID invalides
      if (error.name === 'CastError') {
        throw new BadRequestException(`Invalid task ID format: ${id}`);
      }
      throw error;
    }
  }
}
