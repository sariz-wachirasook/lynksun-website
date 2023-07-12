import { type FC } from 'react';
import { useTranslation } from 'react-i18next';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { icon } from '@fortawesome/fontawesome-svg-core/import.macro';

const Aside: FC = () => {
  const { t } = useTranslation();

  const routes = [
    {
      name: t('dashboard'),
      path: '/app',
      icon: icon({ name: 'chart-pie', style: 'solid' }),
    },
    {
      name: t('links'),
      path: '/app/links',
      icon: icon({ name: 'link', style: 'solid' }),
    },
  ];

  const subRoutes = [
    {
      name: t('profile'),
      path: '/app/profile',
      icon: icon({ name: 'user', style: 'solid' }),
    },
    {
      name: t('settings'),
      path: '/app/settings',
      icon: icon({ name: 'cog', style: 'solid' }),
    },
  ];

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
        <FontAwesomeIcon icon={icon({ name: 'bars', style: 'solid' })} />
      </button>

      <aside
        id="default-sidebar"
        className="fixed sm:relative top-0 left-0 z-40 w-64 h-screen transition-transform -translate-x-full sm:translate-x-0 shadow-lg"
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
                  className="flex items-center p-2 h6 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
                >
                  <FontAwesomeIcon icon={route.icon} />
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
                  className="flex items-center h6 p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
                >
                  <FontAwesomeIcon icon={route.icon} />
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
