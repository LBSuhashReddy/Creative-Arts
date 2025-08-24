import React, { useState, useEffect, createContext, useContext } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../services/firebase';
import { getUserProfile } from '../services/userService';
// Step 1: Import ALL the necessary functions from your service
import { loginUser, createArtist, logoutUser, publicRegister } from '../services/authService';


const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const profile = await getUserProfile(user.uid);
        setCurrentUser({ ...user, ...profile });
      } else {
        setCurrentUser(null);
      }
      setLoading(false);
    });
    return unsubscribe;
  }, []);

  // Step 2: Add 'publicRegister' to the value provided by the context
  const value = {
    currentUser,
    login: loginUser,
    register: createArtist, // This is for the admin "Add Artist" form
    publicRegister: publicRegister, // This is for the public registration form
    logout: logoutUser
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
