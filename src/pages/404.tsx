import { type FC } from 'react';
import { useTranslation } from 'react-i18next';

const Error404Page: FC = () => {
  const { t } = useTranslation();

  return (
    <div className="min-h-[80vh] flex flex-col mb-5 justify-center items-center">
      <h1 className="mb-4">{t('404')}</h1>
      <img src="/sad-cat.gif" alt="Sad Cat" className="mx-auto mb-4 w-[20rem] rounded-lg" />
      <p>{t('404-message')}</p>
    </div>
  );
};

export default Error404Page;
