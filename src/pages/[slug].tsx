import { useEffect, useState, type FC } from 'react';
import LinkService from '../api/v1/link';
import { LinkType } from '../interfaces/link';
import Error404Page from './404';

const SlugPage: FC = () => {
  const [loading, setLoading] = useState<boolean>(true);

  // const slug = window.location.pathname.replace('/', '');
  // const VITE_API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
  // window.location.href = `${VITE_API_BASE_URL}/api/v1/links/open/${slug}`;

  useEffect(() => {
    const linkService = new LinkService();
    const fetchLink = async () => {
      try {
        const slug = window.location.pathname.replace('/', '');
        const response = await linkService.getOneBySlug(slug);
        const link: LinkType = response;
        if (link) {
          window.location.href = link.url;
        } else {
          setLoading(false);
        }
      } catch (error) {
        setLoading(false);
      }
    };
    fetchLink();
  }, []);

  if (loading) {
    return <div>Checking...</div>;
  } else {
    return <Error404Page />;
  }
};

export default SlugPage;
