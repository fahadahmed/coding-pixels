import BlogAPI from './blog/blog-api';

export type BlogDataSources = {
  blogAPI: BlogAPI;
}

const blogDataSources = (): BlogDataSources => ({
  blogAPI: new BlogAPI(),
});

export default blogDataSources;