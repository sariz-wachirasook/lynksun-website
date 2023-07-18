import { type FC } from 'react';
import { useTranslation } from 'react-i18next';
import { setCookie } from '../utils/cookie';

interface Props {
  className?: string;
}

const LanguageSwitcher: FC<Props> = ({ className }) => {
  const { t, i18n } = useTranslation();
  const availableLanguages = ['en', 'th'];

  // function
  const handleChangeLanguage = (locale: string) => {
    i18n.changeLanguage(locale);
    setCookie({
      name: 'locale',
      value: locale,
    });
  };

  return (
    <div className={`dropdown dropdown-end ${className}`}>
      <label tabIndex={0} className="btn btn-ghost btn-outline">
        <svg
          className="h-4 w-4 fill-current"
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          viewBox="0 0 512 512"
        >
          <path d="M363,176,246,464h47.24l24.49-58h90.54l24.49,58H480ZM336.31,362,363,279.85,389.69,362Z"></path>
          <path d="M272,320c-.25-.19-20.59-15.77-45.42-42.67,39.58-53.64,62-114.61,71.15-143.33H352V90H214V48H170V90H32v44H251.25c-9.52,26.95-27.05,69.5-53.79,108.36-32.68-43.44-47.14-75.88-47.33-76.22L143,152l-38,22,6.87,13.86c.89,1.56,17.19,37.9,54.71,86.57.92,1.21,1.85,2.39,2.78,3.57-49.72,56.86-89.15,79.09-89.66,79.47L64,368l23,36,19.3-11.47c2.2-1.67,41.33-24,92-80.78,24.52,26.28,43.22,40.83,44.3,41.67L255,362Z"></path>
        </svg>
      </label>
      <ul
        tabIndex={0}
        className="p-2 shadow menu dropdown-content z-[1] bg-base-100 rounded-box w-52 gap-y-2"
      >
        {availableLanguages.map((language) => (
          <li key={language}>
            <button
              type="button"
              onClick={() => handleChangeLanguage(language)}
              className={`flex items-center justify-between w-full ${
                language === i18n.language ? 'active' : ''
              }`}
            >
              <span>{t(`${language}`)}</span>
              {language === i18n.language && <i className="fa-solid fa-check" />}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default LanguageSwitcher;
