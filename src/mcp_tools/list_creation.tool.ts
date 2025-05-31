import { Injectable } from '@nestjs/common';
import { Tool } from '@rekog/mcp-nest';
import { z } from 'zod';
import { TodoListsService } from 'src/todo_lists/todo_lists.service';

@Injectable()
export class ListCreationTool {
  constructor(private readonly todoListsService: TodoListsService) {}

  @Tool({
    name: 'create-list',
    description: 'Create a new list',
    parameters: z.object({
      name: z.string(),
    }),
  })
  async createList({ name }) {
    const todoList = this.todoListsService.create({ name });

    return {
      content: [
        {
          type: 'text',
          text: `List ${todoList.name} of id ${todoList.id} created`,
        },
      ],
    };
  }
}
