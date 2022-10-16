import { json } from "@remix-run/node";
import { Link, useLoaderData } from "@remix-run/react";

import { getPosts } from '~/api/post.server';

export const loader = async () => {
  return json({
    posts: await getPosts()
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
