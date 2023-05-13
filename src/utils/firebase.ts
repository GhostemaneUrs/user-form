import { FirebaseOptions, initializeApp } from 'firebase/app'

const firebaseConfig: FirebaseOptions = {
  apiKey: 'AIzaSyA_-PN3mFH9CafoAtLDMwfF9vbcVVaKKnk',
  authDomain: 'user-form-ghostemane.firebaseapp.com',
  projectId: 'user-form-ghostemane',
  storageBucket: 'user-form-ghostemane.appspot.com',
  messagingSenderId: '310017520605',
  appId: '1:310017520605:web:6f86de0b23775e01373c34'
}

export const firebase = initializeApp(firebaseConfig)
