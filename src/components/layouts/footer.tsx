import { type FC } from 'react';
import { useTranslation } from 'react-i18next';

const Footer: FC = () => {
  const { t } = useTranslation();

  return (
    <footer className="bg-primary rounded-lg shadow m-4 dark:bg-gray-800 max-w-screen-xl mx-auto">
      <div className="w-full mx-auto max-w-screen-xl p-4 md:flex md:items-center md:justify-between">
        <span className="text-sm text-white sm:text-center dark:text-gray-400">
          © 2023{' '}
          <a href="/" className="hover:underline">
            {t('lynksun')}
          </a>
          . {t('all-rights-reserved')}
        </span>
        <ul className="flex flex-wrap items-center mt-3 text-sm font-medium text-white dark:text-gray-400 sm:mt-0">
          <li>
            <a href="/about" className="mr-4 hover:underline md:mr-6 ">
              {t('about')}
            </a>
          </li>
          <li>
            <a href="/terms" className="mr-4 hover:underline md:mr-6 ">
              {t('terms')}
            </a>
          </li>
        </ul>
      </div>
    </footer>
  );
};

export default Footer;
