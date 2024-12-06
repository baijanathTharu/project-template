import { Card, Input, Button } from '@nextui-org/react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { SubmitHandler, useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { toastError, toastSuccess } from '../app/toaster';
import {
  useForgotPasswordMutation,
  useSendOtpMutation,
} from '../apis/auth/query';
import { _FULL_ROUTES } from '../app/routes';

const ForgotPasswordSchema = z.object({
  email: z.string().email(),
  code: z.string().min(6),
  password: z.string().min(6),
});
type TForgotPasswordSchema = z.infer<typeof ForgotPasswordSchema>;

export function ForgotPasswordPage() {
  const sendOtpMutation = useSendOtpMutation();
  const forgotPasswordMutation = useForgotPasswordMutation();

  const navigate = useNavigate();

  const [params] = useSearchParams();
  const email = params.get('email') ?? '';

  const {
    handleSubmit,
    register,
    watch,
    formState: { errors },
  } = useForm<TForgotPasswordSchema>({
    mode: 'all',
    resolver: zodResolver(ForgotPasswordSchema),
    defaultValues: {
      email,
      code: '',
      password: '',
    },
  });

  const onForgotPassword: SubmitHandler<TForgotPasswordSchema> = async (
    data
  ) => {
    try {
      await forgotPasswordMutation.mutateAsync(
        {
          email: data.email,
          otp: data.code,
          newPassword: data.password,
        },
        {
          onSuccess: (res) => {
            if (res.code !== 'FORGOT_PASSWORD_SUCCESS') {
              toastError(res.message ?? 'Password change failed');
              return;
            }
            toastSuccess('Password changed successfully!');
            navigate(_FULL_ROUTES.LOGIN);
          },
          onError: (error) => {
            console.error(error);
            toastError(error.message ?? 'Password change failed');
          },
        }
      );
    } catch (error) {
      console.error(error);
      toastError((error as Error)?.message ?? 'Password change failed');
    }
  };

  const inputEmail = watch('email');

  const resendOtp = async () => {
    try {
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
        <h1 className="text-2xl font-bold text-center">Change Your Password</h1>
        <form onSubmit={handleSubmit(onForgotPassword)} className="space-y-4">
          <div className="pb-4">
            <Input
              type="email"
              label="Email"
              labelPlacement="outside"
              placeholder="Enter your email"
              variant="bordered"
              disabled
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
          <div className="pb-4">
            <Input
              type="text"
              label="OTP"
              labelPlacement="outside"
              placeholder="Enter your otp"
              variant="bordered"
              errorMessage={errors.code?.message}
              isInvalid={!!errors.code}
              {...register('code')}
            />
          </div>
          <Button
            isDisabled={sendOtpMutation.isLoading}
            type="button"
            color="secondary"
            className="w-full"
            onClick={() => resendOtp()}
          >
            {sendOtpMutation.isLoading ? 'Resending OTP...' : 'Resend OTP'}
          </Button>
          <Button
            isDisabled={sendOtpMutation.isLoading}
            type="submit"
            color="primary"
            className="w-full"
          >
            Verify
          </Button>
        </form>

        <p className="text-center">
          Already verified?{' '}
          <Link
            to={_FULL_ROUTES.LOGIN}
            className="text-blue-600 hover:underline"
          >
            Log in
          </Link>
        </p>
      </Card>
    </div>
  );
}
