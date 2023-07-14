import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import React, { Suspense, useEffect } from 'react';
import authMiddleWare from './middleware/auth';
import { useSelector } from 'react-redux';
import { getCookie } from './utils/cookie';
import AuthService from './api/v1/auth';

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
const LogoutPage = React.lazy(() => import('./pages/logout/index'));

const Router = () => {
  const token = getCookie('token');

  const router = createBrowserRouter([
    // top level routes
    {
      path: '/',
      element: (
        <Suspense>
          <HonePage />
        </Suspense>
      ),
    },
    {
      path: '/about',
      element: (
        <Suspense>
          <HonePage />
        </Suspense>
      ),
    },
    {
      path: '/:shortUrl',
      element: (
        <Suspense>
          <SlugPage />
        </Suspense>
      ),
    },
    {
      path: '*',
      element: (
        <Suspense>
          <Error404Page />
        </Suspense>
      ),
    },

    // auth routes
    {
      path: '/login',
      element: (
        <Suspense>
          <LoginPage />
        </Suspense>
      ),
    },
    {
      path: '/register',
      element: (
        <Suspense>
          <RegisterPage />
        </Suspense>
      ),
    },
    {
      path: '/forgot-password',
      element: (
        <Suspense>
          <ForgotPasswordPage />
        </Suspense>
      ),
    },
    {
      path: '/reset-password/:token',
      element: (
        <Suspense>
          <ResetPasswordPage />
        </Suspense>
      ),
    },
    {
      path: '/logout',
      element: (
        <Suspense>
          <LogoutPage />
        </Suspense>
      ),
    },

    // app routes
    {
      path: '/app',
      element: <Suspense>{token ? <AppPage /> : <LoginPage />}</Suspense>,
    },
    {
      path: '/app/links',
      element: <Suspense>{token ? <AppLinksPage /> : <LoginPage />}</Suspense>,
    },
    {
      path: '/app/profile',
      element: <Suspense>{token ? <AppProfilePage /> : <LoginPage />}</Suspense>,
    },
    {
      path: '/app/settings',
      element: <Suspense>{token ? <AppSettingsPage /> : <LoginPage />}</Suspense>,
    },
  ]);

  const noAuth = ['/login', '/register', '/forgot-password', '/reset-password', '/logout'];
  const path = window.location.pathname;

  if (token && noAuth.includes(path)) {
    window.location.href = '/app';
  }

  return <RouterProvider router={router} />;
};

export default Router;
