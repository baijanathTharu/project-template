import { initServer } from '@ts-rest/express';
import { todoContract } from '@libs/core-contract/index';
import { todoRepo } from '@libs/kysely-db/repositories/todo-repo';

const s = initServer();

export const todoRouter = s.router(todoContract, {
  getTodos: async () => {
    const todos = await todoRepo.findTodo({});

    return {
      status: 200,
      body: {
        data: todos.map((t) => {
          return {
            id: t.id,
            title: t.name,
            completed: t.is_completed,
          };
        }),
        isSuccess: true,
        message: 'success',
      },
    };
  },
  getTodo: async ({ params }) => {
    const todo = await todoRepo.findTodoById(Number(params.id));

    if (!todo) {
      return {
        status: 404,
        body: {
          message: 'todo not found',
          isSuccess: false,
        },
      };
    }
    return {
      status: 200,
      body: {
        data: {
          id: todo.id,
          title: todo.name,
          completed: todo.is_completed,
        },
        isSuccess: true,
        message: 'success',
      },
    };
  },
  createTodo: async ({ body }) => {
    const todo = await todoRepo.createTodo({
      name: body.title,
      is_completed: body.completed,
    });
    return {
      status: 201,
      body: {
        data: {
          id: todo.id,
          title: todo.name,
          completed: todo.is_completed,
        },
        isSuccess: true,
        message: 'success',
      },
    };
  },

  updateTodo: async ({ params, body }) => {
    const todo = await todoRepo.findTodoById(Number(params.id));

    if (!todo) {
      return {
        status: 404,
        body: {
          message: 'todo not found',
          isSuccess: false,
        },
      };
    }

    await todoRepo.updateTodo(Number(params.id), {
      name: body.title,
      is_completed: body.completed,
    });

    return {
      status: 200,
      body: {
        data: {
          id: todo.id,
          title: todo.name,
          completed: todo.is_completed,
        },
        isSuccess: true,
        message: 'success',
      },
    };
  },

  deleteTodo: async ({ params }) => {
    const todo = await todoRepo.findTodoById(Number(params.id));

    if (!todo) {
      return {
        status: 404,
        body: {
          message: 'todo not found',
          isSuccess: false,
        },
      };
    }

    await todoRepo.deleteTodo(Number(params.id));

    return {
      status: 200,
      body: {
        data: {
          id: todo.id,
          title: todo.name,
          completed: todo.is_completed,
        },
        isSuccess: true,
        message: 'success',
      },
    };
  },
});
