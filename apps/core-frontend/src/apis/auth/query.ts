import { useMutation, useQuery } from '@tanstack/react-query';
import {
  forgotPassword,
  login,
  logout,
  me,
  sendOtp,
  signUp,
  TForgotPasswordInput,
  TForgotPasswordOutput,
  TLoginInput,
  TLoginOutput,
  TLogoutOutput,
  TMeOutput,
  TSendOtpInput,
  TSendOtpOutput,
  TSignUpInput,
  TSignUpOutput,
  TVerifyEmailInput,
  TVerifyEmailOutput,
  verifyEmail,
} from './fetcher';

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

// for me api
export function useMeQuery() {
  return useQuery<TMeOutput, Error>({
    queryKey: ['me'],
    queryFn: me,
    retry: false,
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
