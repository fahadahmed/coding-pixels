import admin from 'firebase-admin';
import {
  applicationDefault,
  initializeApp as initializeAdminApp,
} from 'firebase-admin/app';
import { initializeApp } from 'firebase/app';

import {
  signInWithEmailAndPassword,
  getAuth,
  signOut,
  connectAuthEmulator,
} from 'firebase/auth';

require('dotenv').config();

const firebaseConfig = {
  apiKey: process.env.CP_API_KEY,
  authDomain: process.env.CP_AUTH_DOMAIN,
  databaseURL: process.env.CP_DATABASE_URL,
  projectId: process.env.CP_PROJECT_ID,
  storageBucket: process.env.CP_STORAGE_BUCKET,
  messagingSenderId: process.env.CP_MESSENGER_SENDER_ID,
  appId: process.env.CP_APP_ID,
  measurementId: process.env.CP_MEASUREMENT_ID,
};

if (!admin.apps.length) {
  initializeAdminApp({
    credential: applicationDefault(),
    databaseURL: process.env.CP_DATABASE_URL,
  });
}

const db = admin.firestore();
const adminAuth = admin.auth();

let Firebase: any;
if (!Firebase?.apps?.length) {
  Firebase = initializeApp(firebaseConfig);
}

if (location.hostname === 'localhost') {
  connectAuthEmulator(getAuth(), 'http://localhost:9099');
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
