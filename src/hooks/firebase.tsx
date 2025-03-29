import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

export interface ifirebaseConfig {
  apiKey: string;
  authDomain: string;
  projectId: string;
  storageBucket: string;
  messagingSenderId: string;
  appId: string;
}
export const UseFirebase = (firebaseConfig: ifirebaseConfig | null) => {
  // Initialize Firebase
  if (!firebaseConfig) return { app: null, auth: null, provider: null };

  const app = initializeApp(firebaseConfig);
  const auth = getAuth(app);
  return { app, auth };
};
