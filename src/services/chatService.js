import { 
    collection, 
    query, 
    where, 
    getDocs, 
    doc, 
    setDoc, 
    addDoc, 
    onSnapshot, 
    orderBy,
    Timestamp 
} from 'firebase/firestore';
import { db } from './firebase';

/**
 * Creates a unique chat ID from two user IDs.
 * This ensures that the chat ID is always the same regardless of who initiates the chat.
 * @param {string} uid1 - The first user's ID.
 * @param {string} uid2 - The second user's ID.
 * @returns {string} The combined chat ID.
 */
const createChatId = (uid1, uid2) => {
  return uid1 > uid2 ? `${uid1}_${uid2}` : `${uid2}_${uid1}`;
};

/**
 * Finds or creates a chat conversation between two users.
 * @param {string} currentUserId - The ID of the logged-in user.
 * @param {string} otherUserId - The ID of the user to chat with.
 * @returns {Promise<string>} A promise that resolves with the chat ID.
 */
export const findOrCreateChat = async (currentUserId, otherUserId) => {
  const chatId = createChatId(currentUserId, otherUserId);
  const chatRef = doc(db, 'chats', chatId);

  try {
    const chatDoc = await getDocs(query(collection(db, 'chats'), where('__name__', '==', chatId)));
    
    if (chatDoc.empty) {
      // Chat doesn't exist, create it.
      await setDoc(chatRef, {
        participantIds: [currentUserId, otherUserId],
        createdAt: Timestamp.now(),
        lastMessage: null,
      });
    }
    return chatId;
  } catch (error) {
    console.error("Error finding or creating chat:", error);
    throw new Error("Could not start a chat.");
  }
};

/**
 * Listens for all conversations for the current user in real-time.
 * @param {string} userId - The ID of the logged-in user.
 * @param {function} callback - The function to call with the list of conversations.
 * @returns {function} An unsubscribe function to stop listening for updates.
 */
export const listenToUserConversations = (userId, callback) => {
  const q = query(collection(db, 'chats'), where('participantIds', 'array-contains', userId));
  
  const unsubscribe = onSnapshot(q, (querySnapshot) => {
    const conversations = [];
    querySnapshot.forEach((doc) => {
      conversations.push({ id: doc.id, ...doc.data() });
    });
    callback(conversations);
  });

  return unsubscribe;
};

/**
 * Listens for messages in a specific chat conversation in real-time.
 * This is the core real-time function.
 * @param {string} chatId - The ID of the chat to listen to.
 * @param {function} callback - The function to call with the array of messages.
 * @returns {function} An unsubscribe function to stop listening.
 */
export const listenToMessages = (chatId, callback) => {
  const messagesRef = collection(db, 'chats', chatId, 'messages');
  const q = query(messagesRef, orderBy('timestamp', 'asc'));

  const unsubscribe = onSnapshot(q, (querySnapshot) => {
    const messages = [];
    querySnapshot.forEach((doc) => {
      messages.push({ id: doc.id, ...doc.data() });
    });
    callback(messages);
  });

  return unsubscribe;
};

/**
 * Sends a new message to a chat conversation.
 * @param {string} chatId - The ID of the chat.
 * @param {object} message - The message object to send.
 */
export const sendMessage = async (chatId, message) => {
  const messagesRef = collection(db, 'chats', chatId, 'messages');
  const chatRef = doc(db, 'chats', chatId);

  try {
    // Add the new message to the 'messages' sub-collection
    await addDoc(messagesRef, {
      ...message,
      timestamp: Timestamp.now(),
    });

    // Update the 'lastMessage' field on the parent chat document
    await setDoc(chatRef, {
      lastMessage: {
        text: message.text,
        senderId: message.senderId,
        timestamp: Timestamp.now(),
      }
    }, { merge: true }); // Use merge to avoid overwriting other fields

  } catch (error) {
    console.error("Error sending message:", error);
    throw new Error("Could not send the message.");
  }
};