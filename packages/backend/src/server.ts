import { ApolloServer } from 'apollo-server';
import { schema } from './schema';
import datasources from './datasources';

export const server = new ApolloServer({
  schema,
  dataSources: datasources
});