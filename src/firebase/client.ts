import { initializeApp, type FirebaseApp } from "firebase/app";
import { connectFirestoreEmulator, getFirestore, type Firestore } from "firebase/firestore";
import { connectStorageEmulator, getStorage, type FirebaseStorage } from "firebase/storage";

let app: FirebaseApp | undefined;
let firestore: Firestore | undefined;
let storage: FirebaseStorage | undefined;
let emulatorConnected = false;

function hasFirebaseConfig() {
  return Boolean(import.meta.env.VITE_FIREBASE_API_KEY && import.meta.env.VITE_FIREBASE_PROJECT_ID);
}

export function firebaseAvailable() {
  return hasFirebaseConfig();
}

export function getFirebaseApp() {
  if (!hasFirebaseConfig()) return undefined;
  app ??= initializeApp({
    apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
    authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
    projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
    storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
    appId: import.meta.env.VITE_FIREBASE_APP_ID,
  });
  return app;
}

export function getFirestoreClient() {
  const currentApp = getFirebaseApp();
  if (!currentApp) return undefined;
  firestore ??= getFirestore(currentApp);
  connectEmulators();
  return firestore;
}

export function getStorageClient() {
  const currentApp = getFirebaseApp();
  if (!currentApp) return undefined;
  storage ??= getStorage(currentApp);
  connectEmulators();
  return storage;
}

function connectEmulators() {
  if (emulatorConnected || import.meta.env.VITE_USE_FIREBASE_EMULATORS !== "true") return;
  if (firestore) connectFirestoreEmulator(firestore, "127.0.0.1", 8080);
  if (storage) connectStorageEmulator(storage, "127.0.0.1", 9199);
  emulatorConnected = true;
}
