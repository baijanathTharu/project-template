import { TConfig } from '@baijanstack/express-auth';

export const authConfig: TConfig = {
  BASE_PATH: '/v1/auth', // base path for authentication
  SALT_ROUNDS: Number(process.env['SALT_ROUNDS']) || 10, // number of rounds for password hashing
  TOKEN_SECRET: process.env['TOKEN_SECRET'] || '', // secret for token generation
  ACCESS_TOKEN_AGE: Number(process.env['ACCESS_TOKEN_AGE']) || 60000, // age of access token in milliseconds
  REFRESH_TOKEN_AGE: Number(process.env['REFRESH_TOKEN_AGE']) || 86400000, // age of refresh token in milliseconds
  EMAIL_VERIFICATION_TOKEN_AGE:
    Number(process.env['EMAIL_VERIFICATION_TOKEN_AGE']) || 86400000, // age of email verification token in milliseconds
};
