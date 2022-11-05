import { useLoaderData } from "@remix-run/react";
import { json } from "@remix-run/node";
import { gql } from "@apollo/client";
import graphqlClient from "~/api/client";

type LoaderType = {
  params: {
    slug: string,
  }
}
export const loader = async ({ params }: LoaderType) => {
  const query = gql`
    query GetPost($slug: String!) {
      getPost(slug: $slug) {
        id
        title
        content
        slug
        tags
      }
    }
  `;
  const res = await graphqlClient().query({ query, variables: { slug: params.slug } });
  return json({
    post: res.data.getPost
  });

}
export default function BlogPost() {
  const { post } = useLoaderData();
  return (
    <div>
      <h1>{post.title}</h1>
      <p>{post.content}</p>
    </div>
  )
}