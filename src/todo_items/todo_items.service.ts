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
  private readonly todoItems: Map<number, Map<number, TodoItem>> = new Map();

  create(todoListId: number, createTodoItemDto: CreateTodoItemDto) {
    if (!this.todoListsService.has(todoListId)) {
      throw new Error(`Todo list with ID ${todoListId} not found`);
    }

    if (!this.todoItems.has(todoListId)) {
      this.todoItems.set(todoListId, new Map());
    }

    const todoItem: TodoItem = {
      id: this.nextItemId(todoListId),
      todoListId: todoListId,
      name: createTodoItemDto.name,
      description: createTodoItemDto.description,
      completed: createTodoItemDto.completed || false,
    };

    this.todoItems.get(todoListId).set(todoItem.id, todoItem);
    return this.todoItems;
  }

  findAll() {
    return `This action returns all todoItems`;
  }

  findOne(todoListId: number, itemId: number) {
    if (!this.todoListsService.has(todoListId)) {
      throw new Error(`Todo list with ID ${todoListId} not found`);
    }
    const todoList = this.todoItems.get(todoListId);
    const todoItem = todoList.get(Number(itemId));
    if (!todoItem) {
      throw new Error(
        `Todo item with ID ${itemId} not found in list ${todoListId}`,
      );
    }
    return todoItem;
  }

  update(
    todoListId: number,
    itemId: number,
    updateTodoItemDto: UpdateTodoItemDto,
  ) {
    const item = this.findOne(todoListId, itemId);
    this.todoItems.get(todoListId).set(itemId, {
      ...item,
      ...updateTodoItemDto,
    });
    return this.todoItems.get(todoListId).get(itemId);
  }

  remove(id: number) {
    return `This action removes a #${id} todoItem`;
  }

  private nextItemId(listId: number): number {
    const items = this.todoItems.get(listId);
    if (!items || items.size === 0) {
      return 1;
    }
    const ids = Array.from(items.keys());
    const max = ids.length > 0 ? Math.max(...ids) : null;
    return max + 1;
  }
}
