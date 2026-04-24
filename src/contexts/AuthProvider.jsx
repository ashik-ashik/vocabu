import React, { useEffect, useState } from "react";
import {
  signOut,
  onAuthStateChanged,
  signInWithRedirect
} from "firebase/auth";
import AuthContext from "./AuthContext";
import { auth, provider } from "../services/firebase";

const adminEmails = [
  "yourgmail@gmail.com",
  "example@gmail.com"
];

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
const googleLogin = () => {
  return signInWithRedirect(auth, provider);
};
//   const googleLogin = () => {
//     return signInWithPopup(auth, provider);
//   };

  const logout = () => {
    return signOut(auth);
  };

  const isAdmin = adminEmails.includes(user?.email);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const authInfo = {
    user,
    loading,
    googleLogin,
    logout,
    isAdmin
  };

  return (
    <AuthContext.Provider value={authInfo}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;