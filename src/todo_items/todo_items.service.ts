import { Injectable, Inject } from '@nestjs/common';
import { TodoListsService } from '../todo_lists/todo_lists.service';
import { CreateTodoItemDto } from './dto/create-todo_item.dto';
import { UpdateTodoItemDto } from './dto/update-todo_item.dto';
import { TodoItem } from 'src/interfaces/todo_item.interface';
import { TodoList } from 'src/interfaces/todo_list.interface';

@Injectable()
export class TodoItemsService {
  @Inject(TodoListsService)
  private readonly todoListsService: TodoListsService;

  create(todoListId: number, createTodoItemDto: CreateTodoItemDto) {
    const todoList = this.todoListsService.get(todoListId);

    if (!todoList) {
      throw new Error(`Todo list with ID ${todoListId} not found`);
    }

    const todoItem: TodoItem = {
      id: this.nextItemId(todoListId),
      todoListId: todoListId,
      name: createTodoItemDto.name,
      description: createTodoItemDto.description,
      completed: createTodoItemDto.completed || false,
    };

    return this.todoListsService.add_item(todoListId, todoItem);
  }

  findAll() {
    return `This action returns all todoItems`;
  }

  findOne(id: number) {
    return `This action returns a #${id} todoItem`;
  }

  update(id: number, updateTodoItemDto: UpdateTodoItemDto) {
    return `This action updates a #${id} todoItem`;
  }

  remove(id: number) {
    return `This action removes a #${id} todoItem`;
  }

  private nextItemId(listId: number): number {
    const todoList = this.todoListsService.get(listId);
    const items = todoList.items;
    const last = items
      .map((x) => x.id)
      .sort()
      .reverse()[0];

    return last ? last + 1 : 1;
  }
}
