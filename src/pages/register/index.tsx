import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import Auth from '../../api/v1/auth';
import Button from '../../components/button';
import Text from '../../components/input/input';
import { setCookie } from '../../utils/cookie';
import Card from '../../components/card';

const Register: FC = () => {
  const { t } = useTranslation();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const AuthService = new Auth();

    try {
      const formData = new FormData(e.currentTarget);

      const response = await AuthService.register({
        name: formData.get('name') as string,
        email: formData.get('email') as string,
        password: formData.get('password') as string,
      });

      setCookie({ name: 'token', value: response.token, expires: 1 });

      // TODO: integrate refresh token
      // setCookie({ name: 'refresh_token', value: response.refresh_token, expires: 1 });
      window.location.href = '/app';
    } catch (error) {}
  };

  return (
    <section className="bg-gray-50 dark:bg-gray-900">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:min-h-[80vh] lg:py-0">
        <a
          href="/"
          className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white"
        >
          {t('lynksun')}
        </a>
        <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <Card>
            <h1 className="h2 mb-4">
              {t('create-an-account')}
            </h1>
            <form onSubmit={handleSubmit}>
              <Text name="name" placeholder={t('name')} label={t('name')} required />

              <Text
                type="email"
                name="email"
                placeholder={t('name-company.com')}
                label={t('email')}
                required
              />

              <Text
                type="password"
                name="password"
                placeholder="••••••••"
                label={t('password')}
                required
              />

              <Text
                type="password"
                name="confirm-password"
                placeholder="••••••••"
                label={t('confirm-password')}
                required
              />

              <div className="flex items-start mb-10">
                <div className="flex items-center h-5">
                  <input
                    id="terms"
                    aria-describedby="terms"
                    type="checkbox"
                    className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800"
                    required
                  />
                </div>
                <div className="ml-3 text-sm">
                  <label htmlFor="terms" className="font-light text-gray-500 dark:text-gray-300">
                    {t('i-accept-the')}{' '}
                    <a
                      className="font-medium text-primary-600 hover:underline dark:text-primary-500"
                      href="/terms"
                    >
                      {t('terms')}
                    </a>
                  </label>
                </div>
              </div>
              <Button type="submit" className="w-full btn mb-2.5" label={t('create-an-account')} />

              <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                {t('already-have-an-account')}{' '}
                <a
                  href="/login"
                  className="font-medium text-primary-600 hover:underline dark:text-primary-500"
                >
                  {t('login-here')}
                </a>
              </p>
            </form>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default Register;
