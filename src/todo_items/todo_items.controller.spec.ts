import { Test, TestingModule } from '@nestjs/testing';
import { TodoItemsController } from './todo_items.controller';
import { TodoItemsService } from './todo_items.service';
import { TodoListsService } from '../todo_lists/todo_lists.service';

describe('TodoItemsController', () => {
  let todoItemController: TodoItemsController;
  let todoItemService: TodoItemsService;
  let todoListsService: TodoListsService;

  beforeEach(async () => {
    todoListsService = new TodoListsService([
      { id: 1, name: 'Trabajo' },
      { id: 2, name: 'Supermercado' },
    ]);

    const todoItemsMap = new Map([
      [
        1,
        new Map([
          [
            1,
            {
              id: 1,
              todoListId: 1,
              name: 'Mandar mail',
              description: 'Tener en cuenta diferencia horaria',
              completed: false,
            },
          ],
          [
            2,
            {
              id: 2,
              todoListId: 1,
              name: 'Reunión con el equipo',
              description: 'Por Google Meet',
              completed: false,
            },
          ],
        ]),
      ],
      [
        2,
        new Map([
          [
            1,
            {
              id: 1,
              todoListId: 2,
              name: 'Comprar pan',
              description: 'Pan blanco o integral',
              completed: false,
            },
          ],
          [
            2,
            {
              id: 2,
              todoListId: 2,
              name: 'Comprar leche',
              description: 'Entera o descremada',
              completed: false,
            },
          ],
        ]),
      ],
    ]);
    todoItemService = new TodoItemsService(todoListsService, todoItemsMap);

    const module: TestingModule = await Test.createTestingModule({
      controllers: [TodoItemsController],
      providers: [
        { provide: TodoItemsService, useValue: todoItemService },
        { provide: TodoListsService, useValue: todoListsService },
      ],
    }).compile();

    todoItemController = module.get<TodoItemsController>(TodoItemsController);
    todoItemService = module.get<TodoItemsService>(TodoItemsService);
  });

  describe('create', () => {
    it('should create a new todo item in the specified todo list', () => {
      const createTodoItemDto = {
        name: 'Comprar huevos',
        description: 'De gallinas felices',
        completed: false,
      };
      const result = todoItemController.create(
        { todoListId: 2 },
        createTodoItemDto,
      );
      expect(result).toEqual({
        id: 3,
        todoListId: 2,
        name: 'Comprar huevos',
        description: 'De gallinas felices',
        completed: false,
      });
    });
  });
});
