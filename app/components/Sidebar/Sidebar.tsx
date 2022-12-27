import { Link, Form } from "@remix-run/react";

export default function Sidebar() {
  return (
    <div>
      <div><Link to='issues'>Issues</Link></div>
      <div><Link to='posts'>Posts</Link></div>
      <div><Link to='tags'>Tags</Link></div>

      <Form method="post" action="/admin">
        <button type="submit">Sign Out</button>
      </Form>
    </div>
  )
}