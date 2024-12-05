import { createBrowserRouter, Outlet } from 'react-router-dom';
import { HomePage } from '../pages/home';
import { SignUpPage } from '../pages/signup';
import { LoginPage } from '../pages/login';
import { DashboardPage } from '../pages/dashboard';
import { WithAuth, WithoutAuth } from '../components/auth';
import { VerifyEmailPage } from '../pages/verify-email';
import { ForgotPasswordPage } from '../pages/forgot-password';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <HomePage />,
  },
  {
    path: '/auth',
    children: [
      {
        path: 'signup',
        element: (
          <WithoutAuth>
            <SignUpPage />
          </WithoutAuth>
        ),
      },
      {
        path: 'verify-email',
        element: <VerifyEmailPage />,
      },
      {
        path: 'forgot-password',
        element: <ForgotPasswordPage />,
      },
      {
        path: 'login',
        element: (
          <WithoutAuth>
            <LoginPage />
          </WithoutAuth>
        ),
      },
    ],
  },
  {
    path: '/dashboard',
    element: (
      <WithAuth>
        <DashboardPage />
      </WithAuth>
    ),
  },
]);
