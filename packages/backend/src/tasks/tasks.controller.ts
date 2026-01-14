import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import type { CreateTaskDto, UpdateTaskDto } from './task.interface';
import { TasksService } from './tasks.service';

@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Get()
  getAllTasks(@Query('status') status?: string) {
    if (status) {
      return this.tasksService.getTasksByStatus(status);
    }
    return this.tasksService.getAllTasks();
  }

  @Get('statistics')
  getStatistics() {
    return this.tasksService.getStatistics();
  }

  @Get(':id')
  getTaskById(@Param('id') id: string) {
    const task = this.tasksService.getTaskById(id);
    if (!task) {
      throw new HttpException('Task not found', HttpStatus.NOT_FOUND);
    }
    return task;
  }

  @Post()
  createTask(@Body() createTaskDto: CreateTaskDto) {
    if (!createTaskDto.title) {
      throw new HttpException('Title is required', HttpStatus.BAD_REQUEST);
    }
    return this.tasksService.createTask(createTaskDto);
  }

  @Put(':id')
  updateTask(@Param('id') id: string, @Body() updateTaskDto: UpdateTaskDto) {
    const task = this.tasksService.updateTask(id, updateTaskDto);
    if (!task) {
      throw new HttpException('Task not found', HttpStatus.NOT_FOUND);
    }
    return task;
  }

  @Delete(':id')
  deleteTask(@Param('id') id: string) {
    const deleted = this.tasksService.deleteTask(id);
    if (!deleted) {
      throw new HttpException('Task not found', HttpStatus.NOT_FOUND);
    }
    return { message: 'Task deleted successfully' };
  }
}
