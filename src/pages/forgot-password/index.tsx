import { FC } from 'react';
import DefaultLayout from '../../layouts/default';
import Button from '../../components/button';
import Text from '../../components/input/input';
import { useTranslation } from 'react-i18next';

const ForgotPassword: FC = () => {
  const { t } = useTranslation();
  return (
    <DefaultLayout>
      <section>
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-[80vh] lg:py-0">
          <a
            href="/"
            className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white"
          >
            {t('lynksun')}
          </a>
          <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                {t('forgot-password')}
              </h1>
              <form action="#">
                <Text
                  type="email"
                  name="email"
                  placeholder={t('name-company.com')}
                  label={t('email')}
                  required
                  autoComplete="email"
                />

                <Button type="submit" className="w-full mb-2.5" label={t('send-email')} />
              </form>
            </div>
          </div>
        </div>
      </section>
    </DefaultLayout>
  );
};

export default ForgotPassword;
