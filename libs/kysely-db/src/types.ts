import {
  ColumnType,
  Generated,
  Insertable,
  Selectable,
  Updateable,
} from 'kysely';

export interface Database {
  todo: TodoTable;
  user: UserTable;
  auth_otp: AuthOtpTable;
}

export interface TodoTable {
  id: Generated<number>;
  name: string;
  is_completed: boolean;
  created_at: ColumnType<Date, string | undefined, never>;
}

export type Todo = Selectable<TodoTable>;
export type NewTodo = Insertable<TodoTable>;
export type TodoUpdate = Updateable<TodoTable>;

export interface UserTable {
  id: string;
  name: string;
  email: string;
  password: string;
  is_email_verified: boolean;
  updated_at: ColumnType<Date, string | undefined, never>;
  created_at: ColumnType<Date, string | undefined, never>;
}

export type User = Selectable<UserTable>;
export type NewUser = Insertable<UserTable>;
export type UserUpdate = Updateable<UserTable>;

export interface AuthOtpTable {
  id: string;
  user_id: string;
  code: string;
  updated_at: ColumnType<Date, string | undefined, never>;
  created_at: ColumnType<Date, string | undefined, never>;
}

export type AuthOtp = Selectable<AuthOtpTable>;
export type NewAuthOtp = Insertable<AuthOtpTable>;
export type AuthOtpUpdate = Updateable<AuthOtpTable>;
