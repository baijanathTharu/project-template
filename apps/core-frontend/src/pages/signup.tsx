import { zodResolver } from '@hookform/resolvers/zod';
import { Card, Input, Button } from '@nextui-org/react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { z } from 'zod';
import { useSendOtpMutation, useSignUpMutation } from '../apis/auth/query';
import { toastError, toastSuccess } from '../app/toaster';

const signUpSchema = z.object({
  email: z.string().email(),
  name: z.string(),
  password: z.string().min(6),
});

type TSignUpSchema = z.infer<typeof signUpSchema>;

export function SignUpPage() {
  const navigate = useNavigate();
  const signUpMutation = useSignUpMutation();
  const sendOtpMutation = useSendOtpMutation();

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<TSignUpSchema>({
    mode: 'all',
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      email: '',
      name: '',
      password: '',
    },
  });

  const sendOtp = async (email: string) => {
    await sendOtpMutation.mutateAsync(
      {
        email,
      },
      {
        onSuccess: (res) => {
          if (res.code !== 'SEND_OTP_SUCCESS') {
            toastError(res.message ?? 'Sending OTP failed');
            return;
          }
          toastSuccess('OTP sent successfully!');
          navigate(`/auth/verify-email?email=${encodeURIComponent(email)}`);
        },
        onError: (error) => {
          console.error(error);
          toastError(error.message ?? 'Sending OTP failed');
        },
      }
    );
  };

  const onSubmit: SubmitHandler<TSignUpSchema> = async (data) => {
    try {
      await signUpMutation.mutateAsync(
        {
          email: data.email,
          name: data.name,
          password: data.password,
        },
        {
          onSuccess: async (res) => {
            if (res.code !== 'USER_CREATED') {
              toastError(res.message ?? 'Sign up failed');
              return;
            }
            toastSuccess(
              'Sign up successful and Sending OTP for email verification...'
            );

            await sendOtp(data.email);
          },
          onError: (error) => {
            console.error(error);
            toastError(error.message ?? 'Sign up failed');
          },
        }
      );
    } catch (error) {
      console.error(error);
      toastError((error as Error)?.message ?? 'Sign up failed');
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <Card className="w-full max-w-md p-6 space-y-6">
        <h1 className="text-2xl font-bold text-center">Sign Up</h1>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="pb-4">
            <Input
              type="email"
              label="Email"
              placeholder="Enter your email"
              variant="bordered"
              errorMessage={errors.email?.message}
              isInvalid={!!errors.email}
              {...register('email')}
            />
          </div>

          <div className="pb-4">
            <Input
              type="text"
              label="name"
              placeholder="Choose a name"
              variant="bordered"
              errorMessage={errors.name?.message}
              isInvalid={!!errors.name}
              {...register('name')}
            />
          </div>

          <div className="pb-4">
            <Input
              type="password"
              label="Password"
              placeholder="Create a password"
              variant="bordered"
              errorMessage={errors.password?.message}
              isInvalid={!!errors.password}
              {...register('password')}
            />
          </div>
          <Button type="submit" color="primary" className="w-full">
            Sign Up
          </Button>
        </form>
        <p className="text-center">
          Already have an account?{' '}
          <Link to="/auth/login" className="text-blue-600 hover:underline">
            Log in
          </Link>
        </p>
      </Card>
    </div>
  );
}
