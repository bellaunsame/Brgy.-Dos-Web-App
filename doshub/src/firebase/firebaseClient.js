import { initializeApp } from 'firebase/app'
import {
  getAuth,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged
} from 'firebase/auth'
import {
  getFirestore,
  collection,
  doc,
  getDoc,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  serverTimestamp,
  query,
  orderBy
} from 'firebase/firestore'
import { getStorage } from 'firebase/storage'

// TODO: Replace with your Firebase config from Firebase Console
// Project Settings > General > Your apps > SDK setup and configuration
const firebaseConfig = {
  /* PASTE YOUR FIREBASE CONFIG HERE:
  apiKey: "your-api-key",
  authDomain: "your-auth-domain",
  projectId: "your-project-id",
  storageBucket: "your-storage-bucket",
  messagingSenderId: "your-messaging-sender-id",
  appId: "your-app-id"
  */
}

// Initialize Firebase
let app
let auth
let db
let storage

/**
 * Initialize Firebase with config
 * Call this function once at app startup
 */
export const initFirebase = (config = firebaseConfig) => {
  app = initializeApp(config)
  auth = getAuth(app)
  db = getFirestore(app)
  storage = getStorage(app)
}

// Auth helpers
export const signInWithEmailPassword = (email, password) => {
  return signInWithEmailAndPassword(auth, email, password)
}

export const signOutUser = () => {
  return signOut(auth)
}

export const listenAuthState = (callback) => {
  return onAuthStateChanged(auth, callback)
}

// News CRUD operations
// Collection: 'news'
export const createNews = async (newsData) => {
  const newsRef = collection(db, 'news')
  return addDoc(newsRef, {
    ...newsData,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp()
  })
}

export const updateNews = async (id, updates) => {
  const newsRef = doc(db, 'news', id)
  return updateDoc(newsRef, {
    ...updates,
    updatedAt: serverTimestamp()
  })
}

export const deleteNews = async (id) => {
  const newsRef = doc(db, 'news', id)
  return deleteDoc(newsRef)
}

export const getNewsList = async () => {
  const newsRef = collection(db, 'news')
  const q = query(newsRef, orderBy('createdAt', 'desc'))
  const snapshot = await getDocs(q)
  return snapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data()
  }))
}

// Events CRUD operations
// Collection: 'events'
export const createEvent = async (eventData) => {
  const eventsRef = collection(db, 'events')
  return addDoc(eventsRef, {
    ...eventData,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp()
  })
}

export const updateEvent = async (id, updates) => {
  const eventRef = doc(db, 'events', id)
  return updateDoc(eventRef, {
    ...updates,
    updatedAt: serverTimestamp()
  })
}

export const deleteEvent = async (id) => {
  const eventRef = doc(db, 'events', id)
  return deleteDoc(eventRef)
}

export const getEventsList = async () => {
  const eventsRef = collection(db, 'events')
  const q = query(eventsRef, orderBy('date', 'asc'))
  const snapshot = await getDocs(q)
  return snapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data()
  }))
}

// Services CRUD operations
// Collection: 'services'
export const createService = async (serviceData) => {
  const servicesRef = collection(db, 'services')
  return addDoc(servicesRef, {
    ...serviceData,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp()
  })
}

export const updateService = async (id, updates) => {
  const serviceRef = doc(db, 'services', id)
  return updateDoc(serviceRef, {
    ...updates,
    updatedAt: serverTimestamp()
  })
}

export const deleteService = async (id) => {
  const serviceRef = doc(db, 'services', id)
  return deleteDoc(serviceRef)
}

export const getServicesList = async () => {
  const servicesRef = collection(db, 'services')
  const q = query(servicesRef, orderBy('createdAt', 'desc'))
  const snapshot = await getDocs(q)
  return snapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data()
  }))
}

// Export initialized services
export { auth, db, storage }
