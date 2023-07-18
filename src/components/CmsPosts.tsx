import { FC, useEffect, useState } from 'react';
import { PortableText } from '@portabletext/react';
import { getCookie } from '../utils/cookie';
import { getDate } from '../utils/date';
import PostsService from '../services/cms/v1/posts';
import Error404Page from '../pages/404';

interface Posts {
  title: string;
  bodyRaw: any[];
  _updatedAt: string | null;
}

interface Props {
  slug: string;
}

const CmsPosts: FC<Props> = ({ slug }) => {
  const [posts, setPosts] = useState<Posts>();
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const locale = getCookie('locale');
    const postService = new PostsService();
    const response = await postService.getOne(slug, locale);
    setPosts(response.data.allPosts[0]);
    setLoading(false);
  };

  return (
    <>
      {loading && !posts && (
        <article className="prose mx-auto max-w-[80ch]">
          <div className="h-4 bg-gray-200 rounded-full w-48 mb-12"></div>
          <div className="h-2 bg-gray-200 rounded-full mb-12 w-32"></div>

          <div className="h-3 bg-gray-200 rounded-full w-48 mb-2.5"></div>
          <div className="h-2 bg-gray-200 rounded-full mb-2.5"></div>
          <div className="h-2 bg-gray-200 rounded-full mb-2.5"></div>
          <div className="h-2 bg-gray-200 rounded-full mb-2.5"></div>
          <div className="h-2 bg-gray-200 rounded-full mb-2.5"></div>
          <div className="h-2 bg-gray-200 rounded-full w-48 mb-10"></div>

          <div className="h-3 bg-gray-200 rounded-full w-48 mb-2.5"></div>
          <div className="h-2 bg-gray-200 rounded-full mb-2.5"></div>
          <div className="h-2 bg-gray-200 rounded-full mb-2.5"></div>
          <div className="h-2 bg-gray-200 rounded-full mb-2.5"></div>
          <div className="h-2 bg-gray-200 rounded-full mb-2.5"></div>
          <div className="h-2 bg-gray-200 rounded-full w-60 mb-10"></div>

          <div className="h-3 bg-gray-200 rounded-full w-48 mb-2.5"></div>
          <div className="h-2 bg-gray-200 rounded-full mb-2.5"></div>
          <div className="h-2 bg-gray-200 rounded-full mb-2.5"></div>
          <div className="h-2 bg-gray-200 rounded-full mb-2.5"></div>
          <div className="h-2 bg-gray-200 rounded-full mb-2.5"></div>
          <div className="h-2 bg-gray-200 rounded-full w-24 mb-10"></div>

          <div className="h-3 bg-gray-200 rounded-full w-48 mb-2.5"></div>
          <div className="h-2 bg-gray-200 rounded-full mb-2.5"></div>
          <div className="h-2 bg-gray-200 rounded-full mb-2.5"></div>
          <div className="h-2 bg-gray-200 rounded-full mb-2.5"></div>
          <div className="h-2 bg-gray-200 rounded-full mb-2.5"></div>
          <div className="h-2 bg-gray-200 rounded-full w-48 mb-10"></div>

          <div className="h-3 bg-gray-200 rounded-full w-48 mb-2.5"></div>
          <div className="h-2 bg-gray-200 rounded-full mb-2.5"></div>
          <div className="h-2 bg-gray-200 rounded-full mb-2.5"></div>
          <div className="h-2 bg-gray-200 rounded-full mb-2.5"></div>
          <div className="h-2 bg-gray-200 rounded-full mb-2.5"></div>
          <div className="h-2 bg-gray-200 rounded-full w-60 mb-10"></div>
        </article>
      )}
      {!loading && posts && (
        <article className="prose mx-auto max-w-[80ch]">
          <h1>{posts?.title}</h1>
          <p>Updated at: {getDate(posts?._updatedAt as string)}</p>
          <PortableText value={posts?.bodyRaw} />
        </article>
      )}

      {!loading && !posts && <Error404Page />}
    </>
  );
};

export default CmsPosts;
