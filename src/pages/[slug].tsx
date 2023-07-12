import { type FC } from 'react';

const Slug: FC = () => {
  const slug = window.location.pathname.replace('/', '');
  const hostname = window.location.origin;
  window.location.href = `${hostname}/api/v1/links/open/${slug}`;
  return <></>;
};

export default Slug;
