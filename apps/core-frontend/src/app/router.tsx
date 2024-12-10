import { createBrowserRouter } from 'react-router-dom';
import { HomePage } from '../pages/home';
import { SignUpPage } from '../pages/signup';
import { LoginPage } from '../pages/login';
import { DashboardPage } from '../pages/dashboard';
import { WithAuth, WithoutAuth } from '../components/auth';
import { VerifyEmailPage } from '../pages/verify-email';
import { ForgotPasswordPage } from '../pages/forgot-password';
import { ResetPasswordPage } from '../pages/reset-password';
import { _FULL_ROUTES, _ROUTER_NESTED_PATHS } from './routes';
import { CoursePage } from '../pages/course/course';
import { EPage } from '../pages/e';

export const router = createBrowserRouter([
  {
    path: _FULL_ROUTES.HOME,
    element: <HomePage />,
  },
  {
    path: '/e',
    element: <EPage />,
  },
  {
    path: _FULL_ROUTES.BASE_AUTH,
    children: [
      {
        path: _ROUTER_NESTED_PATHS.AUTH.SIGNUP,
        element: (
          <WithoutAuth>
            <SignUpPage />
          </WithoutAuth>
        ),
      },
      {
        path: _ROUTER_NESTED_PATHS.AUTH.VERIFY_EMAIL,
        element: <VerifyEmailPage />,
      },
      {
        path: _ROUTER_NESTED_PATHS.AUTH.FORGOT_PASSWORD,
        element: <ForgotPasswordPage />,
      },
      {
        path: _ROUTER_NESTED_PATHS.AUTH.LOGIN,
        element: (
          <WithoutAuth>
            <LoginPage />
          </WithoutAuth>
        ),
      },
    ],
  },
  {
    path: _FULL_ROUTES.RESET_PASSWORD,
    element: (
      <WithAuth>
        <ResetPasswordPage />
      </WithAuth>
    ),
  },
  {
    path: _FULL_ROUTES.DASHBOARD,
    element: (
      <WithAuth>
        <DashboardPage />
      </WithAuth>
    ),
  },
  {
    path: '/course',
    element: <CoursePage />,
  },
]);
