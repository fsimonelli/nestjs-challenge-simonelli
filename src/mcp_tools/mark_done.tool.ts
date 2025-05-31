import { Injectable } from '@nestjs/common';
import { Tool } from '@rekog/mcp-nest';
import { z } from 'zod';
import { TodoListsService } from 'src/todo_lists/todo_lists.service';
import { TodoItemsService } from 'src/todo_items/todo_items.service';

@Injectable()
export class MarkDoneTool {
  constructor(
    private readonly todoListsService: TodoListsService,
    private readonly todoItemsService: TodoItemsService,
  ) {}
  @Tool({
    name: 'mark-done',
    description: 'Mark a todo item as done',
    parameters: z.object({
      todoListName: z.string(),
      itemName: z.string(),
    }),
  })
  async markDone({ todoListName, itemName }) {
    const todoList = this.todoListsService.getByName(todoListName);
    if (!todoList) {
      return {
        content: [
          {
            type: 'text',
            text: `Todo list with name ${todoListName} not found.`,
          },
        ],
      };
    }
    const todoItem = this.todoItemsService.findOneByName(todoList.id, itemName);
    if (!todoItem) {
      return {
        content: [
          {
            type: 'text',
            text: `Todo item with name ${itemName} not found in list ${todoListName}.`,
          },
        ],
      };
    }
    this.todoItemsService.markAsDone(todoList.id, todoItem.id);
    return {
      content: [
        {
          type: 'text',
          text: `Todo item with name ${itemName} marked as done in list ${todoListName}.`,
        },
      ],
    };
  }
}
