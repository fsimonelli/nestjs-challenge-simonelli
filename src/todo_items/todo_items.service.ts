import { Injectable, Inject } from '@nestjs/common';
import { TodoListsService } from '../todo_lists/todo_lists.service';
import { CreateTodoItemDto } from './dto/create-todo_item.dto';
import { UpdateTodoItemDto } from './dto/update-todo_item.dto';
import { TodoItem } from 'src/interfaces/todo_item.interface';

@Injectable()
export class TodoItemsService {
  constructor(
    @Inject('TODO_ITEMS_MAP')
    private readonly todoItems: Map<number, Map<number, TodoItem>>,
    private readonly todoListsService: TodoListsService,
  ) {}

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
    return this.todoItems.get(todoListId).get(todoItem.id);
  }

  findAll(todolistId: number) {
    if (!this.todoListsService.has(todolistId)) {
      throw new Error(`Todo list with ID ${todolistId} not found`);
    }
    const todoList = this.todoItems.get(todolistId);
    const res = [];
    if (todoList) {
      todoList.forEach((item) => res.push(item));
    }
    return res;
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

  findOneByName(todoListId: number, name: string) {
    if (!this.todoListsService.has(todoListId)) {
      throw new Error(`Todo list with ID ${todoListId} not found`);
    }
    const todoList = this.todoItems.get(todoListId);
    const todoItem = Array.from(todoList.values()).find(
      (item) => item.name === name,
    );
    if (!todoItem) {
      throw new Error(
        `Todo item with name "${name}" not found in list ${todoListId}`,
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
    this.todoItems.get(todoListId).set(Number(itemId), {
      ...item,
      ...updateTodoItemDto,
    });
    return this.todoItems.get(todoListId).get(Number(itemId));
  }

  markAsDone(todoListId: number, itemId: number) {
    this.update(todoListId, itemId, { completed: true });
    return this.todoItems.get(todoListId).get(Number(itemId));
  }

  remove(todoListId: number, itemId: number): { message: string } {
    if (!this.todoListsService.has(todoListId)) {
      throw new Error(`Todo list with ID ${todoListId} not found`);
    }
    const todoList = this.todoItems.get(todoListId);
    if (!todoList.has(Number(itemId))) {
      throw new Error(
        `Todo item with ID ${itemId} not found in list ${todoListId}`,
      );
    }
    todoList.delete(Number(itemId));
    return {
      message: `Todo item with ID ${itemId} removed from list ${todoListId}`,
    };
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
