import {
  TForgotPasswordResponseCodes,
  TLoginResponseCodes,
  TLogoutResponseCodes,
  TMeResponseCodes,
  TRefreshResponseCodes,
  TResetPasswordResponseCodes,
  TSendOtpResponseCodes,
  TSignUpResponseCodes,
  TValidateTokenResponseCodes,
  TVerifyEmailResponseCodes,
} from '@libs/core-contract/auth';
import { env } from '../../app/env';

export type TSignUpInput = {
  email: string;
  name: string;
  password: string;
};
export type TSignUpOutput = {
  message: string;
  code: TSignUpResponseCodes;
};
export async function signUp(input: TSignUpInput): Promise<TSignUpOutput> {
  const res = await fetch(`${env.VITE_BACKEND_URL}/v1/auth/signup`, {
    method: 'POST',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      name: input.name,
      email: input.email,
      password: input.password,
    }),
  });

  const data = await res.json();

  return data;
}

export type TLoginInput = {
  email: string;
  password: string;
};
export type TLoginOutput = {
  message: string;
  code: TLoginResponseCodes;
};
export async function login(input: TLoginInput): Promise<TLoginOutput> {
  const res = await fetch(`${env.VITE_BACKEND_URL}/v1/auth/login`, {
    method: 'POST',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      email: input.email,
      password: input.password,
    }),
  });

  const data = await res.json();

  return data;
}

export type TMeOutput = {
  message: string;
  code: TMeResponseCodes | TValidateTokenResponseCodes;
  accessToken: string;
  data: {
    me: {
      name: string;
      email: string;
    };
    token: {
      name: string;
      email: string;
      iat: number;
      exp: number;
    };
  };
};

export async function me(): Promise<TMeOutput> {
  const res = await fetch(`${env.VITE_BACKEND_URL}/v1/auth/me`, {
    method: 'GET',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  const data = await res.json();

  return data;
}

export type TLogoutOutput = {
  message: string;
  code: TLogoutResponseCodes;
};

export async function logout(): Promise<TLogoutOutput> {
  const res = await fetch(`${env.VITE_BACKEND_URL}/v1/auth/logout`, {
    method: 'POST',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  const data = await res.json();

  return data;
}

export type TSendOtpInput = {
  email: string;
};
export type TSendOtpOutput = {
  message: string;
  code: TSendOtpResponseCodes;
};

export async function sendOtp(input: TSendOtpInput): Promise<TSendOtpOutput> {
  const res = await fetch(`${env.VITE_BACKEND_URL}/v1/auth/send-otp`, {
    method: 'POST',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      email: input.email,
    }),
  });

  const data = await res.json();

  return data;
}

export type TVerifyEmailInput = {
  email: string;
  otp: string;
};
export type TVerifyEmailOutput = {
  message: string;
  code: TVerifyEmailResponseCodes;
};
export async function verifyEmail(
  input: TVerifyEmailInput
): Promise<TVerifyEmailOutput> {
  const res = await fetch(`${env.VITE_BACKEND_URL}/v1/auth/verify-email`, {
    method: 'POST',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      email: input.email,
      otp: input.otp,
    }),
  });

  const data = await res.json();

  return data;
}

export type TForgotPasswordInput = {
  email: string;
  otp: string;
  newPassword: string;
};
export type TForgotPasswordOutput = {
  message: string;
  code: TForgotPasswordResponseCodes;
};
export async function forgotPassword(
  input: TForgotPasswordInput
): Promise<TForgotPasswordOutput> {
  const res = await fetch(`${env.VITE_BACKEND_URL}/v1/auth/forgot-password`, {
    method: 'POST',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      email: input.email,
      otp: input.otp,
      newPassword: input.newPassword,
    }),
  });

  const data = await res.json();

  return data;
}

export type TRefreshTokenOutput = {
  message: string;
  code: TRefreshResponseCodes;
};

export async function refreshToken(): Promise<TRefreshTokenOutput> {
  const res = await fetch(`${env.VITE_BACKEND_URL}/v1/auth/refresh`, {
    method: 'POST',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  const data = await res.json();

  return data;
}

export type TResetPasswordInput = {
  oldPassword: string;
  newPassword: string;
};

export type TResetPasswordOutput = {
  message: string;
  code: TValidateTokenResponseCodes | TResetPasswordResponseCodes;
};

export async function resetPassword(): Promise<TResetPasswordOutput> {
  const res = await fetch(`${env.VITE_BACKEND_URL}/v1/auth/reset-password`, {
    method: 'POST',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  const data = await res.json();

  return data;
}
