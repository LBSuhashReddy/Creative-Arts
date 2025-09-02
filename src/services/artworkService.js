import { collection, addDoc, getDocs, query, where, Timestamp } from 'firebase/firestore';
import { db } from './firebase';
import { uploadImage } from './storageService';

/**
 * Fetches all artworks that are marked as "for sale" for the public exhibition.
 * @returns {Promise<Array>} A promise that resolves to an array of artwork objects.
 */
export const getArtworksForSale = async () => {
  try {
    const q = query(collection(db, 'artworks'), where('forSale', '==', true));
    const querySnapshot = await getDocs(q);
    const artworks = [];
    querySnapshot.forEach((doc) => {
      artworks.push({ id: doc.id, ...doc.data() });
    });
    return artworks;
  } catch (error) {
    console.error("Error fetching artworks for sale: ", error);
    // IMPORTANT: If you see a 'Missing Index' error in the console,
    // you must click the link it provides to create the Firestore index.
    return [];
  }
};

/**
 * Creates a new artwork document in the 'artworks' collection.
 * @param {object} artworkData - The artwork data from the form.
 * @param {File} imageFile - The image file to upload.
 * @param {object} user - The currently logged-in user object.
 */
export const createArtwork = async (artworkData, imageFile, user) => {
  if (!imageFile || !user) throw new Error("Image and user are required.");

  try {
    const imageUrl = await uploadImage(imageFile, `artworks/${user.uid}`);
    const newArtwork = {
      title: artworkData.title,
      description: artworkData.description,
      forSale: artworkData.forSale || false,
      price: artworkData.price || 0,
      imageUrl,
      artistId: user.uid,
      artistName: user.name,
      artistAvatarUrl: user.profileImageUrl || '',
      createdAt: Timestamp.now(),
    };
    await addDoc(collection(db, 'artworks'), newArtwork);
  } catch (error) {
    console.error("Error creating artwork: ", error);
    throw error;
  }
};

/**
 * Fetches all artworks for a specific user for their profile page.
 * @param {string} userId - The UID of the user whose artworks to fetch.
 * @returns {Promise<Array>} An array of artwork objects.
 */
export const getArtworksForUser = async (userId) => {
  if (!userId) return [];
  try {
    const q = query(collection(db, 'artworks'), where('artistId', '==', userId));
    const querySnapshot = await getDocs(q);
    const artworks = [];
    querySnapshot.forEach((doc) => {
      artworks.push({ id: doc.id, ...doc.data() });
    });
    return artworks.sort((a, b) => b.createdAt.seconds - a.createdAt.seconds);
  } catch (error) {
    console.error("Error fetching user artworks: ", error);
    return [];
  }
};