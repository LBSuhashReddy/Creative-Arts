/*
  File: src/services/authService.js
*/
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { auth, db } from './firebase';

// This is the function for creating artists (members)
export const registerUser = async (email, password, name, graduationYear, domain) => {
  const userCredential = await createUserWithEmailAndPassword(auth, email, password);
  const user = userCredential.user;

  await setDoc(doc(db, "users", user.uid), {
    uid: user.uid,
    name,
    email,
    role: 'member', // Assigns the ARTIST role
    graduationYear,
    domain,
    bio: '',
    profileImageUrl: ''
  });
  return user;
};

// This is the function for public sign-ups
export const publicRegister = async (email, password, name) => {
  const userCredential = await createUserWithEmailAndPassword(auth, email, password);
  const user = userCredential.user;

  await setDoc(doc(db, "users", user.uid), {
    uid: user.uid,
    name,
    email,
    role: 'other', // Assigns the general PUBLIC role
  });
  return user;
};

// --- Added Missing Functions ---

// Handles user login
export const loginUser = (email, password) => {
  return signInWithEmailAndPassword(auth, email, password);
};

// Handles user logout
export const logoutUser = () => {
  return signOut(auth);
};
