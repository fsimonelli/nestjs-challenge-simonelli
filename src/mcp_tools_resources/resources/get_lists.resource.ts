import { Injectable } from '@nestjs/common';
import { Resource } from '@rekog/mcp-nest';
import { TodoListsService } from 'src/todo_lists/todo_lists.service';

@Injectable()
export class GetListsResource {
  constructor(private readonly todoListsService: TodoListsService) {}

  @Resource({
    uri: 'mcp://get-lists',
    name: 'get-lists',
    description: 'Get existing todo lists',
    mimeType: 'text/plain',
  })
  async getLists() {
    return this.todoListsService.all();
  }
}
