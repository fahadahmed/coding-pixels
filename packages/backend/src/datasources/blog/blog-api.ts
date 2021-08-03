import { RESTDataSource } from 'apollo-datasource-rest';

class BlogAPI extends RESTDataSource {
  constructor() {
    super();
    this.baseURL = 'https://strapi-blog-paprxbhjba-ts.a.run.app/'
  }

  async getPosts() {
    const data = await this.get(`blogs`);
    return data;
  }
}
export default BlogAPI;