import { RouterProvider } from 'react-router-dom';
import { NextUIProvider } from '@nextui-org/react';

import { router } from './router';
import { QueryProvider } from './query';

export function App() {
  return (
    <NextUIProvider>
      <QueryProvider>
        <RouterProvider router={router}></RouterProvider>
      </QueryProvider>
    </NextUIProvider>
  );
}

export default App;
