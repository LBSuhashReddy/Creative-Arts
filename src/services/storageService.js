import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { storage } from './firebase'; // Assuming you have exported 'storage' from your firebase config

/**
 * Uploads an image file to a specified path in Firebase Storage.
 * @param {File} file - The image file to upload.
 * @param {string} path - The path in storage to upload the file to (e.g., 'event-images').
 * @returns {Promise<string>} A promise that resolves with the public download URL of the uploaded image.
 */
export const uploadImage = async (file, path) => {
  if (!file) {
    throw new Error("No file provided for upload.");
  }
  
  // Create a unique file name to prevent overwriting
  const fileName = `${Date.now()}-${file.name}`;
  const storageRef = ref(storage, `${path}/${fileName}`);

  try {
    // Upload the file
    const snapshot = await uploadBytes(storageRef, file);
    
    // Get the public URL of the file
    const downloadURL = await getDownloadURL(snapshot.ref);
    
    return downloadURL;
  } catch (error) {
    console.error("Error uploading image: ", error);
    throw new Error("Could not upload the image.");
  }
};