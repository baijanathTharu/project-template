import { Card, Input, Button } from '@nextui-org/react';
import { Link, useNavigate } from 'react-router-dom';
import { SubmitHandler, useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useLoginMutation, useSendOtpMutation } from '../apis/auth/query';
import { toastError, toastSuccess } from '../app/toaster';

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});
type TLoginSchema = z.infer<typeof loginSchema>;

export function LoginPage() {
  const loginMutation = useLoginMutation();
  const sendOtpMutation = useSendOtpMutation();

  const navigate = useNavigate();

  const {
    handleSubmit,
    register,
    watch,
    formState: { errors },
  } = useForm<TLoginSchema>({
    mode: 'all',
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onLogin: SubmitHandler<TLoginSchema> = async (data) => {
    try {
      await loginMutation.mutateAsync(
        {
          email: data.email,
          password: data.password,
        },
        {
          onSuccess: (res) => {
            if (res.code !== 'LOGIN_SUCCESS') {
              toastError(res.message ?? 'Login failed');
              return;
            }
            toastSuccess('Login successful!');
            navigate(`/dashboard`);
          },
          onError: (error) => {
            console.error(error);
            toastError(error.message ?? 'Login failed');
          },
        }
      );
    } catch (error) {
      console.error(error);
      toastError((error as Error)?.message ?? 'Login failed');
    }
  };

  const inputEmail = watch('email');
  const resendOtp = async () => {
    try {
      if (!inputEmail) {
        toastError('Email is required');
        return;
      }
      await sendOtpMutation.mutateAsync(
        {
          email: inputEmail,
        },
        {
          onSuccess: (res) => {
            if (res.code !== 'SEND_OTP_SUCCESS') {
              toastError(res.message ?? 'Sending OTP failed');
              return;
            }
            toastSuccess('OTP sent successfully!');
            navigate(
              `/auth/forgot-password?email=${encodeURIComponent(inputEmail)}`
            );
          },
          onError: (error) => {
            console.error(error);
            toastError(error.message ?? 'Sending OTP failed');
          },
        }
      );
    } catch (error) {
      console.error(error);
      toastError((error as Error)?.message ?? 'Sending OTP failed');
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <Card className="w-full max-w-md p-6 space-y-6">
        <h1 className="text-2xl font-bold text-center">Log In</h1>
        <form onSubmit={handleSubmit(onLogin)} className="space-y-4">
          <div className="pb-4">
            <Input
              type="email"
              label="Email"
              labelPlacement="outside"
              placeholder="Enter your email"
              variant="bordered"
              errorMessage={errors.email?.message}
              isInvalid={!!errors.email}
              {...register('email')}
            />
          </div>
          <div className="pb-4">
            <Input
              type="password"
              label="Password"
              labelPlacement="outside"
              placeholder="Enter your password"
              variant="bordered"
              errorMessage={errors.password?.message}
              isInvalid={!!errors.password}
              {...register('password')}
            />
          </div>
          <p
            className="w-full text-primary cursor-pointer hover:underline"
            onClick={() => resendOtp()}
          >
            {sendOtpMutation.isLoading
              ? 'Forgetting Password...'
              : 'Forgot Password?'}
          </p>
          <Button type="submit" color="primary" className="w-full">
            Log In
          </Button>
        </form>
        <p className="text-center">
          Haven't verified your email?{' '}
          <Link
            to="/auth/verify-email"
            className="text-blue-600 hover:underline"
          >
            Verify email
          </Link>
        </p>
        <p className="text-center">
          Don't have an account?{' '}
          <Link to="/auth/signup" className="text-blue-600 hover:underline">
            Sign up
          </Link>
        </p>
      </Card>
    </div>
  );
}
