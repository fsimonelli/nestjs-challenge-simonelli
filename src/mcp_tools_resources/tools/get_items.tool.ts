import { Injectable } from '@nestjs/common';
import { Tool } from '@rekog/mcp-nest';
import { TodoListsService } from 'src/todo_lists/todo_lists.service';
import { TodoItemsService } from 'src/todo_items/todo_items.service';
import { z } from 'zod';

@Injectable()
export class GetItemsTool {
  constructor(
    private readonly todoListsService: TodoListsService,
    private readonly todoItemsService: TodoItemsService,
  ) {}

  @Tool({
    name: 'get-items',
    description: 'Get every todo item in a todo list',
    parameters: z.object({
      todoListName: z.string(),
    }),
  })
  async getItems({ todoListName }) {
    const todoList = this.todoListsService.getByName(todoListName);
    if (!todoList) {
      return {
        content: [
          {
            type: 'text',
            text: 'Todo list of name ' + todoListName + ' not found.',
          },
        ],
      };
    }
    const todoItems = this.todoItemsService.findAll(todoList.id);
    return {
      content: [
        {
          type: 'text',
          text: `Found ${todoItems.length} todo items:${todoItems
            .map(
              (item) =>
                `ID: ${item.id} Name: ${item.name} Description: ${item.description} Completed: ${item.completed}`,
            )
            .join('\n')}`,
        },
      ],
    };
  }
}
