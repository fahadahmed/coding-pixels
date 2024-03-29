import { json } from "@remix-run/node";
import { Link, useLoaderData } from "@remix-run/react";
import { gql } from "@apollo/client";
import graphqlClient from "~/api/client";
import type { Post } from "~/types/post";

export const loader = async () => {

  const query = gql`
    query {
      getPosts {
        id
        title
        tags
        slug
        content
      }
    }
  `;
  const res = await graphqlClient().query({ query });
  return json({
    posts: res.data.getPosts
  })
}

export default function Index() {

  const { posts } = useLoaderData();

  if (posts === null) {
    return (
      <div style={{ fontFamily: "system-ui, sans-serif", lineHeight: "1.4" }}>
        <h1>Remix, Graphql + Firebase</h1>
        <p>Currently there are no posts added to the backend. Please add a few posts to see them here.</p>
      </div>
    )
  }
  return (
    <div style={{ fontFamily: "system-ui, sans-serif", lineHeight: "1.4" }}>
      <h1>Remix, Graphql + Firebase</h1>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr' }}>
        {posts.map((post: Post) => (
          <div key={post.id}>
            <Link to={post.slug}>{post.title}</Link>
          </div>
        ))}
      </div>
    </div>
  );
}
