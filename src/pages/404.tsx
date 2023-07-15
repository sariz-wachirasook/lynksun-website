import { type FC } from 'react';

const Error404Page: FC = () => {
  return (
    <div className="min-h-[80vh] flex flex-col mb-5 justify-center items-center">
      <h1 className='mb-4'>404</h1>
      <img src="/sad-cat.gif" alt="Sad Cat" className="mx-auto mb-4 w-[20rem] rounded-lg" />
      <>It's look like you're link is expired or invalid.</>
    </div>
  );
};

export default Error404Page;
