import {
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  User,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import { auth } from "./config";
import { doc, getDoc } from "firebase/firestore";
import { db } from "./config";
import { AdminUser } from "@/types";

const ADMIN_EMAIL = process.env.NEXT_PUBLIC_ADMIN_EMAIL || "fel.monares@masbatetoday.com";

export const signInAdmin = async (email: string, password: string): Promise<User> => {
  if (email !== ADMIN_EMAIL) {
    throw new Error("Unauthorized: Admin access only");
  }

  if (!auth) {
    throw new Error("Firebase Auth is not configured");
  }

  const userCredential = await signInWithEmailAndPassword(auth, email, password);
  const user = userCredential.user;

  // Verify admin role in Firestore
  if (!db) {
    throw new Error("Firebase Firestore is not configured");
  }
  const adminDoc = await getDoc(doc(db, "admins", user.uid));
  if (!adminDoc.exists()) {
    await signOut(auth);
    throw new Error("Unauthorized: Not an admin user");
  }

  return user;
};

export const signInWithGoogle = async (): Promise<User> => {
  if (!auth) {
    throw new Error("Firebase Auth is not configured");
  }

  const provider = new GoogleAuthProvider();
  const userCredential = await signInWithPopup(auth, provider);
  const user = userCredential.user;

  // Verify admin role
  if (user.email !== ADMIN_EMAIL) {
    await signOut(auth);
    throw new Error("Unauthorized: Admin access only");
  }

  if (!db) {
    throw new Error("Firebase Firestore is not configured");
  }
  const adminDoc = await getDoc(doc(db, "admins", user.uid));
  if (!adminDoc.exists()) {
    await signOut(auth);
    throw new Error("Unauthorized: Not an admin user");
  }

  return user;
};

export const logout = async (): Promise<void> => {
  if (!auth) {
    return;
  }
  await signOut(auth);
};

export const getCurrentUser = (): Promise<User | null> => {
  return new Promise((resolve) => {
    if (!auth) {
      resolve(null);
      return;
    }
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      unsubscribe();
      resolve(user);
    });
  });
};

export const isAdmin = async (user: User | null): Promise<boolean> => {
  if (!user) return false;
  if (user.email !== ADMIN_EMAIL) return false;
  if (!db) return false;

  const adminDoc = await getDoc(doc(db, "admins", user.uid));
  return adminDoc.exists();
};

