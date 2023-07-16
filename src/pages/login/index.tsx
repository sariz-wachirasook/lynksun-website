import { FC, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import Auth from '../../api/v1/auth';
import Button from '../../components/button';
import Text from '../../components/input/input';
import { setCookie } from '../../utils/cookie';
import Card from '../../components/card';

const LoginPage: FC = () => {
  const { t } = useTranslation();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const AuthService = new Auth();

    try {
      const formData = new FormData(e.currentTarget);

      const request = await AuthService.login({
        email: formData.get('email') as string,
        password: formData.get('password') as string,
      });

      setCookie({ name: 'token', value: request.token, expires: 1 });

      if (window.location.pathname.includes('login')) {
        window.location.href = '/app';
      } else {
        window.location.href = window.location.href;
      }
    } catch (error) {}
  };

  return (
    <section>
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:min-h-[80vh] lg:py-0">
        <a href="/" className="h1 mb-4">
          {t('lynksun')}
        </a>
        <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <Card>
            <h1 className="h2 mb-4">{t('sign-in-to-your-account')}</h1>
            <form onSubmit={handleSubmit} className="flex flex-col">
              <Text
                type="email"
                name="email"
                placeholder={t('name-company.com')}
                label={t('email')}
                required
                autoComplete="email"
              />

              <Text
                type="password"
                name="password"
                placeholder="••••••••"
                label={t('password')}
                required
                autoComplete="current-password"
              />

              {/* TODO: remember me */}
              <div className="flex items-center justify-between mb-10">
                <div className="flex items-start">
                  <div className="flex items-center h-5">
                    <input
                      id="remember"
                      aria-describedby="remember"
                      type="checkbox"
                      className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800"
                    />
                  </div>
                  <div className="ml-3 text-sm">
                    <label htmlFor="remember" className="text-gray-500 dark:text-gray-300">
                      {t('remember-me')}
                    </label>
                  </div>
                </div>
                <a
                  href="/forgot-password"
                  className="text-sm font-medium text-primary-600 hover:underline dark:text-primary-500"
                >
                  {t('forgot-password')}
                </a>
              </div>
              <Button type="submit" className="w-full mb-2.5" label={t('sign-in')} />

              <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                {t('dont-have-an-account-yet')}{' '}
                <a
                  href="/register"
                  className="font-medium text-primary-600 hover:underline dark:text-primary-500"
                >
                  {t('sign-up')}
                </a>
              </p>
            </form>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default LoginPage;
