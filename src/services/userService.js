import { doc, getDoc } from 'firebase/firestore';
import { db } from './firebase';

export const getUserProfile = async (uid) => {
  const userDocRef = doc(db, "users", uid);
  const userDoc = await getDoc(userDocRef);
  if (userDoc.exists()) {
    return userDoc.data();
  } else {
    console.error("No such user profile!");
    return null;
  }
};