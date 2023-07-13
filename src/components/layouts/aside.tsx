import { type FC } from 'react';
import { useTranslation } from 'react-i18next';

const Aside: FC = () => {
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
      name: t('settings'),
      path: '/app/settings',
      icon: 'cog',
    },
    {
      name: t('logout'),
      path: '/logout',
      icon: 'right-from-bracket',
    },
  ];

  const currentPath = window.location.pathname;

  console.log(currentPath);

  return (
    <>
      <button
        data-drawer-target="default-sidebar"
        data-drawer-toggle="default-sidebar"
        aria-controls="default-sidebar"
        type="button"
        className="btn btn--alternative fixed -left-3 bottom-5 "
      >
        <span className="sr-only">Open sidebar</span>
        <i className={`fa-solid fa-bars`} />
      </button>

      <aside
        id="default-sidebar"
        className="fixed sm:relative top-0 left-0 z-40 w-64 h-screen sm:h-full transition-transform -translate-x-full sm:translate-x-0 shadow-lg"
        aria-label="Sidebar"
      >
        <div className="h-full px-3 py-4 overflow-y-auto bg-gray-50 dark:bg-gray-800 flex flex-col">
          <div>
            <h2>{t('lynksun')}</h2>
          </div>

          <hr className="my-4 dark:border-gray-700" />
          <ul className="space-y-2 font-medium mt-auto sm:m-0">
            {routes.map((route) => (
              <li key={route.path}>
                <a
                  href={route.path}
                  className={`flex items-center p-2 h5 font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group ${
                    route.path === currentPath ? 'bg-gray-100 dark:bg-gray-700' : ''
                  }`}
                >
                  <i className={`fa-solid fa-${route.icon}`} />
                  <span className="ml-3">{route.name}</span>
                </a>
              </li>
            ))}
          </ul>
          <hr className="my-4 dark:border-gray-700" />
          <ul className="space-y-2 font-medium sm:m-0">
            {subRoutes.map((route) => (
              <li key={route.path}>
                <a
                  href={route.path}
                  className={`flex items-center h5 font-normal p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group ${
                    route.path === currentPath ? 'bg-gray-100 dark:bg-gray-700' : ''
                  }`}
                >
                  <i className={`fa-solid fa-${route.icon}`} />
                  <span className="ml-3">{route.name}</span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </aside>
    </>
  );
};

export default Aside;