import {
  collection,
  doc,
  getDoc,
  getDocs,
  addDoc,
  updateDoc,
  query,
  where,
  Timestamp,
} from "firebase/firestore";
import { db } from "./config";
import { Poll } from "@/types";

const pollsCollection = collection(db, "polls");

export const getPoll = async (pollId: string): Promise<Poll | null> => {
  const docRef = doc(db, "polls", pollId);
  const docSnap = await getDoc(docRef);

  if (!docSnap.exists()) {
    return null;
  }

  const data = docSnap.data();
  return {
    id: docSnap.id,
    ...data,
    createdAt: data.createdAt?.toDate() || new Date(),
    expiresAt: data.expiresAt?.toDate(),
  } as Poll;
};

export const getPollByArticle = async (articleId: string): Promise<Poll | null> => {
  const q = query(pollsCollection, where("articleId", "==", articleId));
  const querySnapshot = await getDocs(q);

  if (querySnapshot.empty) {
    return null;
  }

  const doc = querySnapshot.docs[0];
  const data = doc.data();
  return {
    id: doc.id,
    ...data,
    createdAt: data.createdAt?.toDate() || new Date(),
    expiresAt: data.expiresAt?.toDate(),
  } as Poll;
};

export const createPoll = async (pollData: Omit<Poll, "id" | "createdAt">): Promise<string> => {
  const docRef = await addDoc(pollsCollection, {
    ...pollData,
    createdAt: Timestamp.now(),
  });

  return docRef.id;
};

export const updatePoll = async (pollId: string, pollData: Partial<Poll>): Promise<void> => {
  const docRef = doc(db, "polls", pollId);
  await updateDoc(docRef, pollData);
};

