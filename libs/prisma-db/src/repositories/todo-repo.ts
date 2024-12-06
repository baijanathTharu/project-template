import { Prisma } from '@prisma/client';
import { db } from '../client';

export const todoRepo = {
  create,
  updateById,
  deleteById,
  findById,
  findAll,
  updateTodo,
};

async function create(input: Prisma.TodoCreateInput) {
  return db.todo.create({
    data: input,
  });
}

async function updateById(id: string, input: Prisma.TodoUpdateInput) {
  return db.todo.update({
    where: {
      id,
    },
    data: input,
  });
}

async function deleteById(id: string) {
  return db.todo.delete({
    where: {
      id,
    },
  });
}

async function findById(id: string) {
  return db.todo.findUnique({
    where: {
      id,
    },
  });
}
async function findAll(input: Prisma.TodoWhereInput) {
  return db.todo.findMany({
    where: input,
  });
}
async function updateTodo(id: string, input: Prisma.TodoUpdateInput) {
  await db.todo.update({
    where: {
      id,
    },
    data: input,
  });
}
