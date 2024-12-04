import { RouterProvider } from 'react-router-dom';
import { NextUIProvider } from '@nextui-org/react';

import { router } from './router';

export function App() {
  return (
    <NextUIProvider>
      <RouterProvider router={router}></RouterProvider>
    </NextUIProvider>
  );
}

export default App;
