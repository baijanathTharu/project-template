import { CircleX } from 'lucide-react';
import { ReactNode } from 'react';

export function Error({
  message,
  actionNode,
}: {
  message: string;
  actionNode?: ReactNode;
}) {
  return (
    <div className="flex flex-col justify-center items-center gap-2 min-h-screen bg-gray-100">
      <div className="flex gap-2 justify-center items-center">
        <CircleX fill="red" stroke="white" size={50} />
        <p className="text-red-400 text-lg font-semibold">Error: {message}</p>
      </div>
      {actionNode}
    </div>
  );
}
