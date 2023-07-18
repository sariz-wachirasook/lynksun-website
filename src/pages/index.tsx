import { FormEvent, lazy, useState, type FC } from 'react';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import LinkService from '../api/v1/link';
import Button from '../components/Button';
import Card from '../components/Card';
import Input from '../components/input/TextInput';
import { LinkType } from '../interfaces/link';
import { getCookie } from '../utils/cookie';
import CardSkeleton from '../components/skeleton/CardSkeleton';

const Badge = lazy(() => import('../components/Badge'));
const Datetime = lazy(() => import('../components/Datetime'));

const Page: FC = () => {
  // state
  const [loading, setLoading] = useState(false);
  const [link, setLink] = useState<LinkType>({
    id: 0,
    url: '',
    short_url: '',
    expires_at: '',
    updated_at: '',
    created_at: '',
  });

  // -------------------- //
  const { t } = useTranslation();
  const token = getCookie('token');
  const notifyError = () => toast.error(t('something-went-wrong'));
  const features = [
    {
      title: t('freemium'),
      description: t('freemium-description'),
      icon: 'sack-dollar',
    },
    {
      title: t('fast'),
      description: t('fast-description'),
      icon: 'bolt',
    },
    {
      title: t('qr-code'),
      description: t('qr-code-description'),
      icon: 'qrcode',
    },
  ];

  if (token) {
    window.location.href = '/app';
  }

  // function
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const linkService = new LinkService();
    setLoading(true);

    try {
      const response = await linkService.create({
        url: formData.get('url') as string,
      });

      setLink(response);
    } catch (error: any) {
      notifyError();
    }

    setLoading(false);
  };

  const handleCopy = () => {
    const hostname = window.location.origin;
    navigator.clipboard.writeText(`${hostname}/${link.short_url}`);
    toast.success(t('copied'));
  };

  // render
  return (
    <>
      {/* header */}
      <section>
        <div className="text-center mb-5 mt-5">
          <h1>{t('lynksun')}</h1>
          <p>{t('shorten-your-link')}</p>
        </div>
      </section>

      {/* form */}
      <section>
        <Card className="mx-auto w-full max-w-xl">
          <h2 className="text-center mb-5">{t('fill-the-link-you-want-to-shorten')}</h2>
          <form onSubmit={handleSubmit}>
            <Input
              name="url"
              label={t('enter-the-url')}
              placeholder={t('enter-the-url')}
              required
            />
            <Button type="submit" className="mb-2.5">
              {loading && <span className="loading loading-spinner"></span>}
              {t('submit')}
            </Button>
            <p>
              {t('any-link-will-expires-in-24hr-consider-to')}{' '}
              <a href="/register">{t('register')}</a> {t('to-get-unlimited-link-expires-time')}
            </p>
          </form>
        </Card>
      </section>

      {/* result */}
      <section
        className={`max-h-0 overflow-hidden duration-300 transition-all ${link.short_url ? 'max-h-[300px] md:max-h-[250px]' : ''}`}
      >
        {loading && <CardSkeleton className="mt-5 max-w-xl mx-auto w-full" />}
        {link.short_url && !loading && (
          <Card className="mx-auto w-full max-w-xl mt-5">
            <div className="mb-4">
              <h3 className="mb-4">{t('your-link-is-ready')}</h3>
              <div className="grid grid-cols-[1fr,auto] gap-4 mb-4">
                <Input name="url" className="mb-0" required value={link.short_url} disabled />

                <Button label="Copy" onClick={() => handleCopy()} />
              </div>
              <p>
                {t('your-link-will-be-expired-at')}
                <Badge className="ml-2">
                  <Datetime datetimeString={link.expires_at as string} />
                </Badge>
              </p>
            </div>
          </Card>
        )}
      </section>

      <section>
        <ul className="grid md:grid-cols-3 gap-4 sm:mx-12 lg:mx-24 mt-10">
          {features.map((feature, index) => (
            <li key={index} className="grid grid-cols-[auto,1fr] gap-4 shadow-lg rounded-3xl p-2">
              <div className="w-20 h-20 flex items-center rounded-full justify-center border border-base-200">
                <i className={`fa-solid text-2xl fa-${feature.icon}`}></i>
              </div>
              <div className="flex flex-col justify-center">
                <h4>{feature.title}</h4>
                <p>{feature.description}</p>
              </div>
            </li>
          ))}
        </ul>
      </section>
    </>
  );
};

export default Page;
