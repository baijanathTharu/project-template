import { Spinner } from '@nextui-org/react';

export function Loading({ label }: { label: string }) {
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <Spinner label={label} color="primary" labelColor="primary" />
    </div>
  );
}
