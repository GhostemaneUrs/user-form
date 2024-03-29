import { UserCredential } from 'firebase/auth'
import { Dispatch, SetStateAction } from 'react'

export interface User {
  uid?: string
  step?: number
  email?: string
  name?: string
  phone?: string
  gender?: string
  country?: string
  address?: string
  password?: string
  zipCode?: string
  lastName?: string
  cellphone?: string
  birthDate?: string
  urlPhotoBack?: string
  documentType?: string
  urlPhotoFront?: string
  documentNumber?: string
  namePhotoBack?: string
  namePhotoFront?: string
  confirmPassword?: string
}

export interface UserValuesType {
  email: string
  password: string
  remember?: boolean
  confirmPassword?: string
}

export interface UserContextType {
  loading: boolean
  setLoading: Dispatch<SetStateAction<boolean>>
  user: Record<string, unknown>
  credentials: Record<string, string>
  logout: () => Promise<void>
  setUser: Dispatch<SetStateAction<Record<string, unknown>>>
  setCredentials: Dispatch<SetStateAction<Record<string, string>>>
  signUp: (
    email: string,
    password: string
  ) => Promise<UserCredential | void | Error>
  signIn: (
    email: string,
    password: string
  ) => Promise<UserCredential | void | Error>
}

export interface UserProviderType {
  children: PropsWithChildren<React.ReactNode>
}
