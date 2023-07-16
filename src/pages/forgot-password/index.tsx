import { FC, useState } from 'react';
import { useTranslation } from 'react-i18next';
import Button from '../../components/Button';
import Card from '../../components/Card';
import Text from '../../components/input/TextInput';

const ForgotPasswordPage: FC = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState('');

  const handleSubmit = (e: any) => {
    e.preventDefault();

    setLoading(true);

    const formData = new FormData(e.currentTarget);
    const email = formData.get('email');
    setTimeout(() => {
      // TODO:
      setLoading(false);
      setEmail(email as string);
      setIsSubmitted(true);
    }, 1000);
  };

  const handleResend = () => {
    setLoading(true);
    setIsSubmitted(false);

    setTimeout(() => {
      // TODO:
      setLoading(false);
      setIsSubmitted(true);
    }, 1000);
  };

  const { t } = useTranslation();
  return (
    <>
      <section>
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:min-h-[80vh] lg:py-0">
          <a href="/" className="h1 mb-4">
            {t('lynksun')} ({t('in-construction')})
          </a>

          {/* before submit */}
          {!isSubmitted && (
            <Card className="w-full max-w-md p-5 mb-5 opacity-50 pointer-events-none">
              {loading && (
                <div className="flex items-center justify-center">
                  <div className="w-6 h-6 mr-3 border-2 border-t-2 border-gray-900 rounded-full animate-spin"></div>
                  <span>{t('loading')}</span>
                </div>
              )}

              {!loading && (
                <>
                  <h1 className="mb-4">{t('forgot-password')}</h1>
                  <form onSubmit={handleSubmit}>
                    <Text
                      type="email"
                      name="email"
                      placeholder={t('name-company.com')}
                      label={t('email')}
                      required
                      autoComplete="email"
                      className="!mb-10"
                    />

                    <Button type="submit" className="w-full mb-2.5" label={t('send-email')} />
                  </form>
                </>
              )}
            </Card>
          )}

          {/* after submit */}
          {isSubmitted && (
            <Card className="w-full max-w-md p-5 mb-5">
              <h1 className="mb-4">{t('forgot-password')}</h1>
              <p className="mb-2.5">
                {t('we-sent-email-to')} <b>{email}</b>
              </p>
              <p className="mb-2.5">{t('please-check-your-email-to-reset-password')}</p>
              <p className="mb-2.5">{t('if-you-did-not-receive-email')}</p>
              <Button
                type="submit"
                className="w-full mb-2.5"
                label={t('resend-email')}
                onClick={handleResend}
              />
            </Card>
          )}
        </div>
      </section>
    </>
  );
};

export default ForgotPasswordPage;
