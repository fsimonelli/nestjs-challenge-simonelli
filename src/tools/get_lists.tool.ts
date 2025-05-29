import { Injectable } from '@nestjs/common';
import { Tool } from '@rekog/mcp-nest';
import { TodoListsService } from 'src/todo_lists/todo_lists.service';

@Injectable()
export class GetListsTool {
  constructor(private readonly todoListsService: TodoListsService) {}

  @Tool({
    name: 'get-lists',
    description: 'Get existing todo lists',
  })
  async getLists() {
    const todoLists = this.todoListsService.all();
    if (todoLists.length === 0) {
      return {
        content: [
          {
            type: 'text',
            text: 'No todo lists found.',
          },
        ],
      };
    }
    return {
      content: [
        {
          type: 'text',
          text: `Found ${todoLists.length} todo lists: ${todoLists
            .map((list) => `${list.name} (ID: ${list.id})`)
            .join(', ')}`,
        },
      ],
    };
  }
}
