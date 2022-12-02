import { redirect } from "@remix-run/node";
import type { ActionFunction } from "@remix-run/node";
import { useFetcher } from "@remix-run/react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { session } from "~/cookies";
import { auth as clientAuth } from "~/firebase.client";
import { auth as serverAuth } from '~/firebase.server';

export const action: ActionFunction = async ({ request }) => {
  const form = await request.formData();
  const idToken = form.get('idToken')?.toString() || '';
  await serverAuth.verifyIdToken(idToken);

  const jwt = await serverAuth.createSessionCookie(idToken, {
    expiresIn: 60 * 60 * 24 * 5 * 1000,
  });
  return redirect('/', {
    headers: {
      'Set-Cookie': await session.serialize(jwt)
    }
  });
}

export default function Login() {
  const fetcher = useFetcher();

  const handleSubmit = async (e: React.BaseSyntheticEvent) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;

    try {
      const credential = await signInWithEmailAndPassword(clientAuth, email, password);
      const idToken = await credential.user.getIdToken();
      // TODO: Handle ID token
      fetcher.submit({ idToken }, { method: 'post', action: '/admin/login' });
    } catch (error) {
      // Handle errors
      console.log('There was an error authenticating the user', error);
    }
  }

  return (
    <div>Login Form</div>
  )
}