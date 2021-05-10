import React, { useContext, useState, useEffect } from 'react'
import { firebase } from '../db'
// const db = { auth: () => {} }
const AuthContext = React.createContext()

export function useAuth() {
  return useContext(AuthContext)
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState()
  const [loading, setLoading] = useState(true)

  function logout() {
    return firebase.auth().signOut()
  }

  function resetPassword(email) {
    return firebase.auth().sendPasswordResetEmail(email)
  }

  function updateEmail(email) {
    return currentUser.updateEmail(email)
  }

  function updatePassword(password) {
    return currentUser.updatePassword(password)
  }

  useEffect(() => {
    const unsubscribe = firebase.auth().onAuthStateChanged((user) => {
      setCurrentUser(user)
      setLoading(false)
    })

    return unsubscribe
  }, [])

  const value = {
    currentUser,
    logout,
    resetPassword,
    updateEmail,
    updatePassword,
  }

  return <AuthContext.Provider value={value}>{!loading && children}</AuthContext.Provider>
}
