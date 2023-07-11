import { type FC } from 'react';

import Layout from '../layouts/default';

const PageNotFound: FC = () => {
  return (
    <Layout>
      <div className="text-center mb-5 pt-[30vh]">
        <h1>404</h1>
        <p>Page Not Found</p>
      </div>
    </Layout>
  );
};

export default PageNotFound;
