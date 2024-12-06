import { useMutation, useQuery } from '@tanstack/react-query';
import {
  forgotPassword,
  login,
  logout,
  me,
  refreshToken,
  resetPassword,
  sendOtp,
  signUp,
  TForgotPasswordInput,
  TForgotPasswordOutput,
  TLoginInput,
  TLoginOutput,
  TLogoutOutput,
  TMeOutput,
  TRefreshTokenOutput,
  TResetPasswordInput,
  TResetPasswordOutput,
  TSendOtpInput,
  TSendOtpOutput,
  TSignUpInput,
  TSignUpOutput,
  TVerifyEmailInput,
  TVerifyEmailOutput,
  verifyEmail,
} from './fetcher';
import { useRef } from 'react';
import { toastError } from '../../app/toaster';

// for register api
export function useSignUpMutation() {
  return useMutation<TSignUpOutput, Error, TSignUpInput>({
    mutationFn: signUp,
  });
}

// for login api
export function useLoginMutation() {
  return useMutation<TLoginOutput, Error, TLoginInput>({
    mutationFn: login,
  });
}

// for refreshing token api

export function useRefreshTokenMutation() {
  return useMutation<TRefreshTokenOutput, Error, object>({
    mutationFn: refreshToken,
  });
}

// for me api
export function useMeQuery() {
  const retryRef = useRef(0);
  const refreshToken = useRefreshTokenMutation();
  return useQuery<TMeOutput, Error>({
    queryKey: ['me', retryRef.current],
    queryFn: me,
    retry: false,
    async onSuccess(data) {
      if (data.code === 'INVALID_TOKEN' || data.code === 'MISSING_TOKEN') {
        await refreshToken.mutateAsync(
          {},
          {
            onSuccess: (res) => {
              if (res.code !== 'REFRESH_SUCCESS') {
                toastError(
                  res.message ??
                    'Refreshing token failed! You will be logged out!'
                );
                return;
              }
              retryRef.current += 1;
            },
          }
        );
      }
    },
  });
}

// for logout api
export function useLogoutMutation() {
  return useMutation<TLogoutOutput, Error, object>({
    mutationFn: logout,
  });
}

// for send otp api
export function useSendOtpMutation() {
  return useMutation<TSendOtpOutput, Error, TSendOtpInput>({
    mutationFn: sendOtp,
  });
}

// for verify email api
export function useVerifyEmailMutation() {
  return useMutation<TVerifyEmailOutput, Error, TVerifyEmailInput>({
    mutationFn: verifyEmail,
  });
}

// for forgot-password api
export function useForgotPasswordMutation() {
  return useMutation<TForgotPasswordOutput, Error, TForgotPasswordInput>({
    mutationFn: forgotPassword,
  });
}

// for reset-password api
export function useResetPasswordMutation() {
  return useMutation<TResetPasswordOutput, Error, TResetPasswordInput>({
    mutationFn: resetPassword,
  });
}
