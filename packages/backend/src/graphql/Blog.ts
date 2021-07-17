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
    t.nonNull.list.field('Blog', {
      type: 'Article',
      resolve() {
        return [
          { id: '1', title: 'Blog Title 1', content: 'Content of the blog article 1.' }
        ]
      }
    })
  }
})