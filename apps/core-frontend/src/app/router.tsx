import { createBrowserRouter } from 'react-router-dom';
import { HomePage } from '../pages/home';
import { SignUpPage } from '../pages/signup';
import { LoginPage } from '../pages/login';
import { DashboardPage } from '../pages/dashboard';

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
        element: <SignUpPage />,
      },
      {
        path: 'login',
        element: <LoginPage />,
      },
    ],
  },
  {
    path: '/dashboard',
    element: <DashboardPage />,
  },
]);
