import { Outlet } from "@remix-run/react";
import { Sidebar } from "~/components";
import type { LoaderArgs, ActionArgs } from '@remix-run/node';
import { redirect } from '@remix-run/node';
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

function Admin() {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: '3fr 9fr', gap: '1rem' }}>
      <Sidebar />
      <div>
        <Outlet />
      </div>
    </div>
  )
}

export default Admin;