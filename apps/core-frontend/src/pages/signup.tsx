import { Card, Input, Button } from '@nextui-org/react';
import { Link } from 'react-router-dom';

export function SignUpPage() {
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <Card className="w-full max-w-md p-6 space-y-6">
        <h1 className="text-2xl font-bold text-center">Sign Up</h1>
        <form className="space-y-4">
          <Input
            type="email"
            label="Email"
            placeholder="Enter your email"
            variant="bordered"
          />
          <Input
            type="text"
            label="Username"
            placeholder="Choose a username"
            variant="bordered"
          />
          <Input
            type="password"
            label="Password"
            placeholder="Create a password"
            variant="bordered"
          />
          <Button color="primary" className="w-full">
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
