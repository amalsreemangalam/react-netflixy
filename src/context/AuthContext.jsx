import { createContext, useContext, useEffect, useState } from "react";

import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";
import { auth, db } from "../Services/firebase";
import Login from "../Pages/Login";

import { doc, setDoc } from "firebase/firestore";

const AuthContext = createContext();

export function AuthContextprovider({ children }) {
  const [user, setUser] = useState({});

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  async function signup(email, password) {
    createUserWithEmailAndPassword(auth, email, password);

    setDoc(doc(db, "users", email), {
      favShows:[],
    });
  }

  function logIn(email, password) {
    return signInWithEmailAndPassword(auth, email, password);
  }

  function logOut() {
    return signOut(auth);
  }

  return (
    <AuthContext.Provider value={{ user, signup, logIn, logOut }}>
      {children}
    </AuthContext.Provider>
  );
}

export function UserAuth() {
  return useContext(AuthContext);
}
