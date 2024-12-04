import { CircleX } from 'lucide-react';

export function Error({ message }: { message: string }) {
  return (
    <div className="flex justify-center items-center gap-2 min-h-screen bg-gray-100">
      <CircleX fill="red" stroke="white" size={50} />
      <p className="text-red-400 text-lg font-semibold">Error: {message}</p>
    </div>
  );
}
