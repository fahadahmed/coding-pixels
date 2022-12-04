import admin from 'firebase-admin';
import {
  applicationDefault,
  initializeApp as initializeAdminApp,
} from 'firebase-admin/app';
import { initializeApp } from 'firebase/app';
import { signInWithEmailAndPassword, getAuth, signOut } from 'firebase/auth';

require('dotenv').config();

const firebaseConfig = {};

if (!admin.apps.length) {
  initializeAdminApp({
    credential: applicationDefault(),
    databaseURL: '',
  });
}

const db = admin.firestore();
const adminAuth = admin.auth();

let Firebase;
if (!Firebase?.apps?.length) {
  Firebase = initializeApp(firebaseConfig);
}

async function signIn(email: string, password: string) {
  const auth = getAuth();
  return signInWithEmailAndPassword(auth, email, password);
}

async function getSessionToken(idToken: string) {
  const decodedToken = await adminAuth.verifyIdToken(idToken);
  if (new Date().getTime() / 1000 - decodedToken.auth_time > 5 * 60) {
    throw new Error('Recent sign in required');
  }
  const twoWeeks = 60 * 60 * 24 * 14 * 1000;
  return adminAuth.createSessionCookie(idToken, { expiresIn: twoWeeks });
}

async function signOutFirebase() {
  await signOut(getAuth());
}

export { db, getSessionToken, signOutFirebase, signIn, adminAuth };
