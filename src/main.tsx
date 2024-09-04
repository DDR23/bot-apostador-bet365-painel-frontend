import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, Navigate, RouterProvider } from 'react-router-dom';
import App from './App.tsx';
import './styles/globals.css'
import AppLayout from './components/layouts/AppLayout.tsx';
import PageAccount from './pages/account/Page.tsx';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        index: true,
        element: <AppLayout />
      },
      {
        path: '/account/:id',
        element: <PageAccount />
      },
      {
        path: '*',
        element: <Navigate to='/' replace />
      }
    ]
  },
])

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
