import { objectType, extendType } from 'nexus';

export const Article = objectType({
  name: 'Article',
  definition(t) {
    t.string('id');
    t.string('title');
    t.string('content');
  }
});

export const BlogQuery = extendType({
  type: 'Query',
  definition(t) {
    t.nullable.list.field('Blog', {
      type: 'Article',
      async resolve(_, __, { dataSources: { blogAPI }}) {
        const data = await blogAPI.getPosts();
        return data;
      }
    })
  }
})