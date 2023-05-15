import { User } from '../types/user'
import { db } from '../services/firebase'
import { doc, getDoc, setDoc, updateDoc } from 'firebase/firestore'

export const saveUser = async (user: User | any) => {
  await setDoc(doc(db, 'users', user.uid), {
    uid: user.uid
  })
}

export const getUser = async (uid: string) => {
  const docRef = doc(db, 'users', uid)
  const docSnap = await getDoc(docRef)
  if (docSnap.exists()) {
    return docSnap.data()
  } else {
    Error('User not found')
  }
}

export const updateUser = async (user: User | any) => {
  const docRef = doc(db, 'users', user.uid)
  await updateDoc(docRef, user)
}

export const verifyExistUser = async (uid: string) => {
  const docRef = doc(db, 'users', uid)
  const docSnap = await getDoc(docRef)
  if (docSnap.exists()) {
    return docSnap.data()
  } else {
    Error('User not exist')
  }
}
