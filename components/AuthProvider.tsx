// components/AuthProvider.tsx
"use client"

import { createContext, useContext, useEffect, useState, ReactNode } from "react"
import { onAuthStateChanged,  updateProfile ,signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut, User as FirebaseUser } from "firebase/auth"
import { doc, setDoc } from "firebase/firestore"
import { getDoc } from "firebase/firestore"

import { auth, db } from "@/lib/firebase" // adjust the import path as per your project


interface User {
  uid: string
  email: string | null
  name?: string
}

interface AuthContextType {
  user: User | null
  login: (email: string, password: string) => Promise<boolean>
  register: (name: string, email: string, password: string) => Promise<boolean>
  logout: () => void
  isLoading: boolean
}

const AuthContext = createContext<AuthContextType | null>(null)
export const useAuth = () => useContext(AuthContext)!

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      if (firebaseUser) {
        setUser({
          uid: firebaseUser.uid,
          email: firebaseUser.email,
        })
      } else {
        setUser(null)
      }
      setIsLoading(false)
    })
    return () => unsubscribe()
  }, [])

  const login = async (email: string, password: string) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password)
    const user = userCredential.user

    // Get user data from Firestore
    const docRef = doc(db, "users", user.uid)
    const docSnap = await getDoc(docRef)

    if (docSnap.exists()) {
      const userData = docSnap.data()

      setUser({
      uid: user.uid,
      email: user.email,
      name: user.displayName || email.split("@")[0], // fallback
    })

      // Save to localStorage (optional, if you're using localStorage-based auth state)
      localStorage.setItem("user", JSON.stringify(userData))

      // Or set user context state here if you're using useAuth()
      return true
    } else {
      console.error("No user profile found in Firestore.")
      return false
    }
  } catch (err) {
    console.error("Login error:", err)
    return false
  }
}

const register = async (name: string, email: string, password: string) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password)
    const user = userCredential.user

    // Save user data in Firestore
    await setDoc(doc(db, "users", user.uid), {
      uid: user.uid,
      name: name,
      email: email,
      createdAt: new Date().toISOString(),
    })

      // Extract name from email
    const extractedName = email.split("@")[0]

    // Set displayName in Firebase Auth
    await updateProfile(user, {
      displayName: extractedName,
    })


    return true
  } catch (err) {
    console.error("Register error:", err)
    return false
  }
}

  const logout = async () => {
    await signOut(auth)
  }

  return (
    <AuthContext.Provider value={{ user, login, register, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  )
}
