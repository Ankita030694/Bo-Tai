
import { auth } from "../configs/firebase";
import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    sendPasswordResetEmail,
    onAuthStateChanged,
  } from "firebase/auth";
const FireAuthService = {
  // Create a new user with email and password
  register: async (email, password) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      return userCredential.user;
    } catch (error) {
      console.error("Error registering user:", error);
      throw error;
    }
  },

  // Sign in with email and password
  login: async (email, password) => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      return userCredential.user;
    } catch (error) {
      console.error("Error logging in:", error);
      throw error;
    }
  },

  // Sign out the current user
  logout: async () => {
    try {
      await signOut(auth);
      return "User signed out successfully";
    } catch (error) {
      console.error("Error signing out:", error);
      throw error;
    }
  },

  // Send password reset email
  resetPassword: async (email) => {
    try {
      await sendPasswordResetEmail(auth, email);
      return `Password reset email sent to ${email}`;
    } catch (error) {
      console.error("Error sending password reset email:", error);
      throw error;
    }
  },

  // Observe authentication state changes
  onAuthStateChange: (callback) => {
    try {
      onAuthStateChanged(auth, callback);
    } catch (error) {
      console.error("Error observing auth state:", error);
      throw error;
    }
  },
};

export default FireAuthService;
