import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { CreateTodoListDto } from './dtos/create-todo_list';
import { UpdateTodoListDto } from './dtos/update-todo_list';
import { TodoList } from '../interfaces/todo_list.interface';
import { TodoListsService } from './todo_lists.service';

@Controller('api/todolists')
export class TodoListsController {
  constructor(private todoListsService: TodoListsService) {}

  @Get()
  index(): TodoList[] {
    return this.todoListsService.all();
  }

  @Get('/:todoListId')
  show(@Param() param: { todoListId: number }): TodoList {
    return this.todoListsService.get(param.todoListId);
  }

  @Get('/:todoListName')
  showByName(@Param() param: { todoListName: string }): TodoList {
    return this.todoListsService.getByName(param.todoListName);
  }

  @Post()
  create(@Body() dto: CreateTodoListDto): TodoList {
    return this.todoListsService.create(dto);
  }

  @Put('/:todoListId')
  update(
    @Param() param: { todoListId: number },
    @Body() dto: UpdateTodoListDto,
  ): TodoList {
    return this.todoListsService.update(param.todoListId, dto);
  }

  @Delete('/:todoListId')
  delete(@Param() param: { todoListId: number }): void {
    this.todoListsService.delete(param.todoListId);
  }
}
