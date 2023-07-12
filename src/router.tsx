import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import React from 'react';

// NOTE: performance optimization
const HonePage = React.lazy(() => import('./pages/index'));
const Error404 = React.lazy(() => import('./pages/404'));
const IndexSlug = React.lazy(() => import('./pages/[slug]'));
const Login = React.lazy(() => import('./pages/login/index'));
const Register = React.lazy(() => import('./pages/register/index'));
const ResetPassword = React.lazy(() => import('./pages/reset-password/[token]'));
const ForgotPassword = React.lazy(() => import('./pages/forgot-password'));

const router = createBrowserRouter([
  {
    path: '/',
    element: <HonePage />,
  },
  {
    path: '/about',
    element: <HonePage />,
  },
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '/register',
    element: <Register />,
  },
  {
    path: '/forgot-password',
    element: <ForgotPassword />,
  },
  {
    path: '/reset-password/:token',
    element: <ResetPassword />,
  },
  {
    path: '/:shortUrl',
    element: <IndexSlug />,
  },
  {
    path: '*',
    element: <Error404 />,
  },
]);

const Router = () => {
  return <RouterProvider router={router} />;
};

export default Router;
