import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import Button from '../../components/Button';
import Text from '../../components/input/TextInput';

const ResetPasswordPage: FC = () => {
  const { t } = useTranslation();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);

    try {
    } catch (error: any) {}
  };

  return (
    <section>
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:min-h-[80vh] lg:py-0">
        <a href="/" className="h1 mb-4">
          {t('lynksun')}
        </a>
        <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
              {t('reset-password')}
            </h1>
            <form onSubmit={handleSubmit}>
              <Text
                type="password"
                name="password"
                placeholder="••••••••"
                label={t('new-password')}
                required
                autoComplete="new-password"
              />

              <Text
                type="password"
                name="password"
                placeholder="••••••••"
                label={t('confirm-new-password')}
                required
                className="mb-10"
              />

              <Button type="submit" className="w-full mb-2.5" label={t('reset-password')} />
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ResetPasswordPage;
