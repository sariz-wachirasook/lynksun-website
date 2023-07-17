import { useEffect, useState, type FC } from 'react';
import { useTranslation } from 'react-i18next';

const Aside: FC = () => {
  const [currentPath, setCurrentPath] = useState('');
  const { t } = useTranslation();

  const routes = [
    {
      name: t('dashboard'),
      path: '/app',
      icon: 'chart-pie',
    },
    {
      name: t('links'),
      path: '/app/links',
      icon: 'link',
    },
  ];

  const subRoutes = [
    {
      name: t('profile'),
      path: '/app/profile',
      icon: 'user',
    },
    {
      name: t('logout'),
      path: '/logout',
      icon: 'right-from-bracket',
    },
  ];

  useEffect(() => {
    setCurrentPath(window.location.pathname);
  }, []);

  return (
    <div className="drawer lg:drawer-open z-10 border-r-2 border-base-300">
      <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content flex flex-col items-center justify-center absolute">
        {/* Page content here */}
        <label
          htmlFor="my-drawer-2"
          className="btn btn-primary shadow-lg drawer-button lg:hidden fixed bottom-5 left-5"
        >
          <i className="fa-solid fa-bars" />
        </label>
      </div>
      <div className="drawer-side">
        <label htmlFor="my-drawer-2" className="drawer-overlay"></label>
        <ul className="menu p-4 w-80 h-full bg-base-200 text-base-content gap-y-2.5">
          {routes.map((route) => (
            <li key={route.path}>
              <a
                href={route.path}
                className={`flex justify-between h6 ${route.path === currentPath ? 'active' : ''}`}
              >
                <span>{route.name}</span>
                <i className={`fa-solid fa-${route.icon}`} />
              </a>
            </li>
          ))}

          {subRoutes.map((route) => (
            <li key={route.path}>
              <a
                href={route.path}
                className={`flex justify-between h6 ${route.path === currentPath ? 'active' : ''}`}
              >
                <span>{route.name}</span>
                <i className={`fa-solid fa-${route.icon}`} />
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Aside;
