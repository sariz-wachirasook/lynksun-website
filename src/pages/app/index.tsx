import { FC, lazy, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import LinkAnalyticsService from '../../api/v1/link-analytics';
import Card from '../../components/Card';
import VerticalBar from '../../components/chart/VerticalBarChart';
import { LinksType } from '../../interfaces/link';
import CardSkeleton from '../../components/skeleton/CardSkeleton';
import CardBar from '../../components/skeleton/CardBarSkeleton';

// lazy load
const Badge = lazy(() => import('../../components/Badge'));

const AppPage: FC = () => {
  const [user, setUser] = useState<any>();
  const [mostVisited, setMostVisited] = useState<LinksType>();
  const [totalVisitsByDate, setTotalVisitsByDate] = useState<any>();
  const [totalVisits, setTotalVisits] = useState<any>();
  const [loading, setLoading] = useState<boolean>(true);

  const { t } = useTranslation();

  const linkAnalyticService = new LinkAnalyticsService();
  const hostname = window.location.origin;

  useEffect(() => {
    init();
  }, []);

  const init = async () => {
    setLoading(true);
    await Promise.all([fetchMostVisited(), fetchTotalVisitsByDate(), fetchTotalVisits()]);

    setLoading(false);
  };

  const fetchMostVisited = async () => {
    const response = await linkAnalyticService.getMostVisited({
      per_page: 3,
    });
    setMostVisited(response);
  };

  const fetchTotalVisitsByDate = async () => {
    const response = await linkAnalyticService.getTotalVisitsByDate({});
    setTotalVisitsByDate(response);
  };

  const fetchTotalVisits = async () => {
    const response = await linkAnalyticService.getTotalVisits({});
    setTotalVisits(response);
  };

  const handleCopy = (link: string) => {
    navigator.clipboard.writeText(link);
    toast.info(t('copied'));
  };

  return (
    <section>
      <h1 className="mb-5">
        {t('howdy')}, {user?.name}
      </h1>
      <div className="grid md:grid-cols-3 gap-4 mb-4">
        {loading && (
          <>
            <CardSkeleton />
            <CardSkeleton />
            <CardSkeleton />
          </>
        )}
        {!loading && (
          <>
            <Card>
              <h4 className="mb-2.5">{t('total-link-created')}</h4>
              <p className="text-2xl font-bold">{mostVisited?.total}</p>
            </Card>
            <Card>
              <h4 className="mb-2.5">{t('total-visit')}</h4>
              <p className="text-2xl font-bold">{totalVisits?.total_visit_count}</p>
            </Card>
          </>
        )}
      </div>
      {loading && <CardBar className="mb-5" />}
      {!loading && totalVisitsByDate && (
        <Card className="mb-5">
          <VerticalBar
            title={t('visits')}
            datasets={[
              {
                label: t('last-365-days'),
                data: totalVisitsByDate.map((v: any) => v.count),
                backgroundColor: '#3B82F6',
              },
            ]}
            labels={totalVisitsByDate.map((v: any) => v.date)}
          />
        </Card>
      )}
      <h2 className="mb-4">{t('most-visited-links')}</h2>
      <div className="grid md:grid-cols-3 gap-4">
        {loading && (
          <>
            <CardSkeleton />
            <CardSkeleton />
            <CardSkeleton />
          </>
        )}
        {!loading &&
          mostVisited?.data?.map((link: any) => (
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
    </section>
  );
};

export default AppPage;
