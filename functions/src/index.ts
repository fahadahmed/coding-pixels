import * as functions from 'firebase-functions';
import type { ExpressContext } from 'apollo-server-express';
import { gql } from 'apollo-server-express';
import type { Config } from 'apollo-server-cloud-functions';
import { ApolloServer } from 'apollo-server-cloud-functions';
import * as admin from 'firebase-admin';

admin.initializeApp(functions.config().firebase);
const db = admin.firestore();

const typeDefs = gql`
  type Post {
    title: String
    slug: String
    tags: [String]
    content: String
    id: String
  }

  type Query {
    getPosts: [Post]
    getPost(slug: String!): Post
  }
`;

const resolvers = {
  Query: {
    getPosts: async () => {
      const snapshot = await db.collection('posts').get();
      const posts: any = [];
      snapshot.forEach((doc) => {
        posts.push({ id: doc.id, ...doc.data() });
      });
      return posts;
    },
    getPost: async (parent: any, args: any, context: any, info: any) => {
      const snapshot = await db.collection('posts').get();
      let post;
      snapshot.forEach((doc) => {
        if (doc.data().slug === args.slug) {
          post = doc.data();
        }
      });
      return post;
    },
  },
};

const graphqlConfig: Config<ExpressContext> = {
  typeDefs,
  resolvers,
};

const server = new ApolloServer(graphqlConfig);
const handler = server.createHandler();

exports.graphql = functions.https.onRequest(handler as any);
