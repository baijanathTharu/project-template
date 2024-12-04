import { ReactNode } from 'react';
import { useMeQuery } from '../apis/auth/query';
import { Loading } from './loading';
import { Error } from './error';
import { Link } from 'react-router-dom';

export function WithAuth({ children }: { children: ReactNode }) {
  const meQuery = useMeQuery();

  if (meQuery.isLoading) {
    return <Loading label="Loading user..." />;
  }

  if (meQuery.isError) {
    return <Error message={meQuery.error.message || 'Something went wrong!'} />;
  }

  return children;
}

export function WithoutAuth({ children }: { children: ReactNode }) {
  const meQuery = useMeQuery();

  if (meQuery.isLoading) {
    return <Loading label="Loading user..." />;
  }

  if (meQuery.data) {
    return (
      <Error
        message="You are already logged in!"
        actionNode={
          <Link to="/dashboard" className="text-blue-500 underline">
            Go to dashboard
          </Link>
        }
      />
    );
  }

  return children;
}
