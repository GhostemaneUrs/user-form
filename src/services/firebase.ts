import { getAuth } from 'firebase/auth'
import { getStorage } from 'firebase/storage'
import { getFirestore } from 'firebase/firestore'
import { FirebaseOptions, initializeApp } from 'firebase/app'

// Firebase configuration
const firebaseConfig: FirebaseOptions = {
  apiKey: 'AIzaSyA_-PN3mFH9CafoAtLDMwfF9vbcVVaKKnk',
  authDomain: 'user-form-ghostemane.firebaseapp.com',
  projectId: 'user-form-ghostemane',
  storageBucket: 'user-form-ghostemane.appspot.com',
  messagingSenderId: '310017520605',
  appId: '1:310017520605:web:6f86de0b23775e01373c34'
}
// Initialize Firebase
export const firebase = initializeApp(firebaseConfig)
export const auth = getAuth(firebase)
export const db = getFirestore(firebase)
export const storage = getStorage(firebase)
