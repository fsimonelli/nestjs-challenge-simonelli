import { Module } from '@nestjs/common';
import { TodoItemsService } from './todo_items.service';
import { TodoItemsController } from './todo_items.controller';
import { TodoListsModule } from 'src/todo_lists/todo_lists.module';
import { TodoItem } from 'src/interfaces/todo_item.interface';

@Module({
  controllers: [TodoItemsController],
  providers: [
    {
      provide: 'TODO_ITEMS_MAP',
      useValue: new Map<number, Map<number, TodoItem>>(),
    },
    TodoItemsService,
  ],
  imports: [TodoListsModule],
  exports: [TodoItemsService, 'TODO_ITEMS_MAP'],
})
export class TodoItemsModule {}
