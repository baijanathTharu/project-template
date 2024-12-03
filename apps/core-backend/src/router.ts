import { initServer } from '@ts-rest/express';
import { Todo, todoContract } from '@libs/core-contract/index';

const s = initServer();

const todos: Todo[] = [
  {
    id: '1',
    title: 'title1',
    completed: false,
  },
  {
    id: '2',
    title: 'title2',
    completed: false,
  },
];

export const todoRouter = s.router(todoContract, {
  getTodos: async () => {
    return {
      status: 200,
      body: {
        data: todos,
        isSuccess: true,
        message: 'success',
      },
    };
  },
  getTodo: async ({ params }) => {
    const todo = todos.find((todo) => todo.id === params.id);
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
        data: todo,
        isSuccess: true,
        message: 'success',
      },
    };
  },
  createTodo: async ({ body }) => {
    const todo: Todo = {
      ...body,
      id: String(todos.length + 1),
    };
    todos.push(todo);
    return {
      status: 201,
      body: {
        data: todo,
        isSuccess: true,
        message: 'success',
      },
    };
  },

  updateTodo: async ({ params, body }) => {
    const todo = todos.find((todo) => todo.id === params.id);
    if (!todo) {
      return {
        status: 404,
        body: {
          message: 'todo not found',
          isSuccess: false,
        },
      };
    }
    todo.title = body.title;
    todo.completed = body.completed;
    return {
      status: 200,
      body: {
        data: todo,
        isSuccess: true,
        message: 'success',
      },
    };
  },

  deleteTodo: async ({ params }) => {
    const todo = todos.find((todo) => todo.id === params.id);
    if (!todo) {
      return {
        status: 404,
        body: {
          message: 'todo not found',
          isSuccess: false,
        },
      };
    }
    todos.splice(todos.indexOf(todo), 1);
    return {
      status: 200,
      body: {
        data: todo,
        isSuccess: true,
        message: 'success',
      },
    };
  },
});
