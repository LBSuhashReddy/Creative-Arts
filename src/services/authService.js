import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from 'firebase/auth'; // Step 1: Import all necessary functions from Firebase Auth
import { doc, setDoc } from 'firebase/firestore';
import { auth, db } from './firebase';

const registerUser = async (email, password, name, graduationYear, domain) => {
  const userCredential = await createUserWithEmailAndPassword(auth, email, password);
  const user = userCredential.user;
  // Create a user document in Firestore
  await setDoc(doc(db, "users", user.uid), {
    uid: user.uid,
    name,
    email,
    role: 'member', // Default role for new sign-ups
    graduationYear,
    domain,
    bio: '',
    profileImageUrl: ''
  });
  return user;
};

const loginUser = (email, password) => {
  return signInWithEmailAndPassword(auth, email, password);
};

const logoutUser = () => {
  return signOut(auth);
};

// Step 2: Export all three functions so other files can use them.
export {
    registerUser,
    loginUser,
    logoutUser
};