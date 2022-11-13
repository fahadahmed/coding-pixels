import {
  ApolloClient,
  createHttpLink,
  from,
  InMemoryCache,
} from '@apollo/client';

import { onError } from '@apollo/client/link/error';

const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors)
    graphQLErrors.forEach(({ message, locations, path }) =>
      console.log(
        `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
      )
    );
  if (networkError) console.log(`[Network error]: ${networkError}`);
});

const graphqlClient = () => {
  const link = createHttpLink({
    uri: process.env.GRAPHQL_SERVER_URL,
    credentials: 'same-origin',
  });
  return new ApolloClient({
    cache: new InMemoryCache(),
    ssrMode: true,
    link: from([errorLink, link]),
  });
};

export default graphqlClient;
