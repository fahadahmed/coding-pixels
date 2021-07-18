import { RESTDataSource } from 'apollo-datasource-rest';

class BlogAPI extends RESTDataSource {
  constructor() {
    super();
    this.baseURL = 'http://localhost:1337/'
  }

  async getPosts() {
    const data = await this.get(`posts`);
    return data;
  }
}
export default BlogAPI;