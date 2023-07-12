import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import React from 'react';

// NOTE: performance optimization
const HonePage = React.lazy(() => import('./pages/index'));
const Error404Page = React.lazy(() => import('./pages/404'));
const SlugPage = React.lazy(() => import('./pages/[slug]'));
const LoginPage = React.lazy(() => import('./pages/login/index'));
const RegisterPage = React.lazy(() => import('./pages/register/index'));
const ResetPasswordPage = React.lazy(() => import('./pages/reset-password/[token]'));
const ForgotPasswordPage = React.lazy(() => import('./pages/forgot-password'));
const AppPage = React.lazy(() => import('./pages/app/index'));
const AppLinksPage = React.lazy(() => import('./pages/app/links/index'));
const AppProfilePage = React.lazy(() => import('./pages/app/profile/index'));
const AppSettingsPage = React.lazy(() => import('./pages/app/settings/index'));

const router = createBrowserRouter([
  // top level routes
  {
    path: '/',
    element: <HonePage />,
  },
  {
    path: '/about',
    element: <HonePage />,
  },
  {
    path: '/:shortUrl',
    element: <SlugPage />,
  },
  {
    path: '*',
    element: <Error404Page />,
  },

  // auth routes
  {
    path: '/login',
    element: <LoginPage />,
  },
  {
    path: '/register',
    element: <RegisterPage />,
  },
  {
    path: '/forgot-password',
    element: <ForgotPasswordPage />,
  },
  {
    path: '/reset-password/:token',
    element: <ResetPasswordPage />,
  },

  // app routes
  {
    path: '/app',
    element: <AppPage />,
  },
  {
    path: '/app/links',
    element: <AppLinksPage />,
  },
  {
    path: '/app/profile',
    element: <AppProfilePage />,
  },
  {
    path: '/app/settings',
    element: <AppSettingsPage />,
  },
]);

const Router = () => {
  return <RouterProvider router={router} />;
};

export default Router;
