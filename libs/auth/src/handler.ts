import {
  ISignUpHandler,
  ILoginHandler,
  ILogoutHandler,
  IRefreshHandler,
  IResetPasswordHandler,
  IMeRouteHandler,
  IVerifyEmailHandler,
  IForgotPasswordHandler,
  ISendOtpHandler,
} from '@baijanstack/express-auth';

import { logger } from '@libs/core-contract/utils/logger';
import { userRepo } from '@libs/kysely-db/repositories/auth-repo';

export type TUser = {
  name: string;
  email: string;
  password: string;
  is_email_verified: boolean;
  otps: {
    code: string;
    generatedAt: number;
  }[];
};

type TEmailObj = {
  email: string;
};

interface TSignUpBodyInput extends TEmailObj {
  name: string;
  password: string;
}

export class SignUpHandler implements ISignUpHandler {
  constructor() {
    logger.info('signup persistor init...');
  }

  errors: { USER_ALREADY_EXISTS_MESSAGE?: string } = {};

  doesUserExists: (body: TSignUpBodyInput) => Promise<boolean> = async (
    body
  ) => {
    const user = await userRepo.findByEmail(body.email);
    return !!user;
  };

  saveUser: (body: TSignUpBodyInput, hashedPassword: string) => Promise<void> =
    async (body, hashedPassword) => {
      await userRepo.create({
        id: crypto.randomUUID(),
        name: body.name,
        email: body.email,
        password: hashedPassword,
        is_email_verified: false,
      });
    };
}

export class LoginHandler implements ILoginHandler {
  getUserByEmail: (email: string) => Promise<TUser | null> = async (email) => {
    const user = await userRepo.findByEmail(email);

    if (!user) {
      return null;
    }

    return {
      name: user?.name,
      email: user?.email,
      password: user?.password,
      is_email_verified: user?.is_email_verified,
      otps: [],
    };
  };
  errors: { PASSWORD_OR_EMAIL_INCORRECT?: string } = {
    PASSWORD_OR_EMAIL_INCORRECT: 'Password or email incorrect',
  };

  getTokenPayload: (email: string) => Promise<{
    name: string;
    email: string;
  } | null> = async (email) => {
    const user = await userRepo.findByEmail(email);

    if (!user) {
      return null;
    }

    return {
      email: user?.email,
      name: user?.name,
    };
  };
}

export class LogoutHandler implements ILogoutHandler {
  shouldLogout: () => Promise<boolean> = async () => {
    return true;
  };
}

export class RefreshHandler implements IRefreshHandler {
  errors: { INVALID_REFRESH_TOKEN?: string } = {};

  refresh: (token: string) => Promise<void> = async () => {
    logger.info('refreshing token...');
  };

  getTokenPayload: (email: string) => Promise<{
    name: string;
    email: string;
  } | null> = async (email) => {
    const user = await userRepo.findByEmail(email);

    if (!user) {
      return null;
    }

    return {
      email: user?.email,
      name: user?.name,
    };
  };
}

export class ResetPasswordHandler implements IResetPasswordHandler {
  saveHashedPassword: (email: string, hashedPassword: string) => Promise<void> =
    async (email, hashedPassword) => {
      await userRepo.updatePasswordByEmail(email, hashedPassword);
    };
  getOldPasswordHash: (email: string) => Promise<string> = async (email) => {
    const user = await userRepo.findByEmail(email);

    if (!user) {
      return '';
    }
    return user.password;
  };
}

export class MeRouteHandler implements IMeRouteHandler {
  getMeByEmail: (
    email: string
  ) => Promise<{ email: string; name: string } | null> = async (email) => {
    const user = await userRepo.findByEmail(email);

    if (!user) {
      return null;
    }

    return {
      name: user?.name,
      email: user?.email,
    };
  };
}

export class VerifyEmailHandler implements IVerifyEmailHandler {
  isOtpValid: (email: string, otp: string) => Promise<boolean> = async (
    email,
    otp
  ) => {
    const user = await userRepo.findByEmail(email);

    if (!user) {
      return false;
    }

    const latestOtp = await userRepo.getLatestOtpByUserId(user.id);

    if (!latestOtp) {
      return false;
    }

    const isOtpMatched = latestOtp.code === otp;

    const isExpired =
      latestOtp.created_at.getTime() < Date.now() - 60 * 5 * 1000; // 5 minutes

    return isOtpMatched && !isExpired;
  };

  isEmailAlreadyVerified: (email: string) => Promise<boolean> = async (
    email
  ) => {
    const user = await userRepo.findByEmail(email);

    return !user?.is_email_verified;
  };
}

export class SendOtpHandler implements ISendOtpHandler {
  doesUserExists: (email: string) => Promise<boolean> = async (email) => {
    const user = await userRepo.findByEmail(email);
    return !!user;
  };

  saveOtp: (
    email: string,
    otp: { code: string; generatedAt: number }
  ) => Promise<void> = async (email, otp) => {
    const user = await userRepo.findByEmail(email);

    if (!user) {
      throw new Error(`User not found`);
    }
    await userRepo.createOtp(user.id, otp.code);
  };
}

export class ForgotPasswordHandler implements IForgotPasswordHandler {
  isOtpValid: (email: string, otp: string) => Promise<boolean> = async (
    email,
    otp
  ) => {
    const user = await userRepo.findByEmail(email);

    if (!user) {
      return false;
    }

    const latestOtp = await userRepo.getLatestOtpByUserId(user.id);

    if (!latestOtp) {
      return false;
    }

    const isOtpMatched = latestOtp.code === otp;

    const isExpired =
      latestOtp.created_at.getTime() < Date.now() - 60 * 5 * 1000; // 5 minutes

    return isOtpMatched && !isExpired;
  };

  saveNewPassword: (email: string, password: string) => Promise<void> = async (
    email,
    password
  ) => {
    await userRepo.updatePasswordByEmail(email, password);
  };
}
