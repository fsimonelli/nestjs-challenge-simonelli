import { Injectable } from '@nestjs/common';
import { Tool } from '@rekog/mcp-nest';
import { z } from 'zod';
import { TodoListsService } from 'src/todo_lists/todo_lists.service';
import { TodoItemsService } from 'src/todo_items/todo_items.service';

@Injectable()
export class ItemDeletionTool {
  constructor(
    private readonly todoListsService: TodoListsService,
    private readonly todoItemsService: TodoItemsService,
  ) {}

  @Tool({
    name: 'delete-item',
    description: 'Delete an existing item in a todo list',
    parameters: z.object({
      name: z.string(),
      todoListName: z.string(),
    }),
  })
  async deleteItem({ name, todoListName }) {
    const todoList = this.todoListsService.getByName(todoListName);
    if (!todoList) {
      throw new Error(`Todo list with name ${todoListName} not found`);
    }

    const itemToDelete = this.todoItemsService.findOneByName(todoList.id, name);
    if (!itemToDelete) {
      return {
        content: [
          {
            type: 'text',
            text: `Todo item with name ${name} not found in list ${todoListName}.`,
          },
        ],
      };
    }

    this.todoItemsService.remove(todoList.id, itemToDelete.id);

    return {
      content: [
        {
          type: 'text',
          text: `Todo item with name ${name} has been deleted from list ${todoListName}.`,
        },
      ],
    };
  }
}
