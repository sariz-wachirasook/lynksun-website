import { type FC } from 'react';
import { useTranslation } from 'react-i18next';

const LanguageSwitcher: FC = () => {
  const { t, i18n } = useTranslation();
  const availableLanguages = ['en', 'th'];

  const changeLanguage = (language: string) => {
    i18n.changeLanguage(language);
  };

  return (
    <>
      <button
        id="dropdownHoverButton"
        data-dropdown-toggle="dropdownHover"
        data-dropdown-trigger="hover"
        className="btn btn--alternative"
        type="button"
      >
        <i className="fa-solid fa-globe-asia" />
      </button>
      <div
        id="dropdownHover"
        className="z-10 hidden bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700"
      >
        <ul
          className="py-2 text-sm text-gray-700 dark:text-gray-200"
          aria-labelledby="dropdownHoverButton"
        >
          {availableLanguages.map((language) => (
            <li
              key={language}
              className={`px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 ${
                language === i18n.language ? 'pointer-events-none' : ''
              }`}
            >
              <button
                type="button"
                onClick={() => changeLanguage(language)}
                className="flex items-center justify-between w-full"
              >
                <span>{t(`${language}`)}</span>
                {language === i18n.language && <i className="fa-solid fa-check" />}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default LanguageSwitcher;
