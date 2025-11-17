import { db } from "../firebase";
import { doc, getDoc, setDoc, updateDoc } from "firebase/firestore";

export const getUserData = async (uid) => {
  const ref = doc(db, "users", uid);
  const snap = await getDoc(ref);

  if (!snap.exists()) {
    await setDoc(ref, {
      watchlist: [],
      portfolio: []
    });
    return { watchlist: [], portfolio: [] };
  }

  return snap.data();
};

export const updateUserData = async (uid, data) => {
  const ref = doc(db, "users", uid);
  await updateDoc(ref, data);
};
