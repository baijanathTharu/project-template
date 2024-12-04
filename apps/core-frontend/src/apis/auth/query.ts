import { useMutation, useQuery } from '@tanstack/react-query';
import {
  login,
  logout,
  me,
  signUp,
  TLoginInput,
  TLoginOutput,
  TLogoutOutput,
  TMeOutput,
  TSignUpInput,
  TSignUpOutput,
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
    refetchOnMount: true,
  });
}

// for logout api
export function useLogoutMutation() {
  return useMutation<TLogoutOutput, Error, object>({
    mutationFn: logout,
  });
}
