import { Card, Button, Spinner } from '@nextui-org/react';
import { useNavigate } from 'react-router-dom';
import { useLogoutMutation, useMeQuery } from '../apis/auth/query';
import { Error } from '../components/error';
import { toastError, toastSuccess } from '../app/toaster';

export function DashboardPage() {
  const meQuery = useMeQuery();
  const logoutMutation = useLogoutMutation();

  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logoutMutation.mutateAsync(
        {},
        {
          onSuccess: () => {
            toastSuccess('Logout successful!');
            navigate('/auth/login');
          },
        }
      );
    } catch (error) {
      console.error(error);
      toastError((error as Error)?.message ?? 'Logout failed');
    }
  };

  if (meQuery.isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-100">
        <Spinner label="Loading user..." color="primary" labelColor="primary" />
      </div>
    );
  }

  if (meQuery.isError) {
    return <Error message={meQuery.error.message || 'Something went wrong!'} />;
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <Card className="w-full max-w-md p-6 space-y-6">
        <h1 className="text-2xl font-bold text-gray-400 text-center">
          Welcome, {meQuery.data.me.name}!
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
