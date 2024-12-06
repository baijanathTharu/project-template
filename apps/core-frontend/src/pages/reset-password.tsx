import { Card, Input, Button } from '@nextui-org/react';
import { Link, useNavigate } from 'react-router-dom';
import { SubmitHandler, useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useResetPasswordMutation } from '../apis/auth/query';
import { toastError, toastSuccess } from '../app/toaster';
import { _FULL_ROUTES } from '../app/routes';

const ResetPasswordSchema = z.object({
  oldPassword: z.string().min(6),
  newPassword: z.string().min(6),
});
type TResetPasswordSchema = z.infer<typeof ResetPasswordSchema>;

export function ResetPasswordPage() {
  const resetPasswordMutation = useResetPasswordMutation();

  const navigate = useNavigate();

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<TResetPasswordSchema>({
    mode: 'all',
    resolver: zodResolver(ResetPasswordSchema),
    defaultValues: {
      oldPassword: '',
      newPassword: '',
    },
  });

  const onResetPasswordd: SubmitHandler<TResetPasswordSchema> = async (
    data
  ) => {
    try {
      await resetPasswordMutation.mutateAsync(
        {
          oldPassword: data.oldPassword,
          newPassword: data.newPassword,
        },
        {
          onSuccess: (res) => {
            if (res.code !== 'RESET_PASSWORD_SUCCESS') {
              toastError(res.message ?? 'Reseting password failed');
              return;
            }
            toastSuccess('Reseting password successful!');
            navigate(_FULL_ROUTES.LOGIN);
          },
          onError: (error) => {
            console.error(error);
            toastError(error.message ?? 'Reseting password failed');
          },
        }
      );
    } catch (error) {
      console.error(error);
      toastError((error as Error)?.message ?? 'Login failed');
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <Card className="w-full max-w-md p-6 space-y-6">
        <h1 className="text-2xl font-bold text-center">Log In</h1>
        <form onSubmit={handleSubmit(onResetPasswordd)} className="space-y-4">
          <div className="pb-4">
            <Input
              type="password"
              label="Old Password"
              labelPlacement="outside"
              placeholder="Enter your old password"
              variant="bordered"
              errorMessage={errors.oldPassword?.message}
              isInvalid={!!errors.oldPassword}
              {...register('oldPassword')}
            />
          </div>
          <div className="pb-4">
            <Input
              type="password"
              label="New Password"
              labelPlacement="outside"
              placeholder="Enter your new password"
              variant="bordered"
              errorMessage={errors.newPassword?.message}
              isInvalid={!!errors.newPassword}
              {...register('newPassword')}
            />
          </div>

          <Button type="submit" color="primary" className="w-full">
            Reset
          </Button>
        </form>

        <p className="text-center">
          Don't want to reset your password?{' '}
          <Link
            to={_FULL_ROUTES.DASHBOARD}
            className="text-blue-600 hover:underline"
          >
            Go Back
          </Link>
        </p>
      </Card>
    </div>
  );
}
