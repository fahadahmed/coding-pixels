import { useLoaderData } from "@remix-run/react";
import { json } from "@remix-run/node";
import { getPost } from "~/api/post.server";

export const loader = async ({ params }) => {
  const post = await getPost(params.slug);
  return json({ post });

}
export default function BlogPost() {
  const { post } = useLoaderData();
  console.log(post);
  return (
    <div>
      <h1>{post.title}</h1>
      <p>{post.content}</p>
    </div>
  )
}