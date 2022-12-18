import type { ActionArgs } from '@remix-run/node';
import { redirect } from '@remix-run/node';
import { getUserSession } from '~/utils/session.server';

export const loader = async ({ request }: ActionArgs) => {
  const sessionUser = await getUserSession(request);
  if (!sessionUser) {
    return redirect('/login')
  }
  return null;
}
function Index() {
  return (
    <div>Admin Page</div>
  )
}

export default Index;
