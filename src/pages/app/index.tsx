import { FC, useEffect, useState } from 'react';
import AppLayout from '../../layouts/app';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import Card from '../../components/card';
import LinkAnalyticsService from '../../api/v1/link-analytics';
import { LinksType } from '../../interfaces/link';
import Badge from '../../components/badge';
import { toast } from 'react-toastify';

const AppPage: FC = () => {
  const [mostVisited, setMostVisited] = useState<LinksType>();
  const { t } = useTranslation();
  const user = useSelector((state: any) => state.auth.user);
  const linkAnalyticService = new LinkAnalyticsService();
  const hostname = window.location.origin;

  useEffect(() => {
    fetchMostVisited();
  }, []);

  const fetchMostVisited = async () => {
    const response = await linkAnalyticService.getMostVisited({
      per_page: 3,
    });
    setMostVisited(response);
  };

  const handleCopy = (link: string) => {
    navigator.clipboard.writeText(link);
    toast.info(t('copied'));
  };

  return (
    <AppLayout>
      <h1 className="mb-5">
        {t('howdy')}, {user?.name}
      </h1>

      <div className="grid md:grid-cols-2 gap-4 mb-4">
        <Card>To</Card>
        <Card>To</Card>
      </div>
      <Card className="mb-5">To</Card>

      <h2 className="mb-4">{t('most-visited-links')}</h2>
      <div className="grid md:grid-cols-3 gap-4">
        {mostVisited?.data?.map((link: any) => (
          <Card key={link.id}>
            <div>
              <h5 className="mb-2.5 overflow-hidden truncate text-ellipsis block">
                {link.name ? link.name : `${hostname}/${link.short_url}`}
              </h5>
              <p className="flex flex-nowrap gap-2 items-center">
                {t('url')}:
                <Badge
                  className="overflow-hidden truncate text-ellipsis block cursor-pointer"
                  onClick={() => handleCopy(`${hostname}/${link.short_url}`)}
                >
                  <span>
                    <i className="fa-solid fa-copy mr-2"></i>
                    {`${hostname}/${link.short_url}`}
                  </span>
                </Badge>
              </p>
              <p>
                {t('total-visits')}: {link.visit_count}
              </p>
              <p className="flex flex-nowrap gap-2 items-center">
                <span className="whitespace-nowrap"> {t('original-url')}:</span>
                <Badge
                  className="overflow-hidden truncate text-ellipsis block cursor-pointer"
                  onClick={() => handleCopy(link.url)}
                >
                  <i className="fa-solid fa-copy mr-2"></i>
                  <span>{link.url}</span>
                </Badge>
              </p>
            </div>
          </Card>
        ))}
      </div>
    </AppLayout>
  );
};

export default AppPage;
