/*
  File: src/services/userService.js
  This file has been updated to handle both 'users' and 'artists' collections.
*/
import { doc, getDoc, updateDoc, collection, query, where, getDocs } from 'firebase/firestore';
import { db } from './firebase';

/**
 * Fetches a user's profile from either the 'users' or 'artists' collection.
 * @param {string} uid - The user's unique ID.
 * @returns {Promise<object|null>} The user's profile data or null if not found.
 */
export const getUserProfile = async (uid) => {
  if (!uid) return null;

  // First, check the 'users' collection (for members, admins, and others)
  const userDocRef = doc(db, "users", uid);
  const userDoc = await getDoc(userDocRef);
  if (userDoc.exists()) {
    return userDoc.data();
  }

  // Fallback to check the 'artists' collection if you still use it
  const artistDocRef = doc(db, "artists", uid);
  const artistDoc = await getDoc(artistDocRef);
  if (artistDoc.exists()) {
    return artistDoc.data();
  }

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

/**
 * Fetches all artists from the 'artists' collection.
 * @returns {Promise<Array>} A promise that resolves to an array of artist objects.
 */
export const getAllArtists = async () => {
  try {
    // Query for members/admins in the 'artists' collection
    const artistsQuery = query(collection(db, 'artists'), where('role', 'in', ['member', 'admin']));
    
    const querySnapshot = await getDocs(artistsQuery);
    
    const artists = [];
    querySnapshot.forEach((doc) => {
      artists.push({ id: doc.id, ...doc.data() });
    });
    
    return artists;

  } catch (error) {
    console.error("Error fetching all artists: ", error);
    // This is where you would see a "Missing Index" error in the console.
    return []; // Return an empty array in case of an error
  }
};

