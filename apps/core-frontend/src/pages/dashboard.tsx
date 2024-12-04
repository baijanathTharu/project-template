import { Card, Button } from '@nextui-org/react';
import { useNavigate } from 'react-router-dom';

export function DashboardPage() {
  const navigate = useNavigate();
  const username = 'JohnDoe'; // This would normally come from your authentication state

  const handleLogout = () => {
    // Implement logout logic here
    navigate('/auth/login');
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <Card className="w-full max-w-md p-6 space-y-6">
        <h1 className="text-2xl font-bold text-center">Welcome, {username}!</h1>
        <p className="text-center">You have successfully logged in.</p>
        <Button color="primary" onClick={handleLogout} className="w-full">
          Log Out
        </Button>
      </Card>
    </div>
  );
}
