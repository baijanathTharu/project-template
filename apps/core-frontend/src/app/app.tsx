import { RouterProvider } from 'react-router-dom';
import { NextUIProvider } from '@nextui-org/react';
import { Toaster } from 'sonner';

import { router } from './router';
import { QueryProvider } from './query';

export function App() {
  return (
    <NextUIProvider>
      <QueryProvider>
        <RouterProvider router={router}></RouterProvider>
        <Toaster />
      </QueryProvider>
    </NextUIProvider>
  );
}

export default App;
