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
    @Param('todoListId') todoListId: number,
    @Body() createTodoItemDto: CreateTodoItemDto,
  ) {
    return this.todoItemsService.create(todoListId, createTodoItemDto);
  }

  @Get()
  findAll() {
    return this.todoItemsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.todoItemsService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateTodoItemDto: UpdateTodoItemDto,
  ) {
    return this.todoItemsService.update(+id, updateTodoItemDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.todoItemsService.remove(+id);
  }
}
