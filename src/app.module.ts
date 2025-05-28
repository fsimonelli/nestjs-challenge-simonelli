import { Module } from '@nestjs/common';
import { TodoListsModule } from './todo_lists/todo_lists.module';
import { McpModule, McpTransportType } from '@rekog/mcp-nest';
import { TodoItemsModule } from './todo_items/todo_items.module';
import { ItemCreationTool } from './tools/item_creation.tool';

@Module({
  imports: [
    TodoListsModule,
    TodoItemsModule,
    McpModule.forRoot({
      name: 'my-mcp-server',
      version: '1.0.0',
      transport: McpTransportType.STDIO,
    }),
  ],
  controllers: [],
  providers: [ItemCreationTool],
})
export class AppModule {}
