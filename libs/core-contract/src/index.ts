import { initContract } from '@ts-rest/core';
import { z } from 'zod';

const c = initContract();

const ErrorSchema = z.object({
  message: z.string(),
  isSuccess: z.boolean(),
});

const SuccessSchema = z.object({
  message: z.string(),
  isSuccess: z.boolean(),
});

export const TodoSchema = z.object({
  id: z.string(),
  title: z.string(),
  completed: z.boolean(),
});
export type Todo = z.infer<typeof TodoSchema>;

export const todoContract = c.router({
  getTodos: {
    method: 'GET',
    path: '/todos',
    responses: {
      200: SuccessSchema.extend({
        data: z.array(TodoSchema),
      }),
      400: ErrorSchema,
      500: ErrorSchema,
    },
    summary: 'Get all todos',
  },
  getTodo: {
    method: 'GET',
    path: '/todos/:id',
    responses: {
      200: SuccessSchema.extend({
        data: TodoSchema,
      }),
      400: ErrorSchema,
      404: ErrorSchema,
      500: ErrorSchema,
    },
    summary: 'Get todo by id',
  },
  createTodo: {
    method: 'POST',
    path: '/todos',
    body: TodoSchema,
    responses: {
      201: SuccessSchema.extend({
        data: TodoSchema,
      }),
      400: ErrorSchema,
      500: ErrorSchema,
    },
    summary: 'Create todo',
  },
  updateTodo: {
    method: 'PUT',
    path: '/todos/:id',
    body: TodoSchema.omit({ id: true }),
    responses: {
      200: SuccessSchema.extend({
        data: TodoSchema,
      }),
      400: ErrorSchema,
      404: ErrorSchema,
      500: ErrorSchema,
    },
    summary: 'Update todo by id',
  },
  deleteTodo: {
    method: 'POST',
    body: z.object({}),
    path: '/todos/:id',
    responses: {
      200: SuccessSchema.extend({
        data: TodoSchema,
      }),
      400: ErrorSchema,
      404: ErrorSchema,
      500: ErrorSchema,
    },
    summary: 'Delete todo by id',
  },
});
