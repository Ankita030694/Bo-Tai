import {db} from '../configs/firebase'
import { collection, getDocs, getDoc, addDoc, updateDoc, deleteDoc, doc } from "firebase/firestore"; 

const FirestoreService = {
  // Get all documents from a collection
  getAll: async (collectionName) => {
    try {
      const colRef = collection(db, collectionName);
      const snapshot = await getDocs(colRef);
      return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    } catch (error) {
      console.error("Error fetching documents:", error);
      throw error;
    }
  },

  // Get a single document by ID
  getById: async (collectionName, id) => {
    try {
      const docRef = doc(db, collectionName, id);
      const snapshot = await getDoc(docRef);
      if (snapshot.exists()) {
        return { id: snapshot.id, ...snapshot.data() };
      } else {
        throw new Error("Document not found");
      }
    } catch (error) {
      console.error("Error fetching document:", error);
      throw error;
    }
  },

  // Add a new document to a collection
  add: async (collectionName, data) => {
    try {
      const colRef = collection(db, collectionName);
      const docRef = await addDoc(colRef, data);
      return docRef.id;
    } catch (error) {
      console.error("Error creating document:", error);
      throw error;
    }
  },
  set: async (collectionName, data) => {
    try {
      const colRef = collection(db, collectionName);
      const docRef = await addDoc(colRef, data);
      return docRef.id;
    } catch (error) {
      console.error("Error creating document:", error);
      throw error;
    }
  },

  // Update an existing document by ID
  update: async (collectionName, id, data) => {
    try {
      const docRef = doc(db, collectionName, id);
      await updateDoc(docRef, data);
      return `Document ${id} updated successfully`;
    } catch (error) {
      console.error("Error updating document:", error);
      throw error;
    }
  },

  // Delete a document by ID
  delete: async (collectionName, id) => {
    try {
      const docRef = doc(db, collectionName, id);
      await deleteDoc(docRef);
      return `Document ${id} deleted successfully`;
    } catch (error) {
      console.error("Error deleting document:", error);
      throw error;
    }
  }
};

export default FirestoreService;
