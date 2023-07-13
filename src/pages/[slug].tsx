import { useState, type FC, useEffect } from 'react';
import { LinkType } from '../interfaces/link';
import LinkService from '../api/v1/link';

const SlugPage: FC = () => {
  const slug = window.location.pathname.replace('/', '');
  const VITE_API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
  window.location.href = `${VITE_API_BASE_URL}/api/v1/links/open/${slug}`;

  return <></>;
};

export default SlugPage;
