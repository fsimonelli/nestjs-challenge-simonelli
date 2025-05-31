import { Module } from '@nestjs/common';
import { ItemCreationTool } from './item_creation.tool';
import { ListCreationTool } from './list_creation.tool';
import { GetItemsTool } from './get_items.tool';
import { GetListsTool } from './get_lists.tool';
import { MarkDoneTool } from './mark_done.tool';
import { ItemDeletionTool } from './delete_item.tool';
import { TodoItemsModule } from '../todo_items/todo_items.module';
import { TodoListsModule } from '../todo_lists/todo_lists.module';

@Module({
  imports: [TodoItemsModule, TodoListsModule],
  providers: [
    ItemCreationTool,
    ListCreationTool,
    GetItemsTool,
    GetListsTool,
    MarkDoneTool,
    ItemDeletionTool,
  ],
  exports: [
    ItemCreationTool,
    ListCreationTool,
    GetItemsTool,
    GetListsTool,
    MarkDoneTool,
    ItemDeletionTool,
  ],
})
export class ToolsModule {}
