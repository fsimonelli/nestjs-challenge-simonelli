import { Module } from '@nestjs/common';
import { ItemCreationTool } from './item_creation.tool';
import { GetListsResource } from '../resources/get_lists.resource';
import { GetItemsTool } from './get_items.tool';
import { MarkDoneTool } from './mark_done.tool';
import { TodoItemsModule } from '../../todo_items/todo_items.module';
import { TodoListsModule } from '../../todo_lists/todo_lists.module';

@Module({
  imports: [TodoItemsModule, TodoListsModule],
  providers: [ItemCreationTool, GetListsResource, GetItemsTool, MarkDoneTool],
  exports: [ItemCreationTool, GetListsResource, GetItemsTool, MarkDoneTool],
})
export class ToolsModule {}
