import type { LoaderArgs, ActionArgs } from '@remix-run/node';
import { redirect } from '@remix-run/node';
import { Form } from '@remix-run/react'
import { getUserSession, signOut } from '~/utils/session.server';

export const loader = async ({ request }: LoaderArgs) => {
  const sessionUser = await getUserSession(request);
  if (!sessionUser) {
    return redirect('/login')
  }
  return null;
}

export const action = async ({ request }: ActionArgs) => {
  return signOut(request);
}
function Index() {
  return (
    <>
      <div>Admin Page</div>
      <ul>
        <li>CRUD Issues</li>
        <li>CRUD Posts</li>
        <li>CRUD Tags</li>
      </ul>
      <Form method="post">
        <button type="submit">Sign Out</button>
      </Form>
    </>
  )
}

export default Index;
