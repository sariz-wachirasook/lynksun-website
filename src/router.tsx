import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import HonePage from './pages/index';
import Error404 from './pages/404';
import IndexSlug from './pages/[slug]';
import Login from './pages/login/index';
import Register from './pages/register/index';
import ResetPassword from './pages/reset-password/[token]';
import ForgotPassword from './pages/forgot-password';

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
