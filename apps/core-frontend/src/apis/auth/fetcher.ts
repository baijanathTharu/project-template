import { env } from '../../app/env';

export type TSignUpInput = {
  email: string;
  name: string;
  password: string;
};
export type TSignUpOutput = {
  message: string;
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
  if (!res.ok) {
    console.error(data);
    throw new Error(
      data.message ||
        'Something went wrong! Please check console for more details.'
    );
  }

  return data;
}

export type TLoginInput = {
  email: string;
  password: string;
};
export type TLoginOutput = {
  message: string;
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
  if (!res.ok) {
    console.error(data);
    throw new Error(
      data.message ||
        'Something went wrong! Please check console for more details.'
    );
  }

  return data;
}

export type TMeOutput = {
  data: {
    email: string;
    name: string;
    iat: number;
    exp: number;
  };
  me: {
    name: string;
    email: string;
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
  if (!res.ok) {
    console.error(data);
    throw new Error(
      data.message ||
        'Something went wrong! Please check console for more details.'
    );
  }

  return data;
}

export type TLogoutOutput = {
  message: string;
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
  if (!res.ok) {
    throw new Error(data.message);
  }

  return data;
}

export type TSendOtpOutput = {
  message: string;
};
export type TSendOtpInput = {
  email: string;
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
  if (!res.ok) {
    console.error(data);
    throw new Error(
      data.message ||
        'Something went wrong! Please check console for more details.'
    );
  }

  return data;
}

export type TVerifyEmailInput = {
  email: string;
  otp: string;
};
export type TVerifyEmailOutput = {
  message: string;
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
  if (!res.ok) {
    console.error(data);
    throw new Error(
      data.message ||
        'Something went wrong! Please check console for more details.'
    );
  }

  return data;
}
