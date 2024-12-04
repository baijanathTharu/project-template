import { Card, Input, Button, Link as NextUILink } from '@nextui-org/react';
import { Link } from 'react-router-dom';

export function LoginPage() {
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <Card className="w-full max-w-md p-6 space-y-6">
        <h1 className="text-2xl font-bold text-center">Log In</h1>
        <form className="space-y-4">
          <Input
            type="email"
            label="Email"
            placeholder="Enter your email"
            variant="bordered"
          />
          <Input
            type="password"
            label="Password"
            placeholder="Enter your password"
            variant="bordered"
          />
          <NextUILink href="#" className="text-sm">
            Forgot password?
          </NextUILink>
          <Button color="primary" className="w-full">
            Log In
          </Button>
        </form>
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
