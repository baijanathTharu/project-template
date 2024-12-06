import { db } from '../db';
import { NewUser, User, UserUpdate } from '../types';

async function findById(id: string) {
  return await db
    .selectFrom('user')
    .where('id', '=', id)
    .selectAll()
    .executeTakeFirst();
}

async function findByEmail(email: string) {
  return await db
    .selectFrom('user')
    .where('email', '=', email)
    .selectAll()
    .executeTakeFirst();
}

async function findMany(criteria: Partial<User>) {
  let query = db.selectFrom('user');

  if (criteria.id) {
    query = query.where('id', '=', criteria.id); // Kysely is immutable, you must re-assign!
  }

  if (criteria.name) {
    query = query.where('name', '=', criteria.name);
  }

  if (criteria.email) {
    query = query.where('email', '=', criteria.email);
  }

  if (criteria.created_at) {
    query = query.where('created_at', '=', criteria.created_at);
  }
  if (criteria.updated_at) {
    query = query.where('updated_at', '=', criteria.updated_at);
  }

  return await query.selectAll().execute();
}

async function updateById(id: string, updateWith: UserUpdate) {
  await db.updateTable('user').set(updateWith).where('id', '=', id).execute();
}

async function updateByEmail(email: string, updateWith: UserUpdate) {
  await db
    .updateTable('user')
    .set(updateWith)
    .where('email', '=', email)
    .execute();
}

async function create(user: NewUser) {
  return await db
    .insertInto('user')
    .values(user)
    .returningAll()
    .executeTakeFirstOrThrow();
}

async function updatePasswordByEmail(email: string, hashedPassword: string) {
  return await db
    .updateTable('user')
    .set({ password: hashedPassword })
    .where('email', '=', email)
    .returningAll()
    .executeTakeFirst();
}

async function deleteById(id: string) {
  return await db
    .deleteFrom('user')
    .where('id', '=', id)
    .returningAll()
    .executeTakeFirst();
}

export const userRepo = {
  findById,
  findByEmail,
  findMany,
  updateById,
  updateByEmail,
  create,
  deleteById,
  updatePasswordByEmail,
};
