/*
  File: src/services/authService.js
  This is the corrected and final version of your authentication service.
*/
import { initializeApp } from 'firebase/app';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { firebaseConfig, auth, db } from './firebase';

// --- Secondary Firebase App for Admin Actions ---
let secondaryApp;
try {
  secondaryApp = initializeApp(firebaseConfig, 'Secondary');
} catch (error) {
  // This error is expected on hot-reloads in development.
  secondaryApp = initializeApp(firebaseConfig, 'Secondary_Reload_' + Date.now());
}
const secondaryAuth = getAuth(secondaryApp);

/**
 * Creates a new artist/member. This is an ADMIN-ONLY action.
 * It uses the secondary auth instance to avoid logging the admin out.
 */
export const createArtist = async (email, password, name, graduationYear, domain) => {
  // FIX: Use the secondaryAuth instance to create the user
  const userCredential = await createUserWithEmailAndPassword(secondaryAuth, email, password);
  const user = userCredential.user;

  // FIX: Save the new user's profile to the 'users' collection
  await setDoc(doc(db, "artists", user.uid), {
    uid: user.uid,
    name,
    email,
    role: 'member', // Use the 'member' role to identify artists
    graduationYear,
    domain,
    bio: '',
    profileImageUrl: ''
  });

  // Sign out the newly created user from the secondary instance.
  await signOut(secondaryAuth);

  return user;
};

/**
 * Registers a new public user.
 */
export const publicRegister = async (email, password, name) => {
  const userCredential = await createUserWithEmailAndPassword(auth, email, password);
  const user = userCredential.user;

  await setDoc(doc(db, "users", user.uid), {
    uid: user.uid,
    name,
    email,
    role: 'other',
  });
  return user;
};

/**
 * Logs in any user.
 */
export const loginUser = (email, password) => {
  return signInWithEmailAndPassword(auth, email, password);
};

/**
 * Logs out the current user.
 */
export const logoutUser = () => {
  return signOut(auth);
};
