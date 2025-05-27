import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { TodoItemsService } from './todo_items.service';
import { CreateTodoItemDto } from './dto/create-todo_item.dto';
import { UpdateTodoItemDto } from './dto/update-todo_item.dto';

@Controller('api/todoitems')
export class TodoItemsController {
  constructor(private readonly todoItemsService: TodoItemsService) {}

  @Post('/:todoListId')
  create(
    @Param() param: { todoListId: number },
    @Body() createTodoItemDto: CreateTodoItemDto,
  ) {
    return this.todoItemsService.create(param.todoListId, createTodoItemDto);
  }

  @Get('/:todoListId')
  findAll(@Param() param: { todoListId: number }) {
    return this.todoItemsService.findAll(param.todoListId);
  }

  @Get('/:todoListId/:itemId')
  findOne(@Param() params: { todoListId: number; itemId: number }) {
    return this.todoItemsService.findOne(params.todoListId, params.itemId);
  }

  @Patch('/:todoListId/:itemId')
  update(
    @Param() param: { todoListId: number; itemId: number },

    @Body() updateTodoItemDto: UpdateTodoItemDto,
  ) {
    return this.todoItemsService.update(
      param.todoListId,
      param.itemId,
      updateTodoItemDto,
    );
  }

  @Patch('/:todoListId/:itemId/done')
  markAsDone(@Param() param: { todoListId: number; itemId: number }) {
    return this.todoItemsService.markAsDone(param.todoListId, param.itemId);
  }

  @Delete('/:todoListId/:itemId')
  remove(@Param() param: { todoListId: number; itemId: number }) {
    return this.todoItemsService.remove(param.todoListId, param.itemId);
  }
}
