import { ReactNode } from 'react';
import { useMeQuery } from '../apis/auth/query';
import { Loading } from './loading';
import { Error } from './error';
import { Link } from 'react-router-dom';
import { _FULL_ROUTES } from '../app/routes';

export function WithAuth({ children }: { children: ReactNode }) {
  const meQuery = useMeQuery();

  if (meQuery.isLoading) {
    return <Loading label="Loading user..." />;
  }

  if (meQuery.data?.code !== 'ME_SUCCESS') {
    return (
      <Error
        message={'You are not logged in!'}
        actionNode={
          <Link to={_FULL_ROUTES.LOGIN} className="text-blue-500 underline">
            Go to login
          </Link>
        }
      />
    );
  }

  return children;
}

export function WithoutAuth({ children }: { children: ReactNode }) {
  const meQuery = useMeQuery();

  if (meQuery.isLoading) {
    return <Loading label="Loading user..." />;
  }

  if (meQuery.data?.code === 'ME_SUCCESS') {
    return (
      <Error
        message="You are already logged in!"
        actionNode={
          <Link to={_FULL_ROUTES.DASHBOARD} className="text-blue-500 underline">
            Go to dashboard
          </Link>
        }
      />
    );
  }

  return children;
}
