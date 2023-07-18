import { useEffect, useState } from 'react';
import PostsService from '../../services/cms/v1/posts';
import { PortableText } from '@portabletext/react';
import { getCookie } from '../../utils/cookie';
import { getDate, getDateTime } from '../../utils/date';

interface Posts {
  title: string;
  bodyRaw: any[];
  _updatedAt: string | null;
}

const TermsPage = () => {
  const [terms, setTerms] = useState<Posts>();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const locale = getCookie('locale');
    const postService = new PostsService();
    const response = await postService.getOne('terms', locale);

    setTerms(response.data.allPosts[0]);
  };

  return (
    <>
      {terms && (
        <article className="prose mx-auto max-w-[80ch]">
          <h1>{terms?.title}</h1>
          <p>Updated at: {getDate(terms?._updatedAt as string)}</p>
          <PortableText value={terms?.bodyRaw} />
        </article>
      )}
    </>
  );
};

export default TermsPage;
