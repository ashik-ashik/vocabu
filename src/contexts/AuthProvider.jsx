import React, { useEffect, useState } from "react";
import {
  signOut,
  onAuthStateChanged,
  signInWithPopup
} from "firebase/auth";
import AuthContext from "./AuthContext";
import { auth, provider } from "../services/firebase";
import toast from "react-hot-toast";


// 
const POST_USERS_API_URL= import.meta.env.VITE_COLLECTION_SHEET_WRITE_URL;

const LoadUsersURL = import.meta.env.VITE_USER_SHEET_READ_URL;

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [usersList, setUsersList] = useState([]);



  const googleLogin = async () => {
    const userResult = await signInWithPopup(auth, provider);

    try {
    toast.loading("Signing in with Google...", { id: "login" });

    // Use Popup (recommended for getting user data instantly)
    const loggedUser = userResult.user;

    if (!loggedUser) {
      toast.error("Login failed. No user found.", { id: "login" });
      return;
    }

    // Prepare user data
    const userData = {
      name: loggedUser.displayName || "",
      email: loggedUser.email || "",
      photoURL: loggedUser.photoURL || "",
      uid: loggedUser.uid || "",
      emailVerified: String(loggedUser.emailVerified || false),
      phoneNumber: loggedUser.phoneNumber || "",
      provider:
        loggedUser.providerData?.[0]?.providerId || "google",
      lastLoginAt: new Date().toLocaleString(),
    };

    // IMPORTANT:
    // URLSearchParams cannot send object directly
    // Must send flat values only

    const response = await fetch(POST_USERS_API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({
        action: "user",
        name: userData.name,
        role: 'viewer',
        email: userData.email,
        photoURL: userData.photoURL,
        uid: userData.uid,
        emailVerified: userData.emailVerified,
        phoneNumber: userData.phoneNumber,
        provider: userData.provider,
        lastLoginAt: userData.lastLoginAt,
      }),
    });

    const data = await response.json();

    if (data.success) {
      toast.success(data.message || "Login successful", {
        id: "login",
      });
    } else {
      toast.error(data.message || "Failed to save user", {
        id: "login",
      });
    }

    return userResult;
  } catch (error) {
    console.log(error.message);

    toast.error(error.message || "Login failed", {
      id: "login",
    });

    throw error;
  }
  };

  const logout = () => {
    return signOut(auth);
  };




    // Current logged user info from sheet
  const currentUserInfo = usersList.find(
    (item) =>
      item.email?.toLowerCase() === user?.email?.toLowerCase()
  );

  // Role check
  // const isAdmin = currentUserInfo?.role === "admin";
  // const isViewer = currentUserInfo?.role === "viewer";
  const userRole = currentUserInfo?.role || null;



  // const isAdmin = adminEmails.includes(user?.email);

  useEffect(() => {
    
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });


     const loadUsers = async () => {
  try {
    const res = await fetch(LoadUsersURL);
    const data = await res.text();


    if (!data) {
      console.log("No data found");
      setUsersList([]);
      return;
    }

    // Split lines
    const lines = data.trim().split("\n");

    // First line = headers
    const headers = lines[0]
      .split(",")
      .map((header) => header.trim());

    // Remaining lines = user rows
    const users = lines.slice(1).map((line) => {
      const values = line
        .split(/,(?=(?:(?:[^"]*"){2})*[^"]*$)/) // handles commas inside quotes
        .map((value) =>
          value.trim().replace(/^"|"$/g, "")
        );

      const userObj = {};

      headers.forEach((header, index) => {
        userObj[header] = values[index] || "";
      });

      return userObj;
    });


    setUsersList(users);
  } catch (error) {
    console.log("Load Users Error:", error.message);
    setUsersList([]);
  }
};
    
    loadUsers();
    return () => unsubscribe();
  }, []);

  const authInfo = {
    user,
    usersList,
    loading,
    googleLogin,
    logout,
    userRole
  };

  return (
    <AuthContext.Provider value={authInfo}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;