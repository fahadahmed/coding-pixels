import * as functions from 'firebase-functions';

const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const { buildSchema } = require('graphql');

const app = express();

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

const schema = buildSchema(`
  type Post {
    title: String
    slug: String
    tags: [String]
    content: String
    id: Int
  }
  type Query {
    hello: String
    getPosts: [Post]
    getPost(slug: String!): Post
  }
`);

var root = {
  hello: () => {
    return 'Hello World';
  },
  getPosts: () => {
    return posts;
  },
  getPost: (args: any) => {
    return posts.find((post) => post.slug === args.slug);
  },
};

app.use(
  '/',
  graphqlHTTP({
    schema: schema,
    rootValue: root,
    graphiql: true,
  })
);

exports.graphql = functions.https.onRequest(app);
