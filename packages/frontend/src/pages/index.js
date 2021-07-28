import React from 'react';
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  gql
} from '@apollo/client';

const client = new ApolloClient({
  uri: 'http://localhost:4000',
  cache: new InMemoryCache()
});

client.query({
  query: gql`
    query {
      Blog {
        id
        title
        content
      }
    }
  `
})
.then(result => console.log(result))
.catch(err => console.log(err.message));

function App() {
  return(
    <>
      <ApolloProvider client={client}>
        <h1>Hello Gatsby</h1>
      </ApolloProvider>
    </>
  )
}

export default App;