// firebase.js
import admin from "firebase-admin";
import { readFileSync } from "fs";

// Load service account key
const serviceAccount = JSON.parse(
  readFileSync(new URL("./serviceAccountKey.json", import.meta.url), "utf8")
);

// Initialize Firebase only if not already initialized
if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });
}

const db = admin.firestore();
export { db };
