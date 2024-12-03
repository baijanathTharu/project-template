import { db } from '../db';
import { TodoUpdate, Todo, NewTodo } from '../types';

async function findTodoById(id: number) {
  return await db
    .selectFrom('todo')
    .where('id', '=', id)
    .selectAll()
    .executeTakeFirst();
}

async function findTodo(criteria: Partial<Todo>) {
  let query = db.selectFrom('todo');

  if (criteria.id) {
    query = query.where('id', '=', criteria.id); // Kysely is immutable, you must re-assign!
  }

  if (criteria.name) {
    query = query.where('name', '=', criteria.name);
  }

  if (criteria.is_completed) {
    query = query.where('is_completed', '=', criteria.is_completed);
  }

  if (criteria.created_at) {
    query = query.where('created_at', '=', criteria.created_at);
  }

  return await query.selectAll().execute();
}

async function updateTodo(id: number, updateWith: TodoUpdate) {
  await db.updateTable('todo').set(updateWith).where('id', '=', id).execute();
}

async function createTodo(todo: NewTodo) {
  return await db
    .insertInto('todo')
    .values(todo)
    .returningAll()
    .executeTakeFirstOrThrow();
}

async function deleteTodo(id: number) {
  return await db
    .deleteFrom('todo')
    .where('id', '=', id)
    .returningAll()
    .executeTakeFirst();
}

export const todoRepo = {
  findTodoById,
  findTodo,
  updateTodo,
  createTodo,
  deleteTodo,
};
