/*
  File: src/services/authService.js
*/
import { initializeApp } from 'firebase/app';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { getFirestore, doc, setDoc } from 'firebase/firestore';
import { firebaseConfig, auth, db } from './firebase'; // Import main app instances

// --- Secondary Firebase App for Admin Actions ---
// This allows an admin to create a user without being logged out.
let secondaryApp;
try {
  // Try to get the existing secondary app
  secondaryApp = initializeApp(firebaseConfig, 'Secondary');
} catch (error) {
  // This error happens on hot-reloads in development, which is expected.
  // We create a uniquely named app to avoid crashing on re-renders.
  secondaryApp = initializeApp(firebaseConfig, 'Secondary_Reload_' + Date.now());
}
const secondaryAuth = getAuth(secondaryApp);

/**
 * Creates a new artist/member. This is an ADMIN-ONLY action.
 * It uses the secondary auth instance to avoid logging the admin out.
 */
export const createArtist = async (email, password, name, graduationYear, domain) => {
  // Create the new user in the secondary auth instance
  const userCredential = await createUserWithEmailAndPassword(secondaryAuth, email, password);
  const user = userCredential.user;

  // Save the new user's profile to the 'users' collection using the main db instance
  await setDoc(doc(db, 'artists', user.uid), {
    uid: user.uid,
    name,
    email,
    role: 'member', // All artists/members have this role
    graduationYear,
    domain,
    bio: '',
    profileImageUrl: ''
  });

  // IMPORTANT: Sign out the newly created user from the secondary instance
  // so this temporary session is closed.
  await signOut(secondaryAuth);

  return user;
};

/**
 * Registers a new public user. This is for the main public registration page.
 */
export const publicRegister = async (email, password, name) => {
  const userCredential = await createUserWithEmailAndPassword(auth, email, password);
  const user = userCredential.user;

  await setDoc(doc(db, 'users', user.uid), {
    uid: user.uid,
    name,
    email,
    role: 'other' // Public users get the 'other' role
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
