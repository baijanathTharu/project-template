import { Card, Input, Button } from '@nextui-org/react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { SubmitHandler, useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { toastError, toastSuccess } from '../app/toaster';
import { useSendOtpMutation, useVerifyEmailMutation } from '../apis/auth/query';
import { _FULL_ROUTES } from '../app/routes';

const VerifyEmailSchema = z.object({
  email: z.string().email(),
  code: z.string().min(6),
});
type TVerifyEmailSchema = z.infer<typeof VerifyEmailSchema>;

export function VerifyEmailPage() {
  const sendOtpMutation = useSendOtpMutation();
  const verifyEmailMutation = useVerifyEmailMutation();

  const navigate = useNavigate();

  const [params] = useSearchParams();
  const email = params.get('email') ?? '';

  const {
    handleSubmit,
    register,
    watch,
    formState: { errors },
  } = useForm<TVerifyEmailSchema>({
    mode: 'all',
    resolver: zodResolver(VerifyEmailSchema),
    defaultValues: {
      email,
      code: '',
    },
  });

  const onVerify: SubmitHandler<TVerifyEmailSchema> = async (data) => {
    try {
      await verifyEmailMutation.mutateAsync(
        {
          email: data.email,
          otp: data.code,
        },
        {
          onSuccess: (res) => {
            if (res.code !== 'VERIFY_EMAIL_SUCCESS') {
              toastError(res.message ?? 'Verification failed');
              return;
            }
            toastSuccess('Email verified successfully!');
            navigate(_FULL_ROUTES.LOGIN);
          },
          onError: (error) => {
            console.error(error);
            toastError(error.message ?? 'Verification failed');
          },
        }
      );
    } catch (error) {
      console.error(error);
      toastError((error as Error)?.message ?? 'Verification failed');
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
        <h1 className="text-2xl font-bold text-center">Verify Your Email</h1>
        <form onSubmit={handleSubmit(onVerify)} className="space-y-4">
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
