import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

// IMPORTANT: Replace with your own Firebase project's configuration values
const firebaseConfig = {
  apiKey: "AIzaSyDXybTgldEpkELOrOuOzt5PiFC9YCTuH1o",
  authDomain: "creative-arts-b7801.firebaseapp.com",
  projectId: "creative-arts-b7801",
  storageBucket: "creative-arts-b7801.firebasestorage.app",
  messagingSenderId: "781114312326",
  appId: "1:781114312326:web:ca479854d8104c2ea8f307"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Export the services you'll need
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

// // Import the functions you need from the SDKs you need
// import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
// // TODO: Add SDKs for Firebase products that you want to use
// // https://firebase.google.com/docs/web/setup#available-libraries

// // Your web app's Firebase configuration
// // For Firebase JS SDK v7.20.0 and later, measurementId is optional
// const firebaseConfig = {
//   apiKey: "AIzaSyDXybTgldEpkELOrOuOzt5PiFC9YCTuH1o",
//   authDomain: "creative-arts-b7801.firebaseapp.com",
//   projectId: "creative-arts-b7801",
//   storageBucket: "creative-arts-b7801.firebasestorage.app",
//   messagingSenderId: "781114312326",
//   appId: "1:781114312326:web:ca479854d8104c2ea8f307",
//   measurementId: "G-SMQCN35H6N"
// };

// // Initialize Firebase
// const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);