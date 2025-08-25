// progress.ts (Firestore version)
import { db } from "@/lib/firebase" // Make sure you have this path correct
import {
  collection,
  doc,
  getDoc,
  getDocs,
  setDoc,
  updateDoc,
  deleteDoc,
} from "firebase/firestore"

export interface ProgressData {
  completed: Record<number, boolean>
  lastUpdated: string
}

// Firestore collection structure: users/{userId}/progress/{companyName}
const getProgressDocRef = (userId: string, companyName: string) => {
  return doc(db, "users", userId, "progress", companyName)
}

/**
 * Get the progress for a specific user and company.
 */
export const getProgress = async (userId: string, companyName: string): Promise<ProgressData> => {
  const docRef = getProgressDocRef(userId, companyName)

  try {
    const docSnap = await getDoc(docRef)
    if (docSnap.exists()) {
      return docSnap.data() as ProgressData
    }
  } catch (error) {
    console.error("Error getting progress from Firestore:", error)
  }

  return { completed: {}, lastUpdated: new Date().toISOString() }
}

/**
 * Update progress for a specific problem for a user and company.
 */
export const updateProgress = async (
  userId: string,
  companyName: string,
  problemId: number,
  completed: boolean
): Promise<void> => {
  const docRef = getProgressDocRef(userId, companyName)

  try {
    const current = await getProgress(userId, companyName)
    const updatedProgress: ProgressData = {
      ...current,
      completed: {
        ...current.completed,
        [problemId]: completed,
      },
      lastUpdated: new Date().toISOString(),
    }

    await setDoc(docRef, updatedProgress)
  } catch (error) {
    console.error("Error updating progress in Firestore:", error)
  }
}

/**
 * Get all progress data for a specific user across all companies.
 */
export const getAllProgress = async (userId: string): Promise<Record<string, ProgressData>> => {
  const userProgressCollection = collection(db, "users", userId, "progress")
  const allProgress: Record<string, ProgressData> = {}

  try {
    const snapshot = await getDocs(userProgressCollection)
    snapshot.forEach((doc) => {
      allProgress[doc.id] = doc.data() as ProgressData
    })
  } catch (error) {
    console.error("Error fetching all progress from Firestore:", error)
  }

  return allProgress
}

/**
 * Clears all progress data for the given user.
 */
export const clearUserProgress = async (userId: string): Promise<void> => {
  const userProgressCollection = collection(db, "users", userId, "progress")

  try {
    const snapshot = await getDocs(userProgressCollection)
    const deletions = snapshot.docs.map((docSnap) => deleteDoc(docSnap.ref))
    await Promise.all(deletions)
  } catch (error) {
    console.error("Error clearing user progress from Firestore:", error)
  }
}
