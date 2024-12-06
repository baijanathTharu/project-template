import { initServer } from '@ts-rest/express';
import { todoContract } from '@libs/core-contract/index';
import { todoRepo } from '@libs/prisma-db/repositories/todo-repo';

const s = initServer();

export const todoRouter = s.router(todoContract, {
  getTodos: async () => {
    const todos = await todoRepo.findAll({});

    return {
      status: 200,
      body: {
        data: todos.map((t) => {
          return {
            id: t.id,
            title: t.title,
            completed: t.is_completed,
          };
        }),
        isSuccess: true,
        message: 'success',
      },
    };
  },
  getTodo: async ({ params }) => {
    const todo = await todoRepo.findById(params.id);

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
          title: todo.title,
          completed: todo.is_completed,
        },
        isSuccess: true,
        message: 'success',
      },
    };
  },
  createTodo: async ({ body }) => {
    const todo = await todoRepo.create({
      title: body.title,
      is_completed: body.completed,
    });
    return {
      status: 201,
      body: {
        data: {
          id: todo.id,
          title: todo.title,
          completed: todo.is_completed,
        },
        isSuccess: true,
        message: 'success',
      },
    };
  },

  updateTodo: async ({ params, body }) => {
    const todo = await todoRepo.findById(params.id);

    if (!todo) {
      return {
        status: 404,
        body: {
          message: 'todo not found',
          isSuccess: false,
        },
      };
    }

    await todoRepo.updateById(params.id, {
      title: body.title,
      is_completed: body.completed,
    });

    return {
      status: 200,
      body: {
        data: {
          id: todo.id,
          title: todo.title,
          completed: todo.is_completed,
        },
        isSuccess: true,
        message: 'success',
      },
    };
  },

  deleteTodo: async ({ params }) => {
    const todo = await todoRepo.findById(params.id);

    if (!todo) {
      return {
        status: 404,
        body: {
          message: 'todo not found',
          isSuccess: false,
        },
      };
    }

    await todoRepo.deleteById(params.id);

    return {
      status: 200,
      body: {
        data: {
          id: todo.id,
          title: todo.title,
          completed: todo.is_completed,
        },
        isSuccess: true,
        message: 'success',
      },
    };
  },
});
