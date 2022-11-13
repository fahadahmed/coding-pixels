import { json } from "@remix-run/node";
import { Link, useLoaderData } from "@remix-run/react";
import { gql } from "@apollo/client";
import graphqlClient from "~/api/client";

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

export type Post = {
  title: string,
  slug: string,
  tags: Array<string>,
  content: string,
  id: number
}

export default function Index() {

  const { posts } = useLoaderData();
  return (
    <div style={{ fontFamily: "system-ui, sans-serif", lineHeight: "1.4" }}>
      <h1>Remix, Graphql + Firebase</h1>
      {posts.map((post: Post) => (
        <li key={post.id}>
          <Link to={post.slug}>{post.title}</Link>
        </li>
      ))}
    </div>
  );
}
