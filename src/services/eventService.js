import { collection, addDoc, Timestamp } from 'firebase/firestore';
import { db } from './firebase';

/**
 * Creates a new event document in the 'events' collection.
 * @param {object} eventData - The event data from the form.
 * @returns {Promise<DocumentReference>} A promise that resolves with the new document reference.
 */
export const createEvent = async (eventData) => {
  try {
    // Convert the string date from the form into a Firestore Timestamp
    const eventWithTimestamp = {
      ...eventData,
      date: Timestamp.fromDate(new Date(eventData.date)),
    };
    
    // Add the new document to the 'events' collection
    const docRef = await addDoc(collection(db, 'events'), eventWithTimestamp);
    console.log("Document written with ID: ", docRef.id);
    return docRef;
  } catch (e) {
    console.error("Error adding document: ", e);
    throw new Error("Could not create the event."); // Propagate the error
  }
};
