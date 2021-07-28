import React from 'react';
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  gql,
  useQuery
} from '@apollo/client';

const client = new ApolloClient({
  uri: 'http://localhost:4000',
  cache: new InMemoryCache()
});

const BLOG_POSTS = gql`
  query {
      Blog {
        id
        title
        content
      }
    }
`;

function Blog() {
  const { loading, error, data } = useQuery(BLOG_POSTS);
  if (loading) return <p>Loading ...</p>;
  if (error) return <p>Error</p>
  return data.Blog.map( post => (
    <div key={post.id}>
      <h2>{post.title}</h2>
      <div>{post.content}</div>
    </div>
  ))
}
function App() {
  return(
    <>
      <ApolloProvider client={client}>
        <h1>Hello Gatsby</h1>
        <Blog />
      </ApolloProvider>
    </>
  )
}

export default App;