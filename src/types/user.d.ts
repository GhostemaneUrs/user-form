import { UserCredential } from 'firebase/auth'
import { Dispatch, SetStateAction } from 'react'

export interface UserContextType {
  user: Record<string, unknown>
  credentials: Record<string, unknown> | null
  logout: () => Promise<void>
  signInWithGoogle: () => Promise<UserCredential | void>
  setUser: Dispatch<SetStateAction<Record<string, unknown>>>
  setCredentials: Dispatch<SetStateAction<Record<string, unknown>>>
  signUp: (email: string, password: string) => Promise<UserCredential | void>
  signIn: (email: string, password: string) => Promise<UserCredential | void>
}

export interface UserProviderType {
  children: PropsWithChildren<React.ReactNode>
}
