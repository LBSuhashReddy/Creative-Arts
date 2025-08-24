/*
  File: src/services/userService.js
  This is the corrected version of your user service.
*/
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { db } from './firebase';

/**
 * Fetches a user's profile from either the 'users' or 'artists' collection.
 * @param {string} uid - The user's unique ID.
 * @returns {Promise<object|null>} The user's profile data or null if not found.
 */
export const getUserProfile = async (uid) => {
  if (!uid) return null;

  // First, check the 'users' collection
  const userDocRef = doc(db, "users", uid);
  const userDoc = await getDoc(userDocRef);
  if (userDoc.exists()) {
    return userDoc.data();
  }

  // Fallback to check the 'artists' collection
  const artistDocRef = doc(db, "artists", uid);
  const artistDoc = await getDoc(artistDocRef);
  if (artistDoc.exists()) {
    return artistDoc.data();
  }

  // FIX: These lines were outside the function, now they are correctly inside.
  console.error("No profile document found for this user in 'users' or 'artists' collections.");
  return null;
};

/**
 * Updates a user's profile document in the correct collection.
 * @param {string} uid - The user's unique ID.
 * @param {object} data - An object containing the fields to update.
 * @returns {Promise<void>}
 */
export const updateUserProfile = async (uid, data) => {
  if (!uid) throw new Error("No user ID provided.");

  try {
    // Check which document exists and update it.
    const userDocRef = doc(db, "users", uid);
    const userDoc = await getDoc(userDocRef);
    if (userDoc.exists()) {
      await updateDoc(userDocRef, data);
      return;
    }
    
    const artistDocRef = doc(db, "artists", uid);
    const artistDoc = await getDoc(artistDocRef);
    if (artistDoc.exists()) {
      await updateDoc(artistDocRef, data);
      return;
    }

    throw new Error("No profile document found to update.");
  } catch (error) {
    console.error("Error updating user profile: ", error);
    throw new Error("Could not update profile.");
  }
};
