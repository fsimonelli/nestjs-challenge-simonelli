import { Module } from '@nestjs/common';
import { TodoItemsService } from './todo_items.service';
import { TodoItemsController } from './todo_items.controller';
import { TodoListsModule } from 'src/todo_lists/todo_lists.module';

@Module({
  controllers: [TodoItemsController],
  providers: [TodoItemsService],
  imports: [TodoListsModule],
})
export class TodoItemsModule {}
