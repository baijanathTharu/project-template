import { Card, Button } from '@nextui-org/react';
import { useLogoutMutation, useMeQuery } from '../apis/auth/query';
import { Error } from '../components/error';
import { toastError, toastSuccess } from '../app/toaster';
import { Loading } from '../components/loading';

export function DashboardPage() {
  const meQuery = useMeQuery();
  const logoutMutation = useLogoutMutation();

  const handleLogout = async () => {
    try {
      await logoutMutation.mutateAsync(
        {},
        {
          onSuccess: (res) => {
            if (res.code !== 'LOGOUT_SUCCESS') {
              toastError(res.message ?? 'Logout failed!');
              return;
            }
            toastSuccess('Logout successful!');
            // perform full page refresh
            window.location.href = '/auth/login';
          },
        }
      );
    } catch (error) {
      console.error(error);
      toastError((error as Error)?.message ?? 'Logout failed');
    }
  };

  if (meQuery.isLoading) {
    return <Loading label="Loading user..." />;
  }

  if (meQuery.data?.code !== 'ME_SUCCESS') {
    return <Error message={meQuery.data?.message || 'Something went wrong!'} />;
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <Card className="w-full max-w-md p-6 space-y-6">
        <h1 className="text-2xl font-bold text-gray-400 text-center">
          Welcome, {meQuery.data.data.me.name}!
        </h1>
        <p className="text-center">You have successfully logged in.</p>
        <Button
          color="primary"
          isDisabled={logoutMutation.isLoading}
          onClick={handleLogout}
          className="w-full"
        >
          {logoutMutation.isLoading ? 'Logging out...' : 'Logout'}
        </Button>
      </Card>
    </div>
  );
}
