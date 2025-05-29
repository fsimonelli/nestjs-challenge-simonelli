import { Module } from '@nestjs/common';
import { TodoListsModule } from './todo_lists/todo_lists.module';
import { McpModule, McpTransportType } from '@rekog/mcp-nest';
import { TodoItemsModule } from './todo_items/todo_items.module';
import { ToolsModule } from './mcp_tools_resources/tools/tools.module';

@Module({
  imports: [
    TodoListsModule,
    TodoItemsModule,
    ToolsModule,
    McpModule.forRoot({
      name: 'my-mcp-server',
      version: '1.0.0',
      transport: McpTransportType.STDIO,
    }),
  ],
  controllers: [],
})
export class AppModule {}
