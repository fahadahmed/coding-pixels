import { createCookieSessionStorage, redirect } from '@remix-run/node';
import { getSessionToken, signOutFirebase, adminAuth } from './firebase.server';

require('dotenv').config();

const sessionSecret = process.env.SESSION_SECRET;

if (!sessionSecret) {
  throw new Error('SESSION_SECRET must be set');
}

const storage = createCookieSessionStorage({
  cookie: {
    name: '__session',
    secure: process.env.NODE_ENV === 'production',
    secrets: [sessionSecret],
    sameSite: 'lax',
    path: '/',
    maxAge: 60 * 60 * 24 * 30,
    httpOnly: true,
  },
});

async function createUserSession(idToken: any, redirectTo: any) {
  const token = await getSessionToken(idToken);
  const session = storage.getSession();
  (await session).set('token', token);
  return redirect(redirectTo, {
    headers: {
      'Set-Cookie': await storage.commitSession(await session),
    },
  });
}

async function getUserSession(request: Request) {
  const cookieSession = await storage.getSession(request.headers.get('Cookie'));
  const token = cookieSession.get('token');
  if (!token) return null;
  try {
    console.log('Do we get here');
    const tokenUser = await adminAuth.verifySessionCookie(token, true);
    return tokenUser;
  } catch (error) {
    return null;
  }
}

async function destroySession(request: Request) {
  const session = await storage.getSession(request.headers.get('Cookie'));
  const newCookie = await storage.destroySession(session);
  return redirect('/login', { headers: { 'Set-Cookie': newCookie } });
}

async function signOut(request: Request) {
  await signOutFirebase();
  return await destroySession(request);
}

export { createUserSession, getUserSession, signOut };
