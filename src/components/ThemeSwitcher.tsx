import { FC, useEffect, useState } from 'react';
import Button from './Button';
import { useTranslation } from 'react-i18next';
import { getCookie, setCookie } from '../utils/cookie';

interface ThemeType {
  theme: string;
  icon: string;
}

interface Props {
  className?: string;
}

const ThemeSwitcher: FC<Props> = ({ className }) => {
  const { t } = useTranslation();
  const [currentTheme, setCurrentTheme] = useState<ThemeType>();

  const themes: ThemeType[] = [
    {
      theme: 'autumn',
      icon: 'wheat-awn',
    },
    {
      theme: 'light',
      icon: 'sun',
    },
    {
      theme: 'dark',
      icon: 'moon',
    },
  ];

  useEffect(() => {
    const theme = getCookie('theme');
    if (theme) {
      const currentTheme = themes.find((item) => item.theme === theme);

      if (!currentTheme) {
        document.documentElement.dataset.theme = themes[0].theme;
        setCookie({
          name: 'theme',
          value: themes[0].theme,
        });
        return;
      }

      document.documentElement.dataset.theme = currentTheme?.theme;
      setCurrentTheme(currentTheme);
    } else {
      const currentTheme = themes[0];
      setCurrentTheme(currentTheme);
      setCookie({
        name: 'theme',
        value: currentTheme.theme,
      });
    }
  }, []);

  const handleChangeTheme = (theme: ThemeType) => {
    document.documentElement.dataset.theme = theme.theme;
    setCookie({
      name: 'theme',
      value: theme.theme,
    });
    setCurrentTheme(theme);
  };

  return (
    <div className={`dropdown dropdown-end ${className}`}>
      <label tabIndex={0} className="btn btn-ghost btn-outline">
        <i className="fa-solid fa-palette"></i>
      </label>
      <ul
        tabIndex={0}
        className="p-2 shadow menu dropdown-content z-[1] bg-base-100 rounded-box w-52 gap-y-2"
      >
        {themes.map((theme, index) => (
          <li key={index}>
            <button
              type="button"
              onClick={() => handleChangeTheme(theme)}
              className={`flex items-center justify-between w-full ${
                currentTheme?.theme === theme.theme ? 'active' : ''
              }`}
            >
              <span>{t(`${theme.theme}`)}</span>
              <i className="fa-solid fa-cupcake"></i>
              <i className={`fa-solid fa-${theme.icon}`} />
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ThemeSwitcher;
