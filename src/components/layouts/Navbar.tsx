import { useState, type FC, useEffect } from 'react';

import { useTranslation } from 'react-i18next';
import { getCookie } from '../../utils/cookie';
import LocaleSwitcher from '../LocaleSwitcher';
import { useStore } from '@nanostores/react';
import { user } from '../../store/user';
import ThemeSwitcher from '../ThemeSwitcher';

interface Route {
  name: string;
  path: string;
  icon: string;
}

const Navbar: FC = () => {
  const { t } = useTranslation();
  const $user = useStore(user);
  const token = getCookie('token');
  const routes: Route[] = [
    {
      name: t('login'),
      path: '/login',
      icon: 'sign-in',
    },
    {
      name: t('register'),
      path: '/register',
      icon: 'user-plus',
    },
  ];

  return (
    <div className="navbar bg-base-100 shadow-lg border-2 border-base-300">
      <div className="navbar-start">
        <a href={token ? '/app/links' : '/'} className="flex items-center">
          <img src="/white-logo.svg" alt="logo" className="w-[176px] h-[55px] logo-white" />
          <img src="/black-logo.svg" alt="logo" className="w-[176px] h-[55px] logo-black" />
        </a>
      </div>
      <div className="navbar-center hidden lg:flex"></div>
      <div className="navbar-end">
        {!token && (
          <ul className="menu menu-horizontal px-1 hidden md:inline-flex">
            {routes.map((route) => (
              <li key={route.path}>
                <a href={route.path} className="flex justify-between">
                  <span>{route.name}</span>
                  <i className={`fa-solid fa-${route.icon}`} />
                </a>
              </li>
            ))}
          </ul>
        )}
        <div className="flex gap-2.5 items-center">
          {token && (
            <>
              <h5>{$user?.name}</h5>
              <div className="avatar pointer-events-none">
                <div className="w-8 rounded-xl bg-base-200 !flex justify-center items-center uppercase font-bold">
                  {$user?.name ? $user?.name[0] : ''}
                </div>
              </div>
            </>
          )}
          |
          <ThemeSwitcher />
          <LocaleSwitcher />
        </div>
        <div className="dropdown dropdown-end">
          <label tabIndex={0} className="btn btn-ghost lg:hidden">
            <i className="fa-solid fa-bars" />
          </label>
          <ul
            tabIndex={0}
            className="p-2 shadow menu dropdown-content z-[1] bg-base-100 rounded-box w-52"
          >
            {routes.map((route) => (
              <li key={route.path}>
                <a href={route.path} className="flex justify-between">
                  <span>{route.name}</span>
                  <i className={`fa-solid fa-${route.icon}`} />
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
