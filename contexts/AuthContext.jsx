import React, { useContext, useState, useEffect } from 'react'
import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'
import 'firebase/functions'

let app, auth
if (!firebase.apps.length) {
  app = firebase.initializeApp({
    apiKey: 'AIzaSyAmkO_iB6iyitJerKu4L_88VpALwi3r2oE',
    authDomain: 'loca8me.firebaseapp.com',
    projectId: 'loca8me',
    storageBucket: 'loca8me.appspot.com',
    messagingSenderId: '977760864834',
    appId: '1:977760864834:web:a7ad767300509a31b3bbdb',
  })
  auth = app.auth()
}

export { auth, firebase }

const functions = firebase.app().functions('asia-south1')

const AuthContext = React.createContext()

export function useAuth() {
  return useContext(AuthContext)
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState()
  const [loading, setLoading] = useState(true)

  function logout() {
    return auth.signOut()
  }

  function resetPassword(email) {
    return auth.sendPasswordResetEmail(email)
  }

  function updateEmail(email) {
    return currentUser.updateEmail(email)
  }

  function updatePassword(password) {
    return currentUser.updatePassword(password)
  }

  useEffect(() => {
    const unsubscribe = auth?.onAuthStateChanged((user) => {
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
