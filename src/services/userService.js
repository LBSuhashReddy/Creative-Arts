import { doc, getDoc } from 'firebase/firestore';
import { db } from './firebase';

export const getUserProfile = async (uid) => {
  const userDocRef = doc(db, "users", uid);
  const artistDocRef = doc(db, "artists", uid);
  const userDoc = await getDoc(userDocRef);
  const artistDoc = await getDoc(artistDocRef);
  if (userDoc.exists()) {
    return userDoc.data();
  }else if(artistDoc.exists()){
    return artistDoc.data();
  }
  else {
    console.error("No such user profile!");
    return null;
  }
};