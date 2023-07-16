import { type FC } from 'react';
import { useTranslation } from 'react-i18next';
import { setCookie } from '../utils/cookie';

const LanguageSwitcher: FC = () => {
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
    <div className="dropdown dropdown-end">
      <label tabIndex={0} className="btn btn-ghost btn-outline">
        <i className="fa-solid fa-globe-asia" />
      </label>
      <ul
        tabIndex={0}
        className="p-2 shadow menu dropdown-content z-[1] bg-base-100 rounded-box w-52"
      >
        {availableLanguages.map((language) => (
          <li key={language}>
            <button
              type="button"
              onClick={() => handleChangeLanguage(language)}
              className="flex items-center justify-between w-full"
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
