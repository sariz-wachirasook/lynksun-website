import type { ReactElement } from 'react';
import Layout from '../layouts/default';
import type { NextPageWithLayout } from './_app';

const Page: NextPageWithLayout = () => {
  return <p>hello world</p>;
};

Page.getLayout = function getLayout(page: ReactElement) {
  return <Layout>Hello</Layout>;
};

export default Page;
