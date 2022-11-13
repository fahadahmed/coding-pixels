import * as functions from 'firebase-functions';
import type { ExpressContext } from 'apollo-server-express';
import { gql } from 'apollo-server-express';
import type { Config } from 'apollo-server-cloud-functions';
import { ApolloServer } from 'apollo-server-cloud-functions';
import * as admin from 'firebase-admin';

admin.initializeApp(functions.config().firebase);
const db = admin.firestore();

const posts = [
  {
    title: 'Dark/Light Theme using React, Emotion and Typescript',
    slug: 'dark-light-theme-using-react-emotion-and-typescript',
    tags: ['frontend', 'react', 'emotion'],
    content: 'This is markdown content for the topic',
    id: 1,
  },
  {
    title: 'Setting up a modern React workflow with ViteJS',
    slug: 'setting-up-a-modern-react-workflow-with-vitejs',
    tags: ['build-tools', 'react', 'vite'],
    content: 'This is markdown content for the topic',
    id: 2,
  },
  {
    title: 'Getting started with Remix.run',
    slug: 'getting-started-with-remix-run',
    tags: ['remix', 'react', 'fullstack'],
    content: 'This is markdown content for the topic',
    id: 3,
  },
  {
    title: 'Integrating Firebase with Remix apps',
    slug: 'integrating-firebase-with-remix-apps',
    tags: ['remix', 'firebase', 'fullstack'],
    content: 'This is markdown content for the topic',
    id: 4,
  },
  {
    title: 'Creating a magazine layout with CSS Grid',
    slug: 'creating-a-magazine-layout-with-css-grid',
    tags: ['css-grid', 'frontend'],
    content: 'This is markdown content for the topic',
    id: 5,
  },
];

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
    getPost: (parent: any, args: any, context: any, info: any) => {
      return posts.find((post) => post.slug === args.slug);
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
