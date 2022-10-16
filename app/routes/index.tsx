import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";

export const loader = () => {
  return json({
    posts: [
      {
        title: "Dark/Light Theme using React, Emotion and Typescript",
        slug: "dark-light-theme-using-react-emotion-and-typescript",
        tags: ["frontend", "react", "emotion"],
        content: "This is markdown content for the topic",
        id: 1
      },
      {
        title: "Setting up a modern React workflow with ViteJS",
        slug: "setting-up-a-modern-react-workflow-with-vitejs",
        tags: ["build-tools", "react", "vite"],
        content: "This is markdown content for the topic",
        id: 2
      },
      {
        title: "Getting started with Remix.run",
        slug: "getting-started-with-remix-run",
        tags: ["remix", "react", "fullstack"],
        content: "This is markdown content for the topic",
        id: 3
      },
      {
        title: "Integrating Firebase with Remix apps",
        slug: "integrating-firebase-with-remix-apps",
        tags: ["remix", "firebase", "fullstack"],
        content: "This is markdown content for the topic",
        id: 4
      },
      {
        title: "Creating a magazine layout with CSS Grid",
        slug: "creating-a-magazine-layout-with-css-grid",
        tags: ["css-grid", "frontend"],
        content: "This is markdown content for the topic",
        id: 5
      }
    ]
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
        <li key={post.id}>{post.title}</li>
      ))}
    </div>
  );
}
