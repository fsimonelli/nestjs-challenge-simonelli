import { Injectable } from '@nestjs/common';
import { Tool } from '@rekog/mcp-nest';
import { z } from 'zod';
import { TodoListsService } from 'src/todo_lists/todo_lists.service';
import { TodoItemsService } from 'src/todo_items/todo_items.service';

@Injectable()
export class ItemCreationTool {
  constructor(
    private readonly todoListsService: TodoListsService,
    private readonly todoItemsService: TodoItemsService,
  ) {}

  @Tool({
    name: 'create-item',
    description: 'Create a new item in a todo list',
    parameters: z.object({
      name: z.string(),
      description: z.string(),
      todoListName: z.string(),
    }),
  })
  async createItem({ name, description, todoListName }) {
    const todoList = this.todoListsService.getByName(todoListName);
    if (!todoList) {
      throw new Error(`Todo list with name ${todoListName} not found`);
    }

    const createdItem = this.todoItemsService.create(todoList.id, {
      name,
      description,
    });

    return {
      content: [
        {
          type: 'text',
          text: `Item created: ${createdItem.name} of id ${createdItem.id}, in list ${todoList.name} of id ${todoList.id}`,
        },
      ],
    };
  }
}
