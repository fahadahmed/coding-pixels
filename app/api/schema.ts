import gql from 'graphql-tag';
import { makeExecutableSchema } from 'graphql-tools';

const typeDefs = gql`
  type Post {
    title: String
    slug: String
    content: String
    tags: [String]
    id: Int
  }

  type Query {
    posts: [Post]
  }
`;

const schema = makeExecutableSchema({
  typeDefs,
});

export default schema;
