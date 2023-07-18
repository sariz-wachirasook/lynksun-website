import BaseApi from './base';

class PostsService extends BaseApi {
  public static instance: PostsService;

  public getOne(slug: string, locale: string): Promise<any> {
    const fallbackLocale = 'en';

    return this.post(
      '/',
      `{
        allPosts(where:{
          slug:{
            current:{
              in: ["${slug}-${locale}", "${slug}-${fallbackLocale}"]
            }
          }
        }) {
          title
          bodyRaw
          _updatedAt
        }
      }`,
    );
  }
}

export default PostsService;
