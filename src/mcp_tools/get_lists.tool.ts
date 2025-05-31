import { Injectable } from '@nestjs/common';
import { Tool } from '@rekog/mcp-nest';
import { TodoListsService } from 'src/todo_lists/todo_lists.service';

@Injectable()
export class GetListsTool {
  constructor(private readonly todoListsService: TodoListsService) {}

  @Tool({
    name: 'get-lists',
    description: 'Get every todo list',
  })
  async getLists() {
    const todoLists = this.todoListsService.all();
    if (!todoLists) {
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
          text: JSON.stringify(todoLists, null, 2),
        },
      ],
    };
  }
}
